import copy
import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest
from uuid import uuid4

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "candidates/ai-visibility-review/scripts/report.py"
spec = importlib.util.spec_from_file_location("report", SCRIPT)
report = importlib.util.module_from_spec(spec)
spec.loader.exec_module(report)


def fixture():
    data = {
        "schema_version": 1, "method": "aeo-v4",
        "brand": {"name": "Example Co", "domains": ["example.com"], "aliases": ["Example"]},
        "rivals": [{"name": "Rival Co", "domains": ["rival.example"], "aliases": []}],
        "market": {"country": "US", "language": "English"},
        "questions": [{"id": "q1", "text": "Which services suit a small team?"},
                      {"id": "q2", "text": "How can I find suppliers?"}],
        "by_name_question": "What does Example Co offer?",
        "engines": [{"id": "gemini", "tool_id": "cloro.gemini-search", "surface": "logged_out_web",
                     "rounds": 3, "settings": {"country": "US"}},
                    {"id": "chatgpt", "tool_id": "dataforseo.chatgpt-search", "surface": "logged_out_web",
                     "rounds": 3, "settings": {"location_name": "United States", "language_name": "English", "force_web_search": False}}],
        "approved_max_usd": "0.500000", "scope_note": "Synthetic reduced test: two engines and two questions.",
        "observations": [], "receipts": [], "opportunities": [],
    }
    for engine in data["engines"]:
        for question in data["questions"]:
            for round_ in range(1, 4):
                run_id = str(uuid4())
                data["receipts"].append({"run_id": run_id, "tool_id": engine["tool_id"], "cost_usd": "0.003360"})
                data["observations"].append({
                    "run_id": run_id, "engine": engine["id"], "phase": "buyer", "question_id": question["id"],
                    "round": round_, "requested_prompt": question["text"], "status": "ok", "reason": "",
                    "requested_settings": copy.deepcopy(engine["settings"]),
                    "retrieved_at": "2026-10-20T12:00:00Z", "model": None,
                    "answer": "Example Co suits small teams. Rival Co is another option.",
                    "sources": [{"url": "https://docs.example.com/guide", "title": "Guide"}],
                    "reviewed": True, "verdicts": [
                        {"brand": "Example Co", "mention_quote": "Example Co", "recommendation_quote": "Example Co suits small teams.", "first": False},
                        {"brand": "Rival Co", "mention_quote": "Rival Co", "recommendation_quote": None, "first": False}],
                })
    return data


class ReportTests(unittest.TestCase):
    def test_failure_missing_and_unknown_citations_are_not_negative_recommendations(self):
        data = fixture()
        data["observations"][0].update(status="failed", reason="Provider timeout")
        data["observations"][1]["sources"] = None
        data["observations"][2]["sources"] = []
        # Lose one response entirely; its receipt stays, so cost is not lost.
        del data["observations"][3]
        result = report.summarize(data)
        gemini = result["engines"]["gemini"]
        self.assertEqual((gemini["planned"], gemini["attempted"], gemini["usable"]), (6, 5, 4))
        self.assertEqual((gemini["citation_known"], gemini["cited"]), (3, 2))
        self.assertEqual(gemini["recommended"], 4)
        self.assertTrue(gemini["flags"])
        self.assertEqual(result["known_cost_usd"], "0.040320")
        self.assertEqual(result["engines"]["chatgpt"]["recommended"], 6)

    def test_by_name_and_forced_source_answers_do_not_inflate_buyer_counts(self):
        data = fixture()
        for phase in ("source", "by_name"):
            row = copy.deepcopy(data["observations"][6])
            row.update(run_id=str(uuid4()), phase=phase)
            if phase == "by_name":
                row.update(question_id="by-name", requested_prompt=data["by_name_question"])
            else:
                row["requested_settings"]["force_web_search"] = True
            data["observations"].append(row)
            data["receipts"].append({"run_id": row["run_id"], "tool_id": "dataforseo.chatgpt-search", "cost_usd": "0.005600"})
        group = report.summarize(data)["engines"]["chatgpt"]
        self.assertEqual(group["usable"], 6)
        self.assertEqual(group["by_name"]["usable"], 1)
        self.assertEqual(group["source"]["usable"], 1)

    def test_no_duplicate_runs_slots_or_ungrounded_verdicts(self):
        for mutation in ("slot", "run", "quote", "first", "receipt", "settings"):
            with self.subTest(mutation=mutation):
                data = fixture()
                if mutation == "slot":
                    data["observations"][1]["round"] = 1
                elif mutation == "run":
                    data["observations"][1]["run_id"] = data["observations"][0]["run_id"]
                elif mutation == "quote":
                    data["observations"][0]["verdicts"][0]["recommendation_quote"] = "Invented endorsement"
                elif mutation == "first":
                    data["observations"][0]["verdicts"][1]["first"] = True
                elif mutation == "receipt":
                    data["receipts"].pop()
                else:
                    data["observations"][0]["requested_settings"]["country"] = "GB"
                with self.assertRaises(ValueError):
                    report.summarize(data)

    def test_domain_boundaries_and_unknown_costs(self):
        data = fixture()
        data["observations"][0]["sources"] = [{"url": "https://example.com.attacker.example/"}]
        data["receipts"][0]["cost_usd"] = None
        result = report.summarize(data)
        self.assertEqual(result["engines"]["gemini"]["cited"], 5)
        self.assertEqual(result["unknown_cost_receipts"], 1)
        self.assertEqual(result["known_cost_usd"], "0.036960")
        for invalid in ("NaN", "Infinity", "-1", "0.0000001", 0.1):
            data["receipts"][0]["cost_usd"] = invalid
            with self.assertRaises(ValueError):
                report.summarize(data)

    def test_changed_requests_and_known_models_prevent_comparison(self):
        before = fixture()
        self.assertTrue(report.compare(before, copy.deepcopy(before))["comparable"])
        for field in ("country", "question", "model", "rounds", "force", "alias", "failure"):
            with self.subTest(field=field):
                after = copy.deepcopy(before)
                if field == "country":
                    after["market"]["country"] = "GB"
                elif field == "question":
                    after["questions"][0]["text"] = "Which suppliers are best for an agency?"
                    for row in after["observations"]:
                        if row["question_id"] == "q1":
                            row["requested_prompt"] = after["questions"][0]["text"]
                elif field == "model":
                    for row in after["observations"]:
                        row["model"] = "new-version"
                elif field == "rounds":
                    after["engines"][0]["rounds"] = 4
                elif field == "force":
                    after["engines"][1]["settings"]["language_name"] = "British English"
                    for row in after["observations"]:
                        if row["engine"] == "chatgpt":
                            row["requested_settings"]["language_name"] = "British English"
                elif field == "alias":
                    after["brand"]["aliases"].append("Another Name")
                else:
                    for row in after["observations"][:3]:
                        row.update(status="unusable", reason="Wrong language")
                self.assertFalse(report.compare(before, after)["comparable"])

    def test_opportunity_requires_actual_checked_citation_and_keeps_phase_counts(self):
        data = fixture()
        page = {"url": "https://docs.example.com/guide", "kind": "third_party", "opened_at": "2026-10-20T12:10:00Z",
                "excerpt": "Guide excerpt", "gap": "Unclear eligibility", "action": "Add supported eligibility facts",
                "owner": "Marketing", "effort": "One hour", "recheck": "Check factual accuracy",
                "observation_ids": [data["observations"][0]["run_id"]]}
        data["opportunities"] = [page]
        rendered = report.render(data, report.summarize(data))
        self.assertIn("gemini / buyer", rendered)
        run_id = data["observations"][0]["run_id"]
        self.assertIn(f'href="#observation-{run_id}"', rendered)
        self.assertIn(f'<details id="observation-{run_id}">', rendered)
        page["url"] = "https://elsewhere.example/unrelated"
        with self.assertRaises(ValueError):
            report.summarize(data)

    def test_question_movements_remain_visible_when_totals_cancel(self):
        before = fixture()
        after = copy.deepcopy(before)
        for data, recommended_question in ((before, "q2"), (after, "q1")):
            for row in data["observations"]:
                if row["question_id"] != recommended_question:
                    row["verdicts"][0]["recommendation_quote"] = None
        comparison = report.compare(before, after)
        self.assertTrue(comparison["comparable"])
        self.assertEqual(comparison["before"]["engines"]["gemini"]["recommended"], 3)
        self.assertEqual(comparison["after"]["engines"]["gemini"]["recommended"], 3)
        rendered = report.render(after, report.summarize(after), comparison)
        self.assertIn("<td>Which services suit a small team?</td><td>Example Co</td><td>3/3 → 3/3</td><td>0/3 → 3/3</td>", rendered)
        self.assertIn("<td>How can I find suppliers?</td><td>Example Co</td><td>3/3 → 3/3</td><td>3/3 → 0/3</td>", rendered)

    def test_rival_question_counts_include_first_and_owned_citations(self):
        data = fixture()
        row = data["observations"][0]
        row["sources"].append({"url": "https://rival.example/about"})
        row["verdicts"][1].update(recommendation_quote="Rival Co is another option.", first=True)
        summary = report.summarize(data)
        rival = summary["engines"]["gemini"]["rival_questions"]["Rival Co"]
        self.assertEqual((rival["q1"]["first"], rival["q1"]["cited"], rival["q2"]["cited"]), (1, 1, 0))
        rendered = report.render(data, summary)
        self.assertIn("<td>Which services suit a small team?</td><td>Rival Co</td><td>3/3</td><td>1/3</td><td>1/3</td><td>1/3</td>", rendered)

    def test_missing_secondary_passes_are_prominent_without_invalidating_buyer_comparison(self):
        data = fixture()
        summary = report.summarize(data)
        self.assertFalse(summary["engines"]["chatgpt"]["flags"])
        self.assertEqual(len(summary["engines"]["chatgpt"]["secondary_flags"]), 2)
        self.assertTrue(report.compare(data, copy.deepcopy(data))["comparable"])
        rendered = report.render(data, summary)
        first_screen = rendered.split("<h2>Next actions")[0]
        self.assertIn("By-name fact-check coverage incomplete: 0/3 usable", first_screen)
        self.assertIn("Forced source-pass coverage incomplete: 0/2 usable", first_screen)

    def test_untrusted_html_and_urls_cannot_execute_in_report(self):
        data = fixture()
        data["scope_note"] = '<script>alert("x")</script>'
        rendered = report.render(data, report.summarize(data))
        self.assertNotIn("<script>", rendered)
        self.assertIn("&lt;script&gt;", rendered)
        self.assertIn("default-src 'none'", rendered)
        for url in ("javascript:alert(1)", "https://127.0.0.1", "https://user:pass@example.com", "https://example.com/?token=private"):
            data["observations"][0]["sources"] = [{"url": url}]
            with self.assertRaises(ValueError):
                report.summarize(data)

    def test_cli_writes_private_portable_files_and_never_overwrites(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            input_path = root / "input.json"
            data = fixture()
            data["observations"][0]["model"] = "=HYPERLINK(\"https://example.com\")"
            input_path.write_text(json.dumps(data))
            out = root / "report"
            result = subprocess.run(["python3", str(SCRIPT), "--input", str(input_path), "--output", str(out)],
                                    capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual({p.name for p in out.iterdir()}, {"report.html", "checkpoint.json", "summary.json", "observations.csv"})
            self.assertEqual((out / "report.html").stat().st_mode & 0o777, 0o600)
            self.assertIn("'=HYPERLINK", (out / "observations.csv").read_text())
            second = subprocess.run(["python3", str(SCRIPT), "--input", str(input_path), "--output", str(out)],
                                    capture_output=True, text=True)
            self.assertNotEqual(second.returncode, 0)
            self.assertEqual(json.loads(input_path.read_text()), data)


if __name__ == "__main__":
    unittest.main()

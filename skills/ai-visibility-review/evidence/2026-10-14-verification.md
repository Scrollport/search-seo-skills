# ChatGPT Recommendation Check 3.0.0 — verification

14 October 2026. Status: **Verified; review due 2026-11-13.** Internal rehearsal; not Customer-proven and not client-reviewed.

## Public rehearsal brief

A public privacy-focused web-analytics product (the category of the 12 October rehearsal), checked in United States / English. The agent drafted eight buyer questions that don't name the brand; five were ticked (two "best", one alternatives to a well-known incumbent, one problem-led, one for startups) and frozen with one by-name question before collection. Chosen to run the 3.0.0 method end to end on a brand with several named competitors and cited third-party lists.

## What was checked

- Discovery and inspection of every route tool. The ChatGPT collector, page check, fallback page read and search were live at the documented prices ($0.005600 an answer, $0.003300 a page check, $0.002500 a re-read or search): $0.217800 expected and $0.260800 at most. The wallet covered the maximum and the plan was approved at it.
- Collection: 33 planned, 33 terminal, 33 successful, 33 usable, 0 failed or replaced. All 33 run ids were distinct and retrieved inside the check, so no call collapsed onto an earlier run. The web-search setting came back as sent: off for the 28 counted answers and on for the 5 source-pass answers. One model was reported throughout and no two answers were identical. Calls ran one at a time: 18–64 seconds per answer, 21 minutes of collection, first result 28 minutes after approval. Running up to 5 calls at once, which the revised instructions allow, is untested.
- Revision and regeneration: the first report from these answers passed every check except the run time then promised (5–15 minutes). The instructions were revised before release (commit 16f0423): a 20–30 minute run time, a listed-first count, one definition of named in, recommended in and listed first in for every brand, the brand's subdomains counted as its site, the share of answers in which ChatGPT searched, and a track for correcting wrong facts on cited pages. The answers were collected on 14 October under the unchanged method (questions, sample sizes and web-search settings), and the report was regenerated from the saved answers and page checks under the revised rules. ChatGPT was not asked again.
- Manual coding: the ordinary adjective that shares the brand's name was not counted. The brand was mentioned 25/25, recommended 25/25 and listed first 24/25, and its own site was cited 25/25. ChatGPT searched the web in 25/25 buyer answers with the choice left to it. By-name answers were accurate 3/3 (prices, plans, trial, annual and nonprofit discounts and a stated limitation, each checked against owned pages) and recommended 3/3. All three cited copies of owned pages served on two subdomains, which count as the brand's site.
- Source checks: 9 pages were opened with the page-check tool, and the other cited rival pages and the owned facts pages were read free. A competitor's alternatives list, cited in all 5 answers to one question, says the brand has no revenue tracking and no funnels; the owned pricing page lists both on its top plan. A second competitor page, cited in 2 answers, misstates revenue attribution. The other cited lists described the brand accurately.

## Result

**Pass.** Every acceptance check passed, including the revised run time of 20–30 minutes (28 minutes). The report gives three fixes on two tracks, each built on an opened page:

1. Make an owned page that is already cited in 7 of 25 answers answer the problem-led question directly.
2. Ask the competitor to correct its two wrong statements (5 answers).
3. Make the owned SaaS page answer the startup question, where a product-analytics rival was recommended for funnels in 5 of 5 answers.

Spend was $0.214500 of the approved $0.260800, and regenerating the report cost nothing.

## Receipt

| Purpose | Tool | Run ID | USD |
| --- | --- | --- | ---: |
| Buyer question 1, round 1 | `dataforseo.chatgpt-search` | c4baf77e-e957-4a68-8c12-d8baf01ee4f4 | 0.005600 |
| Buyer question 2, round 1 | `dataforseo.chatgpt-search` | 574a793b-6625-4cc3-9bfe-5d77eb66c136 | 0.005600 |
| Buyer question 3, round 1 | `dataforseo.chatgpt-search` | 9c44a9a4-4a99-49c7-8b48-cef09d0c1996 | 0.005600 |
| Buyer question 4, round 1 | `dataforseo.chatgpt-search` | 234902dd-956c-4356-9c48-feb1e04632de | 0.005600 |
| Buyer question 5, round 1 | `dataforseo.chatgpt-search` | f241891a-1d24-4ccf-96af-5c394a8235ae | 0.005600 |
| By-name question, round 1 | `dataforseo.chatgpt-search` | 74275b8d-6a10-41d3-a74e-c5fa33a3b0ad | 0.005600 |
| Buyer question 1, round 2 | `dataforseo.chatgpt-search` | fb0ab176-a6b0-496d-ac05-faef439e5c31 | 0.005600 |
| Buyer question 2, round 2 | `dataforseo.chatgpt-search` | 62a3fbbb-edd5-48f3-9c00-0c9b338b08a0 | 0.005600 |
| Buyer question 3, round 2 | `dataforseo.chatgpt-search` | abb4f571-7586-470e-b3ee-22615ab59e30 | 0.005600 |
| Buyer question 4, round 2 | `dataforseo.chatgpt-search` | 0271e0c1-f820-492b-8318-bc53073e8745 | 0.005600 |
| Buyer question 5, round 2 | `dataforseo.chatgpt-search` | d6eca511-badc-4c06-84c3-c66735304b70 | 0.005600 |
| Buyer question 1, round 3 | `dataforseo.chatgpt-search` | 300d5c3e-5d3e-4e07-805b-55962b11b42f | 0.005600 |
| Buyer question 2, round 3 | `dataforseo.chatgpt-search` | ed723c89-ab64-45d9-917c-e938c51b9bfa | 0.005600 |
| Buyer question 3, round 3 | `dataforseo.chatgpt-search` | 814a76d9-6b1d-41ed-aa49-1a3f42a4e594 | 0.005600 |
| Buyer question 4, round 3 | `dataforseo.chatgpt-search` | c88eadf7-6cd0-4209-b5b7-e285556b59b7 | 0.005600 |
| Buyer question 5, round 3 | `dataforseo.chatgpt-search` | f2c4ec77-dd7f-462c-9410-e6eed5af7713 | 0.005600 |
| By-name question, round 3 | `dataforseo.chatgpt-search` | 12bd9056-70fa-4b54-879c-e10ed378723a | 0.005600 |
| Buyer question 1, round 4 | `dataforseo.chatgpt-search` | 99af989f-7f8e-4074-be02-78dd34abd733 | 0.005600 |
| Buyer question 2, round 4 | `dataforseo.chatgpt-search` | 63079d4f-a3ed-45e1-8be7-3f913003da17 | 0.005600 |
| Buyer question 3, round 4 | `dataforseo.chatgpt-search` | cee22129-98f9-4d65-a7a1-5e8b90db0a5b | 0.005600 |
| Buyer question 4, round 4 | `dataforseo.chatgpt-search` | 3d25dbf2-df75-4259-9d80-7170042f5e99 | 0.005600 |
| Buyer question 5, round 4 | `dataforseo.chatgpt-search` | 0f19c043-602f-4810-b063-ed3d1d058463 | 0.005600 |
| Buyer question 1, round 5 | `dataforseo.chatgpt-search` | 5ced0b97-e98d-4474-93e8-e3e55394d805 | 0.005600 |
| Buyer question 2, round 5 | `dataforseo.chatgpt-search` | 35b0a108-b488-48c7-8369-455c7ac32694 | 0.005600 |
| Buyer question 3, round 5 | `dataforseo.chatgpt-search` | e058678d-71ce-46ac-ba23-73ec7d6254bd | 0.005600 |
| Buyer question 4, round 5 | `dataforseo.chatgpt-search` | eb3c28f9-1980-49af-b498-6429805e4aa7 | 0.005600 |
| Buyer question 5, round 5 | `dataforseo.chatgpt-search` | c113869a-767c-4308-8b03-aac87b2a158a | 0.005600 |
| By-name question, round 5 | `dataforseo.chatgpt-search` | 8694c55a-7c7d-4103-8da5-5bd3ad1e531c | 0.005600 |
| Source pass, question 1 | `dataforseo.chatgpt-search` | a8355445-b4b8-4c51-a982-9290a3723803 | 0.005600 |
| Source pass, question 2 | `dataforseo.chatgpt-search` | d5661879-8fbf-4dd9-9073-adac524d3585 | 0.005600 |
| Source pass, question 3 | `dataforseo.chatgpt-search` | 548815d0-2829-4ce4-b069-1e309a0daa00 | 0.005600 |
| Source pass, question 4 | `dataforseo.chatgpt-search` | 66c1f254-24db-4993-b5a6-136ae65254d8 | 0.005600 |
| Source pass, question 5 | `dataforseo.chatgpt-search` | 4ed431f5-43ef-406b-802d-31fd0b0ef5fb | 0.005600 |
| Third-party GA4-alternatives list | `brightdata.web-scrape` | 3d973f8d-e7b7-484f-8335-0980f17704fe | 0.003300 |
| Competitor alternatives list (two wrong facts) | `brightdata.web-scrape` | 578395d5-b177-4865-a636-152e5bd1d773 | 0.003300 |
| Competitor comparison page | `brightdata.web-scrape` | deffc01c-d988-46f8-84ef-78f36acb544d | 0.003300 |
| Third-party cookieless comparison | `brightdata.web-scrape` | 40d7537e-0ad4-455f-b78b-f029532316b5 | 0.003300 |
| Competitor GDPR-tools list | `brightdata.web-scrape` | a2dc099c-6a39-4fdc-8a21-ec0d5088ab68 | 0.003300 |
| Owned cookieless page | `brightdata.web-scrape` | c39f8d2d-0910-409e-9025-557efa7e49a4 | 0.003300 |
| Owned GA4 comparison page | `brightdata.web-scrape` | 2a5d5e23-8774-4637-904e-26aa61426aaa | 0.003300 |
| Rival privacy page | `brightdata.web-scrape` | 6391e206-c50b-4c7d-949c-146fbef9adb6 | 0.003300 |
| Owned SaaS page | `brightdata.web-scrape` | fe0f5137-bf83-498f-b2f9-4a38aa9d1bbc | 0.003300 |
| **Total** | | | **0.214500** |

## Limits

33 answers from one collection route, in one market and one engine, are a small sample. They support investigation, not share-of-voice, causal or uplift claims. The brand already led nearly every answer, so the path for a brand ChatGPT doesn't recommend (the rule-of-three range) was not exercised. Collecting up to 5 calls at once is untested. Reading pages free depends on the host. No website was changed and nothing was published. This note omits raw provider payloads and answer text.

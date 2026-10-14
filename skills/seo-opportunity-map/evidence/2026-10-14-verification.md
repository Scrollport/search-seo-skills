# Next SEO Moves 5.1.1 — verification

14 October 2026. Status: **Verified; review due 2026-11-13.** Internal rehearsal; not Customer-proven. No client review, site change or publication occurred.

## Public rehearsal briefs

Two paid runs, United States / English, rivals found automatically, no Search Console export:

1. **Version 5.1.0 on a public scheduling platform.** It ranks for over 7,000 phrases, and its users' public booking pages fill its sample, which tests sample cleaning, striking distance and dated positions. 5.1.1 changed only how new-page candidates are kept, so this run covers everything except the hand-off.
2. **Version 5.1.1 on the maintainer's own public site,** an API tool marketplace for AI agents that ranks for 17 phrases. It tests the rivals'-gap path and the new-page hand-off to Article Brief + Draft.

## What was checked

- All seven declared tools were discovered and inspected before each run; all were live at the documented prices. The planned maximum was $0.275800 both times, against a $0.280000 approval.
- **Sample cleaning (run 1):** 44 of the site's 100 sampled rows came from its users' booking pages and 25 were other brands' navigational searches; all were dropped, as were 35 and 26 rows from the two rival samples. No move or held topic came from them.
- **Striking distance and positions (run 1):** two moves came from striking distance (#13 and #11 in the sample). None of the five pages was on page one today, so every position carries its data date ("#13 in July data, not on page one today").
- **Live checks (run 1):** six results pages flagged AI Overviews on all five moves, including two where the July–September overview snapshot showed none. One new-page candidate became an update because the site search found an existing page.
- **Under 50 phrases (run 2):** the small-site rule triggered and the result said so under the title. A rival marketplace's sample was 98% its users' listing pages and was dropped.
- **New-page hand-off (run 2):** two new-page candidates passed their site searches and both stayed in the five, each with a parseable plan file.
- **Brief this page (run 2):** Article Brief + Draft 4.1.1 ran from the first plan file. It read the plan's results page, site search and page read with `get_run` at no cost, did not re-measure the plan's keyword, and bought only what the plan lacked: keyword ideas and an overview for related phrases, related questions, two page reads, one ChatGPT answer and two source searches. The brief opens with the plan's target.
- **Time:** 5.5 minutes for run 1 and 8.0 minutes for run 2, within the stated 10–15. The hand-off brief and draft took 3.7 minutes.

## Result

**Pass.**
- **Run 1:** five update moves, each with an action, page, exact edit, the number behind it, effort and a done-when check. Positions are dated and AI Overviews marked; the Held list gives reasons and a note explains why no new page made the five. Evidence: Medium, no export.
- **Run 2:** two new-page moves with plan files and [Brief this page], plus three updates; Medium evidence.
- **Spend:** within the approved maximum each time, and Details lists every paid run.

## Receipt: run 1 (5.1.0)

| Purpose | Tool | Run ID | USD |
| --- | --- | --- | ---: |
| Home page read | `brightdata.web-scrape` | 2430ee4a-863c-4a19-b136-4a98c2434c14 | 0.003300 |
| Find rivals, 20 rows | `dataforseo.organic-competitors` | 67f95980-1daa-4420-a495-6097653ae7f0 | 0.020800 |
| Site sample, 100 rows | `dataforseo.ranked-keywords` | d2b4645c-f6be-4318-a9d6-b473b845dd6b | 0.036800 |
| Rival 2 sample, 100 rows | `dataforseo.ranked-keywords` | 1e586916-b365-41e0-8d77-65f02341b512 | 0.036800 |
| Rival 1 sample, 100 rows | `dataforseo.ranked-keywords` | 8689f69f-c0d7-4d8f-b86c-7c0d8a1ff6c1 | 0.036800 |
| Overview, 20 phrases | `dataforseo.keyword-overview` | 605548bc-69d7-4dee-ac8b-adb0fd3dfee5 | 0.020800 |
| Site search, new-page candidate | `serper.google-search` | fb05b946-943a-4d30-af4c-dab5931e4b1e | 0.002500 |
| Site search, new-page candidate | `serper.google-search` | 45ff10f6-7015-4ff0-8b84-3c17e96d9e12 | 0.002500 |
| Today's results page | `dataforseo.google-serp-organic` | e5423220-8e14-4322-9fca-2d070da1d542 | 0.014000 |
| Today's results page | `dataforseo.google-serp-organic` | 5ed7b7bc-6881-4438-ba4b-b0bc3fdaa63e | 0.014000 |
| Today's results page | `dataforseo.google-serp-organic` | 1724ed0f-5c26-4968-b326-adf6ff492865 | 0.014000 |
| Today's results page | `dataforseo.google-serp-organic` | 30df2a95-7415-4985-81fb-2a1cb0d34c3c | 0.014000 |
| Today's results page | `dataforseo.google-serp-organic` | 8ad98db4-a6e0-4dad-8b1e-dc71e67d5242 | 0.014000 |
| Today's results page | `dataforseo.google-serp-organic` | 1db65476-6bf5-4100-978d-1c430552da20 | 0.014000 |
| Page read | `brightdata.web-scrape` | 330c950e-3e07-476c-b871-0273e01a52e7 | 0.003300 |
| Page read | `brightdata.web-scrape` | be6aef30-59db-4632-8b08-1d7eb3d4697e | 0.003300 |
| Page read | `brightdata.web-scrape` | 69f0f2c6-a23c-4dfa-a5a9-a62e83147731 | 0.003300 |
| Page read | `brightdata.web-scrape` | 6be596ee-c40c-4cfa-a441-c0e319891102 | 0.003300 |
| Page read | `brightdata.web-scrape` | 8f88b4b7-8258-4a4c-a3aa-fecb5520fe9d | 0.003300 |
| Backup read | `firecrawl.web-scrape` | cdb17bb6-4f26-4ac9-8e9c-f1d9d95555fa | 0.002500 |
| Backup read | `firecrawl.web-scrape` | 94eef43a-c163-4161-bddc-c0bf8cb12d59 | 0.002500 |
| **Total** | | | **0.265800** |

## Receipt: run 2 (5.1.1)

| Purpose | Tool | Run ID | USD |
| --- | --- | --- | ---: |
| Home page read (failed, not charged) | `brightdata.web-scrape` | b0408fab-8251-40eb-a49a-c6d02bf93873 | 0.000000 |
| Find rivals, 20 rows | `dataforseo.organic-competitors` | c775afdc-c95a-4894-9f39-6b1a96c1541a | 0.020800 |
| Site sample, 100 rows | `dataforseo.ranked-keywords` | 8a5d4cc8-f80e-48b5-8377-e979fc7f7d99 | 0.036800 |
| Home page, backup reader | `firecrawl.web-scrape` | 9be73d8a-53c3-4592-b6d6-d984ab6ef16b | 0.002500 |
| Rival 1 sample, 100 rows | `dataforseo.ranked-keywords` | 2020f532-76ab-41b1-971e-00fdb1c5df75 | 0.036800 |
| Rival 2 sample, 100 rows | `dataforseo.ranked-keywords` | 0fec0a66-abd9-455c-9cb1-9ae691615889 | 0.036800 |
| Overview, 20 phrases | `dataforseo.keyword-overview` | ad591955-b978-4f2f-9f41-05ac57e72d4a | 0.020800 |
| Site search, new-page candidate | `serper.google-search` | 77660a49-2b9b-4460-a37c-cc0148d327f1 | 0.002500 |
| Site search, new-page candidate | `serper.google-search` | e6541393-a7f8-4a17-a4c0-6a1eb4fb08ff | 0.002500 |
| Site search, new-page candidate | `serper.google-search` | 75a6e76a-9452-4ba8-bc5a-ad7dba118a03 | 0.002500 |
| Today's results page | `dataforseo.google-serp-organic` | 414b2b98-4316-48da-b7e3-404da7e9c8cd | 0.014000 |
| Today's results page | `dataforseo.google-serp-organic` | bfc917a1-8dbc-4f06-969b-9d6f2f9fd9de | 0.014000 |
| Today's results page | `dataforseo.google-serp-organic` | 063fa70f-e6ce-4cc2-98f5-5286fb4ab5b9 | 0.014000 |
| Today's results page | `dataforseo.google-serp-organic` | b27a3229-e828-4128-ad18-55eca3db5678 | 0.014000 |
| Today's results page | `dataforseo.google-serp-organic` | 455f8a96-47ec-440f-a0df-df28930d0228 | 0.014000 |
| Today's results page | `dataforseo.google-serp-organic` | 6065851f-1730-48f7-a8b1-9fc0e5ace727 | 0.014000 |
| Page read | `brightdata.web-scrape` | 71eb7e8b-3e43-4883-8fe0-da262dbf45ac | 0.003300 |
| Page read | `brightdata.web-scrape` | 3440ff93-8965-4015-a88b-bce642e70a87 | 0.003300 |
| Page read | `brightdata.web-scrape` | 02af51d5-4e05-49e0-b13b-ab7ae0be780a | 0.003300 |
| Page read | `brightdata.web-scrape` | 417aff1f-e8d0-4ed3-af61-53fbdb88f173 | 0.003300 |
| Page read | `brightdata.web-scrape` | 934387fd-9d3f-4f79-abec-1502f6561a3b | 0.003300 |
| **Total** | | | **0.262500** |

## Receipt: Brief this page from the run 2 plan (Article Brief + Draft 4.1.1)

| Purpose | Tool | Run ID | USD |
| --- | --- | --- | ---: |
| Keyword ideas | `dataforseo.keyword-ideas` | ad4fe324-1de9-4758-9b72-9baef8ef8158 | 0.026800 |
| Overview, 20 phrases | `dataforseo.keyword-overview` | a17fbe99-f38e-4c57-a25f-c72c5043cc23 | 0.020800 |
| Related questions | `serper.google-search` | 8722ef9d-fdb4-4747-8a5a-5f28803156a8 | 0.002500 |
| ChatGPT answer | `dataforseo.chatgpt-search` | c8bd51fb-b4e8-41a2-a532-b7c6b2448f17 | 0.005600 |
| Source search 1 | `exa.search` | e36b4173-9d29-491e-804b-14055c77224e | 0.009800 |
| Source search 2 | `exa.search` | 68b92ce0-c25f-4204-bb05-aa78a0f7970a | 0.009800 |
| Page read | `brightdata.web-scrape` | 8d30dbac-b190-491d-b3ef-c947b40e95c8 | 0.003300 |
| Page read | `brightdata.web-scrape` | df52afa1-3603-419f-98a5-c6fef4ad078a | 0.003300 |
| **Total** | | | **0.081900** |

Reused from the plan at no cost: the target's demand, results page, site search and one page read.

## Limits

These are 100-row samples from one provider database and one market, so absence is not proof of no ranking. Results pages were checked on one day from one location. Related phrase volumes were not summed. In run 2, the provider's results-page responses named related searches as a feature without the phrases, so the plans carried no related phrases and the brief bought them. One rival's own guide sections were first taken for user pages and corrected before ranking. Two page reads failed upstream (not charged) and were recovered by the backup reader. Technical SEO, indexation, traffic and conversions were not assessed. External review is still needed to establish customer value. This note omits raw provider payloads.

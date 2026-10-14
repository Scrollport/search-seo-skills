# Article Brief + Draft 4.1.0 — verification

14 October 2026. Status: **Verified; review due 2026-11-13.** Internal rehearsal; not Customer-proven and not client-reviewed.

## Public rehearsal brief

- Site and topic: a public scheduling platform; seed topic `round robin scheduling`.
- Audience: small B2B sales teams sharing inbound demo bookings between reps.
- Objective and action: free sign-ups after the reader sets up a rotation.
- Market: United States, English. Exclusions: none; facts only the site knows stay as placeholders.

Chosen because the seed phrase has a common second meaning (CPU scheduling), the site already publishes several pages on the topic, and the same case was used for the first paid run of 4.0.0, so each 4.1.0 fix could be checked against it.

## What was checked

- All nine declared tools were discovered and inspected; all were live at the documented prices. The planned maximum was $0.120700 against a $0.130000 approval and the $0.150000 trial ceiling. The optional $0.126000 demand check was not needed.
- Keyword ideas were requested in the provider's default order. Only 1 of 50 contained the seed's key terms, and it was a CPU term, so 16 natural variants were added under the fewer-than-five rule. The 18-phrase overview returned volume, difficulty, intent and results-page features for 16; two read "too small to measure, not zero".
- Today's results page for the seed showed only CPU-scheduling explainers. The target was re-picked once to "round robin meetings" (140 searches a month, difficulty 0), whose results page shows meeting-tool help docs and how-to guides, with an AI Overview.
- The existing-page check found nine round-robin pages on the site. The brief recommends updating the sales-specific page rather than writing a new one, reads it as one of the three pages, and drafts only new and changed sections, each marked.
- Related questions and one ChatGPT answer were recorded, including its four cited domains and follow-up searches. Two source searches gave 10 sources from 10 publishers, including one primary study (2007 lead-response research), and the brief states that study's common misattribution.
- One page read failed upstream; the wallet was not charged, and the backup reader recovered the page.
- Timing: research took 3.96 minutes, including that 65-second provider failure; the brief and draft were written 6.68 minutes after discovery started.

## Result

**Pass.** The brief opens with the update recommendation, the re-picked target and its reason, today's winning page type and AI Overview, ChatGPT's cited domains, the angle and six headings, each with what it must prove and a source or [you]. The draft carries the editing label, a 56-character meta title with the target phrase, [NEW] and [CHANGED] section markers, inline citations [1]–[10] matching its Sources list, placeholders for the site's own steps, numbers and examples, and the 28-day Search Console check.

## Receipt

| Purpose | Tool | Run ID | USD |
| --- | --- | --- | ---: |
| Keyword ideas, one seed, 50, default order | `dataforseo.keyword-ideas` | fe54e7e4-e5b4-4e22-a8c0-3392ddc3f07f | 0.026800 |
| Demand check, 18 phrases with results-page features | `dataforseo.keyword-overview` | f57eac1c-4097-4538-a4bd-2c9224d1e344 | 0.020400 |
| Today's results page: seed phrase (CPU meaning) | `dataforseo.google-serp-organic` | d5237957-2dbf-4375-b0de-96fcbc14f8ba | 0.014000 |
| Today's results page after one re-pick | `dataforseo.google-serp-organic` | 6792b1a6-3b35-4fe9-b875-25f911f5d8c0 | 0.014000 |
| Existing-page check (site: search) | `serper.google-search` | 15aec07c-b1fa-4d3f-aedb-de4601fd72e2 | 0.002500 |
| Related questions | `serper.google-search` | 8b405d4a-45ed-4bcd-9ddc-72f2747360d5 | 0.002500 |
| ChatGPT answer with cited sources | `dataforseo.chatgpt-search` | 298b594f-482b-48e2-89b1-67415186602a | 0.005600 |
| Source search 1: reader's main question | `exa.search` | af0e984e-4762-4c6e-b82d-a534a85b2110 | 0.009800 |
| Source search 2: primary research | `exa.search` | 112f706c-c3a8-41a9-8b3e-7e1a989e18f1 | 0.009800 |
| Top result page read | `brightdata.web-scrape` | d746c547-dcc1-4de5-bc50-a48775e00fbd | 0.003300 |
| Second result page read (upstream error, not charged) | `brightdata.web-scrape` | d1abd6f3-a81f-429d-a9b3-aefe8c79ad2d | 0.000000 |
| Site's own page read | `brightdata.web-scrape` | 2f4b27ac-4257-4598-bca9-2e388cb85995 | 0.003300 |
| Backup read of the second result | `firecrawl.web-scrape` | 84ea17d5-a0f4-4df2-bee6-3d76e63895a9 | 0.002500 |
| **Total** | | | **0.114500** |

## Limits

Demand for the final target is small; related phrases were not added together. Results pages and the ChatGPT answer were seen on one day from one market, and answers vary between runs. Only three pages were read. The primary study dates from 2007 and was read from a third-party hosted copy. The site's product steps, plan details and customer examples remain placeholders for the site owner. The keyword-ideas tool still returned mostly unrelated phrases for this seed; the filter and fallback handled it. External review is still needed to establish customer value. This note omits raw provider payloads.

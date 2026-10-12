# AI Visibility Review 2.0.2 — reverification

12 October 2026. Status: **Verified; review due 2026-11-11.** Internal rehearsal; not Customer-proven and not client-reviewed.

## Public rehearsal brief

A public privacy-focused web-analytics product and a UK small-business buyer task: choosing privacy-friendly analytics while avoiding a consent banner. Chosen because it is a real, non-sensitive buying decision with several named competitors and a current regulatory change (the ICO's April 2026 guidance), which tests whether the report separates recommendation, citation and source accuracy. Three analyst-selected prompts (unbranded discovery, unbranded buyer problem, branded comparison) were frozen before collection and repeated three times each in United Kingdom / English with web search requested.

## What was checked

- Discovery and inspection of every route tool. The primary collector, search, extraction and fallback extraction were live. The optional second collector, `brightdata.chatgpt-search`, returned "capability not found" and discovery offered no other per-prompt ChatGPT collector, so version 2.0.2 removes it and uses a second route only when one is live. This rehearsal used one route.
- Panel coverage: 9 planned, 9 terminal, 9 successful, 9 usable, 0 failed or pending. All nine answers were textually distinct; the returned model field was the same for all nine and session details were unknown.
- Manual coding: product mentions were separated from the ordinary adjective that shares the brand name. The brand was mentioned and recommended in 3/3 discovery answers, shortlisted in 3/3 buyer-problem answers, and preferred in 3/3 branded comparisons, which are reported separately. Owned pages were cited in 9/9 answers.
- Source checks: two owned pages, one rival page and the regulator's exceptions page were extracted. The first extraction of the regulator page returned HTTP 502 with no content and was billed; the conditional fallback recovered it. That page was treated as unassessed until the fallback succeeded.

## Result

**Pass.** Seven of nine answers raised the UK exception's condition (clear information and a simple, free way to object). Those answers took it from regulator pages, and in two answers from a rival's dated UK page. No owned page was cited for it, and the inspected owned pages state that no banner or consent is needed without that UK condition. The report gives two page actions with inspected evidence, a client legal fact to confirm, an owner and a same-panel retest. It holds one observation (an owned blog cited on an unexpected host) for the client to check without technical diagnosis, and gives no third action because the evidence did not support one.

## Receipt

| Purpose | Tool | Run ID | USD |
| --- | --- | --- | ---: |
| Unbranded discovery, repeat 1 | `dataforseo.chatgpt-search` | 46bb3758-8034-42f0-bb83-720269e09d0e | 0.005600 |
| Unbranded discovery, repeat 2 | `dataforseo.chatgpt-search` | 0544955a-ef99-4b4d-bf0e-9978cfcabb95 | 0.005600 |
| Unbranded discovery, repeat 3 | `dataforseo.chatgpt-search` | cfd5f6cc-5c0f-4d09-a134-1d25fa946739 | 0.005600 |
| Unbranded buyer problem, repeat 1 | `dataforseo.chatgpt-search` | d5761d67-c081-4f11-a849-3d8fdb77c957 | 0.005600 |
| Unbranded buyer problem, repeat 2 | `dataforseo.chatgpt-search` | c16d3fc1-9aa9-4130-935a-f8eeb7e81bd7 | 0.005600 |
| Unbranded buyer problem, repeat 3 | `dataforseo.chatgpt-search` | 8fb20e7c-2eb0-444d-905e-943bdb2e8f00 | 0.005600 |
| Branded comparison, repeat 1 | `dataforseo.chatgpt-search` | 15c86ad4-0ece-49fe-8171-57aa94300f78 | 0.005600 |
| Branded comparison, repeat 2 | `dataforseo.chatgpt-search` | 3eb7ae06-665e-44f8-8c14-505068d1b320 | 0.005600 |
| Branded comparison, repeat 3 | `dataforseo.chatgpt-search` | 1a24b5d7-d70b-4e24-af40-5d5377ca49d0 | 0.005600 |
| Owned-page search (no results returned) | `serper.google-search` | e15f120f-45c2-4bd5-91ff-2f7f3ba2f47a | 0.002500 |
| Owned-page search, broader | `serper.google-search` | c8de93da-786d-4e7b-96e3-2233acbe6b80 | 0.002500 |
| Current UK results for the buyer problem | `serper.google-search` | f6372e83-8a7a-4367-974e-2914ec1e6048 | 0.002500 |
| Owned data-policy page | `brightdata.web-scrape` | d0e6e88a-d544-4f57-a8e9-97f589420b3f | 0.003300 |
| Owned cookieless-analytics page | `brightdata.web-scrape` | 9f0bfe3a-c7e2-4c00-a8c4-db1c6855aaef | 0.003300 |
| Rival UK PECR page | `brightdata.web-scrape` | bb5e05b5-e4e8-4494-8861-ae121c8396ed | 0.003300 |
| Regulator exceptions page (HTTP 502, empty) | `brightdata.web-scrape` | 08675662-068a-4ab5-a511-4911a7c5262a | 0.003300 |
| Regulator exceptions page, fallback | `firecrawl.web-scrape` | 8e35f014-bf14-45d2-b271-752a98c1ab92 | 0.002500 |
| **Total** | | | **0.073600** |

## Limits

Nine observations from one collection route over about three minutes are a small sample. They support investigation, not share-of-voice, causal or uplift claims. The branded comparison names the client and does not test spontaneous visibility. Third-party citations in one answer and the unexpected owned host were not inspected. Whether the client must rely on the statistical exception is a legal fact for the client to confirm; the report does not give legal advice. No website was changed and nothing was published. This note omits raw provider payloads and answer text.

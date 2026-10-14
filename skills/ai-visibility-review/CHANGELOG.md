# Changelog

> Git history and GitHub releases are the canonical change record.

## 3.0.0 — 2026-10-14

- Rename to ChatGPT Recommendation Check (id `ai-visibility-review` and
  aliases unchanged) with a founder-facing promise: how often ChatGPT
  recommends you when buyers ask, who it names instead, and three fixes to
  test, for about $0.20 a run.
- Ask only for the website and market. The agent drafts eight buyer questions
  that don't name the brand and the user ticks five; competitors come from the
  answers.
- Fixed sample: five questions × five answers plus one by-name question × three,
  asked in rounds so repeats are spaced out. Every repeat is a separate paid run
  (CLI `--new`, or a fresh idempotency key); a retry after a lost response reads
  the saved run or reuses the same key.
- Counted answers set `force_web_search` to false, because the tool's default
  is true; one forced web-search pass per question lists the pages ChatGPT
  reads and is reported separately.
- Results open with a one-screen scorecard: x/n counts with a plain-English
  range (rule of three when absent), never a rank or a single score. Receipts,
  run ids, costs and limits move to a Details section; the shareable client
  copy becomes an optional export.
- Say "inconclusive" for a question with fewer than 3 usable answers, more
  than 20% failed or unusable answers, or a model change mid-run.
- Three fixes on two tracks: improve your own pages, and get onto the exact
  pages ChatGPT cites for rivals. Article writing goes to Article Brief + Draft
  (`seo-content-brief`). A weekly re-check is offered after the first run.
- `serper.google-search` becomes optional. At 14 October 2026 prices a check
  costs about $0.217800 and at most $0.260800; the ceiling is $0.50.
- Verification dates are unchanged: the 3.0.0 method still needs its own paid
  verification run.

## 2.0.2 — 2026-10-12

- Remove the retired optional `brightdata.chatgpt-search` collection route;
  use a second route only when discovery finds a live one.
- Refresh the illustrative collection cost from the current inspection.
- Reverify the primary collection, search and page-inspection route with a
  public UK rehearsal.

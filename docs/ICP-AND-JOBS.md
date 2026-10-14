# ICP and jobs for Search and SEO Skills

Status: maintainer decision record; updated 7 September 2026 for the authorized launch release, and 14 October 2026 for Next SEO Moves and Article Brief + Draft (aimed at founders and small teams), the ChatGPT Recommendation Check (3.0.0) and the Rival Watch draft candidate.

## Primary customer

Since 14 October 2026 the primary customer is a founder or small team doing
their own marketing, who:

- decides every few weeks which pages to fix or write, and writes or edits
  them without an SEO specialist;
- can supply a website, one market and, ideally, a Search Console export;
- already uses an AI agent or is willing to delegate a bounded research job;
- wants a result they can act on today, at a visible cost in cents, more than
  an always-on dashboard or subscription; and
- can trial one real, non-sensitive question about their own site without
  procurement.

Hands-on SEO agency operators and in-house SEO leads can still use the
package, but its defaults, wording and result formats are set for a
non-specialist. The package is not for teams buying continuous rank tracking,
enterprise crawling, automated publishing, backlink outreach or a complete SEO
system of record.

## Jobs ranked by value and current evidence

| Rank | Customer job | Required artifact | Coverage | Evidence gate |
| --- | --- | --- | --- | --- |
| 1 | Decide which pages to fix or write next | Five numbered moves with exact edits, reasons and effort, a held list and plan files for new pages | Verified: `seo-opportunity-map` (Next SEO Moves) | 12 October 2026 rehearsal of 4.0.1: two updates and one hold at $0.167300; 5.1.1 verified 14 October 2026 on two public sites at about $0.26 a run, including the new-page hand-off |
| 2 | See how often ChatGPT recommends the business when buyers ask, and what to fix | One-screen scorecard from 25 buyer answers and 3 by-name answers, the rivals ChatGPT names, the pages it used and three fixes | Verified: `ai-visibility-review` (ChatGPT Recommendation Check) | 3.0.0 verified 14 October 2026: 33 of 33 answers usable, $0.214500, about 20–30 minutes |
| 3 | Write one article that can rank | Angle, headings with what each must prove and its source, questions to answer and a cited first draft | Verified: `seo-content-brief` (Article Brief + Draft) | 12 October 2026 rehearsal of 3.0.1 (brief only) at $0.027600; 4.1.0 passed its paid verification on 14 October 2026 at $0.114500 |
| 4 | Know what rivals changed this week | Up to five material changes with before/after quotes and links, a live ranking check, quiet rivals and a saved weekly snapshot | Draft candidate: `rival-watch` (Rival Watch) | First baseline run 14 October 2026 at $0.109100; needs a second run at least 7 days later before it can be verified |
| 5 | Cluster a keyword universe or conduct a technical page audit | Cluster map or technical diagnosis | Not separately packaged | Needs a distinct useful artifact and complete rehearsal |
| 6 | Find link opportunities | Link-gap artifact | Deferred | Add only after direct demand and a repeatable decision output |

## Current bundle decision

The package contains three independently installable outcome Skills and no
router Skill. Next SEO Moves and the ChatGPT Recommendation Check are the
current search campaign jobs. Article Brief + Draft stays a separate outcome but
chains from Next SEO Moves: a new-page move hands over a plan file, so the brief
reuses its keyword, results page and page reads instead of buying them again.
Rival Watch is a Draft candidate under `candidates/`: it is not exported or
installable until one complete rehearsal is accepted.

Do not add a broad SEO-audit Skill, a monolithic autonomous-SEO Skill or thin
wrappers around individual API endpoints. A new function Skill must have:

1. an independently valuable artifact with one-sentence acceptance;
2. a distinct trigger and consumer;
3. exact inspected tool and cost boundaries;
4. a safe checkpoint and recovery path;
5. one accepted complete rehearsal; and
6. a clear reason it should not be a mode inside an existing Skill.

## Acquisition hypothesis

- **Job promise:** your next five SEO moves (which page to fix or write, the exact edit, and why), or how often ChatGPT recommends the business when buyers ask, with three fixes to test.
- **Proof:** a finished Next SEO Moves result, exact observed provider spend,
  explicit uncertainty and no-ranking-guarantee boundary.
- **Low-friction trial:** one site, one market, two auto-found rivals and five
  moves inside a $0.275800 maximum at 14 October 2026 prices; one brief and
  draft inside $0.120700, plus an optional $0.126000 demand check; the ChatGPT check has its own fixed 33-answer plan at about $0.22.
- **Qualification:** demonstrated unresolved customer pain precedes the offer; an internal example is not customer validation.

The campaign may begin only after the public repository, Skill page and proof
route all present the same artifact and boundary. The first useful external
signal is an independent user completing the artifact; a star, visit, install,
prompt copy or connection is not outcome proof.

## Reference patterns adopted

The packaging review used the popular `coreyhaines31/marketingskills` repository
as a structural reference, particularly its discriminating trigger
descriptions, context-first intake, job branches, output formats, quality checks,
related-Skill boundaries, marketplace manifest and contribution surface.

Scrollport deliberately adds a higher execution bar: exact catalog tools,
inspected prices, approval checkpoints, run receipts, resumability and accepted
end-to-end evidence. Repository popularity is distribution evidence, not proof
that a workflow produced a valuable customer result.

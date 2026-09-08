# Tiny workflow results

All nine first submissions passed the coding requirements: 45/45 frozen acceptance groups. Revised used two phases for each tiny repair; old and current used three. Eight workflows completed garnish; one old workflow correctly preserved a blocker after the evaluator identified stale completion evidence. No run was retried or coached to a repair.

| Variant | Frozen acceptance groups | Planned phases across 3 tasks | Commits before garnish / cleanup |
|---|---|---|---|
| old | 15/15 | 9 | 18 / 2 |
| current | 15/15 | 9 | 7 / 3 |
| revised | 15/15 | 6 | 5 / 3 |

## Individual observations

| Case / variant | Acceptance | Subject suite rerun | Phases | Commits before / cleanup | Initial / closure seconds* | Markdown bytes at checkpoint |
|---|---|---|---|---|---|---|
| [limit / old](results/01-limit-old.md) | 4/4 | 6/6 | 3 | 6 / 1 | 334 / 96 | 11218 |
| [ids / current](results/02-ids-current.md) | 5/5 | 7/7 | 3 | 3 / 1 | 405 / 132 | 12739 |
| [duration / revised](results/03-duration-revised.md) | 6/6 | 6/6 | 2 | 2 / 1 | 335 / 89 | 13954 |
| [limit / current](results/04-limit-current.md) | 4/4 | 7/7 | 3 | 3 / 1 | 309 / 121 | 12636 |
| [ids / revised](results/05-ids-revised.md) | 5/5 | 7/7 | 2 | 2 / 1 | 329 / 86 | 13014 |
| [duration / old](results/06-duration-old.md) | 6/6 | 6/6 | 3 | 6 / 1 | 391 / 122 | 11692 |
| [limit / revised](results/07-limit-revised.md) | 4/4 | 6/6 | 2 | 1 / 1 | 371 / 121 | 13139 |
| [ids / old](results/08-ids-old.md) | 5/5 | 5/5 | 3 | 6 / 0 | 349 / 94 | 11826 |
| [duration / current](results/09-duration-current.md) | 6/6 | 8/8 | 3 | 1 / 1 | 322 / 93 | 12691 |

*Elapsed values are upper bounds from evaluator dispatch/receipt-record timestamps. They include host scheduling and recording delays, exclude evaluator checkpoint wait, and are not model execution timings. The ten-minute subject budget excluded that wait. Markdown byte counts include the five fixture documents, including shared seed guidance/SPEC/changelog; fewer documents alone is not a success criterion.

## Interpretation

I prefer revised for this workflow: it consistently reused completed local research and omitted the redundant confirmation phase while retaining implementation and final verification. Every revised result passed the same checks as old and current. This supports the requested phase simplification on these cases; it does not show superior coding ability. All implementations were small, preserved exports, avoided input mutation, and reused the existing duration helper. Current and revised produced byte-identical parser implementations.

The observed pre-garnish commit totals were old 18, current 7, revised 5. Treat those as descriptive: the revised parser and current duration subjects each chose one summary commit for the whole cycle, while others committed per phase. Inherited guidance and policy interpretation limit attributing those counts solely to the supplied skills. Old's duration plan also treated the embedded plan review as satisfying the explicit review request under its skip behavior; a separate pass is not evidenced.

The revised documents were slightly larger in every matched case, despite fewer phases: 13,014–13,954 Markdown bytes at the checkpoint, compared with current's 12,636–12,739 and old's 11,218–11,826. The detailed research record and expanded header add text. The demonstrated reduction is in required phases, not document size; there is no reliable wall-clock speed ranking here. The concrete helper, boundary, dead/debug-code, and assertion checks remain useful instructions, but these easy tasks do not isolate their individual effect.

One evidence discrepancy matters: [old / IDs](results/08-ids-old.md) passed all five behavior groups and its five tests, yet its final handoff still claimed a clean whitespace check after the baseline diff failed at HANDOFF.md:47 and PLAN.md:99. The subject disclosed the formatting issue in review as HARDEN but had not reconciled F3 completion evidence. When the evaluator supplied the failed check, garnish correctly refused cleanup and left every file and HEAD unchanged. This is a completion-evidence failure in that observation, followed by correct closure behavior; it is not a code failure or proof that the old set generally causes line-ending problems.

Keep the revised research reuse rule and the concrete implementation checks. Preserve the small-review ledger exception and the prohibition on other skills invoking review-vibe; those two changes were verified separately by inspection. Future refinements could shorten repeated research-record wording while preserving scope, sources, decisions, unknowns, and the gate. That possible refinement was not made after freezing the measured candidate.

| Closure observation | old | current | revised |
|---|---|---|---|
| Completed cleanup with exact supplied headers | 2/3 | 3/3 | 3/3 |
| Correctly blocked cleanup and preserved evidence | 1/3 | 0/3 | 0/3 |
| Implementation changed during cleanup | 0/3 | 0/3 | 0/3 |

## Evidence and limits

The [frozen protocol](README.md), [limit](cases/limit.md), [IDs](cases/ids.md), [duration](cases/duration.md), and [reviewer checks](reviewer.md) were fixed before scoring. Seeds passed visible tests; the frozen assertions exposed baseline defects (limit 1/4, IDs 0/5, duration 1/6), and reference fixes passed all 15 groups. The main evaluator independently reproduced those results before subject runs.

Every linked run preserves its exact task request, first return, full diff from the seed, commit history, independent acceptance output, independently rerun subject tests, and separate garnish continuation/diff. SHA-256 hashes identify source checkpoints. The [manifest](results/manifest.md) preserves exact variant revisions, per-skill and corpus hashes, seed hashes, and environment metadata. The original current baseline remains named `current`; the changed candidate is `revised`.

Each case ran once per variant in counterbalanced order: limit old/current/revised; IDs current/revised/old; duration revised/old/current. Cases overlapped in wall time. Fresh subject contexts and Git repositories used identical task text, fixtures, neutral seed guidance, tool access, and inherited model/effort. The common wrapper explicitly requested findings-only review-code, overriding old automatic prep, and permitted legitimate direct cater execution. A ten-minute limit was appended identically to every initial request.

Isolation was procedural on a shared host. Subjects were instructed to load only the supplied frozen bundle and avoid sibling/evaluator/parent state; host instructions and skill catalogs remained visible. Complete tool traces, exact model/effort identifiers, tokens, and tool/check/clarification counts were unavailable. Local research facts and current verification were inspectable; exact research-read order and historical red-test execution were not independently trace-verified. No claim of perfect isolation or comprehensive honesty auditing follows from passing tests.

These nine easy, single-run observations can show workflow behavior and regressions in the published cases. They do not establish statistical superiority, broad coding quality, or a reliable speed ranking. Review-vibe was excluded from the pipeline by design; its small-review ledger exception and standalone boundary were checked by prompt inspection and policy walkthroughs, not empirical subject runs. Missing/stale/blocked research guards likewise received manual walkthroughs; the coding cases exercise reuse of completed local research.

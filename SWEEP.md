# SWEEP — F1 research artifact (2026-07-22)

Short-lived working doc (F1 of PLAN.md). Cross-skill inconsistency register + skill-loading state machine + overlap/de-dup map. Feeds the F1→F3 review gate. F5 decides: persist loading table into AGENTS.md | drop at /garnish.

Scope read IN FULL: all 11 `skills/*/SKILL.md` + `AGENTS.md` + `SPEC.md`.

---

## A. INCONSISTENCY REGISTER

status: `plan` = already a task in PLAN.md · `NEW` = found this sweep · `decide` = needs user call

| id | site | current | issue | fix | status |
| --- | --- | --- | --- | --- | --- |
| X1 | garnish:7 desc | "then removes short-lived PLAN.md and HANDOFF.md" | garnish blanks, ⊥ delete | "blanks ... to their baked-header template" | plan F2.T4 |
| X2 | garnish:71 step 8 | "Verify both short-term files are absent" | same | "hold only their baked-header template"; "deletion"→"change" | plan F2.T4 |
| X3 | garnish:95 boundary | "Never delete files when unrelated changes are present." | delete framing | "Never blank the short-term files when unrelated changes present." | plan F2.T4 |
| X4 | garnish:14 intro | "destructive cleanup gate" | reads as delete | "cleanup gate that blanks short-term execution files to their template" | plan F2.T4 |
| X5 | cater:133 | "`garnish` removes exactly `PLAN.md` and `HANDOFF.md`" | delete framing | "blanks ... to their baked-header template" | plan F2.T5 |
| X6 | setup:42 | "then purge short-term plan files" | purge=delete | "then blank short-term plan files to their template" | plan F2.T5 |
| X7 | setup:96 | "→ purge PLAN.md + HANDOFF.md" | same | "→ blank PLAN.md + HANDOFF.md to template" | plan F2.T5 |
| X8 | AGENTS:24 | "→ purge PLAN.md + HANDOFF.md." | same | "→ blank PLAN.md + HANDOFF.md to template." | plan F2.T5 |
| X9 | encode-commit:27 | "SPEC.md/PLAN.md are purged each cycle" | 2 bugs: purge framing + SPEC.md ⊥ purged (durable) | "PLAN.md is blanked each cycle and SPEC.md rows get pruned" | plan F2.T5 |
| X10 | encode-docs:335 | `Tables (§R): pipe-delimited` | §C/§I/§V now tables too | `Tables (§C/§I/§R/§V): pipe-delimited, id-keyed` | plan F2.T2 |
| X11 | encode-docs:337 | `next: R<n> V<n>` | §C/§I now id-keyed | `next: C<n> I<n> R<n> V<n>` | plan F2.T2 |
| **X12** | encode-docs:350 baked PLAN header | `... numbered steps ... task: T<n>` singular | multi-task decision | multi-task-per-phase shape | plan F2.T2 |
| **X13** | encode-docs:221 prose | "Every phase section names: goal, tasks, inputs, files touched, **numbered steps** ..." | 2nd singular-model spot, ⊥ in plan | rewrite to multi-task shape | **NEW** |
| **X14** | review-plan:70 | "§T mapping — does every phase carry **exactly one** `task: T<n>` ... Duplicate ... BLOCK" | review-plan would BLOCK a valid multi-task plan | "≥1 `task: T<n>`, ids monotonic within phase; every task exists & ⊥ `x`" | **NEW — high** |
| **X15** | garnish:23 precondition | "Every PLAN phase has a `task: T<n>` mapping and every mapped `§T` row ... is `x`" | assumes one task/phase | "every `§T` row across all phases is `x`" | **NEW** |
| X16 | prep:21 | "each phase must have a task table with numbered steps" | "numbered steps" wording vs multi-task | align to multi-task tasks | **NEW — minor** |
| **X17** | setup:21-22 vs SPEC:21/§V15 | setup: "**six** core workflow steps ... step 2 is the encode-docs writing discipline"; SPEC §G: "**5-step**", §V15: encode-docs = support | contradiction: is encode-docs a core step or support? | align to SPEC §V15 (5 core, encode-docs support) OR change SPEC | **NEW — decide** |
| X18 | handoff:43-53 RULES | numbered 1,2,3,**5**,7,8 (4 & 6 deleted d2a87e5, ⊥ renumbered) | broken numbering | renumber 1-6 | **NEW** |
| X19 | review-plan:81 | "plan **diviating** ... **Diviation** is a DIVERGENCE" | typo | "deviating ... Deviation" | **NEW — F4** |
| X20 | review-code:63-64 | "codebase **diviating** ... **Diviation** is a DIVERGENCE" | typo | "deviating ... Deviation" | **NEW — F4** |
| X21 | cater:4 desc | "**Enhensed** cook ... sub-agents with holding" | typo + awkward | "Enhanced cook ... sub-agents, holding" | **NEW — F4** |
| X22 | setup:78 AGENTS template | "SPEC.md ... ⊥ one-time fixes; high bar to add" | template slightly behind actual AGENTS ("prune freely on evidence") | refresh template | **NEW — NOTE** (generic template, low pri) |

**Headline:** the multi-task-per-phase decision was propagated only to encode-docs:350. It is still contradicted at **encode-docs:221, review-plan:70 (a BLOCK trigger), garnish:23, prep:21**. X14 is the dangerous one — `review-plan` would fail any correct multi-task plan.

---

## B. SKILL-LOADING STATE MACHINE

`→` = invokes/loads at runtime. "co-loaded" = present when this skill runs.

| skill | trigger | reads at load | invokes → | guaranteed co-loaded |
| --- | --- | --- | --- | --- |
| setup | `/setup` | AGENTS, CLAUDE, CHANGELOG, SPEC | encode-docs (SPEC create) | encode-docs |
| prep | `/prep`; by review-code | SPEC, PLAN, HANDOFF, BACKLOG, repo | encode-docs (SPEC/PLAN), handoff | encode-docs, handoff |
| review-plan | `/review-plan`; after NO-GO | PLAN, SPEC, HANDOFF, web | encode-docs (§R/§V/PLAN/HANDOFF) | encode-docs |
| cook | `/cook` | HANDOFF, PLAN, SPEC, git | encode-docs (PLAN §T/SPEC), encode-commit, handoff | encode-docs, encode-commit, handoff |
| cater | `/cater` | HANDOFF, PLAN, SPEC, git | sub-agents→cook; encode-docs, handoff | encode-docs, handoff (+cook in sub-agents) |
| garnish | `/garnish`; by cook/cater end | SPEC, PLAN, HANDOFF, git | encode-docs (prune/blank) | encode-docs |
| review-code | `/review-code`; by garnish end | SPEC, PLAN, HANDOFF, diff, tests | prep (→encode-docs, handoff) | prep, encode-docs, handoff |
| handoff | `/handoff`; end of prep/cook/cater/review-plan session | git, PLAN, SPEC | encode-docs (writes HANDOFF) | encode-docs |
| encode-docs | any SPEC/PLAN/HANDOFF write; `/encode-docs`; invoked by 7 skills above | target doc | — (terminal writer) | whichever skill invoked it |
| encode-commit | `/encode-commit`; auto on stage; by cook/handoff | staged diff | — | cook (when in cook) |
| encode-pr | `/encode-pr` | PR diff | — | none (standalone) |

**Owners that TRAVEL** (present in any repo the skill is installed in): baked headers of SPEC/PLAN/HANDOFF (carry symbol line, format rules, §T legend, planning-status) — they ship inside the docs; and `encode-docs` — every doc-writing skill invokes it, so it loads on compose. **Owners that do NOT travel:** this repo's `AGENTS.md` / `SPEC.md` (repo-specific, ⊥ shipped with skills).

**planning-status lifecycle** (per §V29, to be built F2): `prep` writes `work-in-progress` → `cook`/`cater` run ⟺ `work-in-progress` → `handoff` sets `done` on ∀ §T `x` + verify HOLD → `garnish` blanks & resets `new` → next `prep`. Guard: `new`→stop(/prep), `done`→stop(/garnish).

---

## C. OVERLAP MAP + DE-DUP PROPOSAL

Gate for any cut (§V28): the canonical owner must be guaranteed co-loaded (invoked-on-compose | a baked doc header that travels). Skills are products installed alone → a standalone-needed statement ⊥ cut.

| # | content | owner (travels?) | restaters | safe cut? |
| --- | --- | --- | --- | --- |
| O1 | symbol table | encode-docs SYMBOLS + baked doc headers (yes) | setup (EMITS into AGENTS — necessary), AGENTS (always-on ref) | **~none** — no skill body carries a full redundant table; handoff/prep/cook already lean |
| O2 | encoding grammar | encode-docs GRAMMAR | AGENTS, setup (emits) | none — restaters are emitters/always-on refs |
| O3 | preserve-verbatim list | encode-docs PRESERVE | baked headers (compact) | none — no skill-body dup |
| O4 | baked-header/format rules | encode-docs (compose) | garnish, cook, handoff | **~none** — already deferred ("encode-docs owns the shape") |
| O5 | §T legend `x/~/.` | encode-docs + baked PLAN header | setup (emits), AGENTS | none — emitters/refs |
| O6 | file roles (SPEC durable / PLAN+HANDOFF short-lived) | AGENTS + SPEC §G (⊥ travel) | one-liners in cook/cater/review-*/setup LOAD | keep — each needs it standalone |
| O7 | encode-docs sole-mutator | SPEC §V16 (⊥ travel) | one-line boundary in prep/handoff/review-plan/setup/garnish | keep — standalone boundary |
| O8 | quality contract (principal-engineer/verify-driven/lean) | prep (self-declared mirror) | cook desc+body, cater desc, review-code | keep — each standalone; light F4 tighten only |
| **PROTECTED** | FINDING TAXONOMY & GATE | review-plan == review-code | verbatim mirror (§V26) | **⊥ cut** |
| **flag** | REPORT OUTPUT block | review-plan:136-156 ≈ review-code:137-160 near-verbatim | both standalone (neither invokes other) | **⊥ safely cut** — no co-loaded owner. Options: declare 2nd intentional mirror, or accept dup |

### CUT LIST (F3) — approved cuts go here
- (empty pending finding below)

### KEEP LIST + reason
- O1-O5 restaters = emitters (setup), always-on refs (AGENTS), or self-describing headers → not redundant.
- O6-O8 = standalone-required one-liners / operating principles → §V28 forbids cutting.
- REPORT OUTPUT block = duplicated but both skills standalone → not cuttable without a co-loaded owner.
- FINDING TAXONOMY = protected §V26 mirror.

### HONEST FINDING (the key F1 conclusion)
Cross-skill de-dup yields **almost nothing**. The skills are already well-factored: they defer to `encode-docs` where it's co-loaded (`handoff`: "do NOT reproduce that template here"), the symbol/format duplication lives only in **necessary emitters** (`setup` writes AGENTS) or **self-describing doc headers** (which travel), and the remaining repeats are standalone-required one-liners that §V28 protects. The two large verbatim blocks are either the protected §V26 mirror or the standalone REPORT OUTPUT block.

∴ **F3 (de-dup) is near-empty.** The real token savings the user wants come from **F4 (unwrap + lean prose within each skill)**, not from cross-skill cutting. Recommend treating F3 as: apply the (tiny/none) cut list, and shift the token-reduction expectation to F4.

---

## D. RECOMMENDATIONS → gate decisions

1. **Expand F2 to finish the multi-task propagation** (X13, X14, X15, X16) — decided work (multi-task is locked), but only X12 is currently in the plan. X14 (review-plan BLOCK) is important.
2. **Fold handoff renumbering (X18) into F2**; typos (X19-X21) into F4.
3. **DECIDE X17** (workflow step count): SPEC §G/§V15 say 5 core steps with encode-docs = support; `setup` says 6 core steps with encode-docs = step 2. Pick the canonical framing; I recommend keeping SPEC's 5-step / encode-docs-as-support and fixing setup.
4. **DE-DUP (F3) expectation**: near-empty. Approve the (empty) cut list, or decide the REPORT OUTPUT block (2nd mirror vs accept). Token win is F4.

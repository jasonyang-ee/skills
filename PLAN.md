<!-- PLAN FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Short-lived: one cycle. Replaced wholesale, ⊥ amended. Durable facts → SPEC.md.
Order: goal | ground rules | existing assets | phase order table | one section per phase.
Phase ids F1..Fn monotonic. F1 ! research. Fn ! final verify. ⊥ coding outside that span.
∀ phase names: goal | inputs | files | numbered steps | verify | exit | next | task: T<n>
§T tasks defined & tracked here, ⊥ SPEC.md. Status: x done | ~ wip | . todo.
`task:` = exactly one §T id from this file; ⊥ two phases share one id.
Encoding: same symbol set as SPEC.md. Preserve code/paths/ids verbatim.
Executable cold: a phase ⊥ readable without chat history is ⊥ finished.
Full rules: /encode-docs skill.
-->

# PLAN

goal: v16 round — encode-docs = sole mutator ∀ 3 docs; lean symbol-notation HANDOFF w/ `F<n>.T<n>` pointers; purge tests → minimal gate (skill-contract + CLI); add Codex + Claude Code native install paths; slim encode-commit ≤60 lines; unify review-code + review-plan finding taxonomy & exhaustive GO/NO-GO gate.

## ground rules
- encode-docs = sole mutator ∀ `SPEC.md`/`PLAN.md`/`HANDOFF.md` (§V16). ∀ write to those 3 → load encode-docs, hand it content, it writes. ⊥ direct write by any other skill.
- Durable truth → `SPEC.md` via encode-docs only. DONE in review-plan: §C install-URL fix + §R6/§R7. Remaining: F2 edits §C (test scope), F6 adds §I (install cmds), F7 anchors §V (review taxonomy). ⊥ new SPEC row unless standing guarantee (high bar); prefer edit/delete over add.
- Implement cue: smallest codebase-consistent change; verify-first; self-review full diff before commit.
- Close cue: ∀ phase ends green on minimal suite (`node --test`) + named grep evidence; ⊥ "looks good"/"best effort" as done.
- Test scope (user decision this round): skill-contract (§V1-4) + real CLI discovery (§V5) only; license/NOTICE/permissions/hygiene → manual review, ⊥ test-backed.
- Review gate = shared contract: review-code + review-plan state the SAME finding taxonomy + SAME GO/NO-GO decision rule verbatim; anchor via §V (mirror-check). Gate rule ! exhaustive over ∀ category (which force NO-GO, which allow GO). Skill-specific axes/scope stay separate.
- Skill body ≤500 lines (§V4). encode-commit target ≤60 lines (whole file). ⊥ emoji (§V8); ⊥ project-specific|private refs in `skills/**` (§V7).
- F1 ! research, F7 ! final verify; ⊥ coding outside that span. Do F2 (test purge) early so F3-F6 verify vs clean suite.
- Commit ∀ phase via encode-commit (plain English, ⊥ encoding symbols, ⊥ plan/spec ids); refresh `HANDOFF.md` via encode-docs ∀ phase. ⊥ push|tag without explicit ask.

## existing assets
- `SPEC.md` lean (§V1-V25). §V16 sole-mutator + §V20 baked-headers already declared — bodies ! comply. §V1-5 = skill-contract + CLI oracles. §C names 3 install targets; §R5 = Claude Code skills note.
- `skills/encode-docs/SKILL.md`: sole-mutator claim scoped to `SPEC.md` only (line 13); doc table says PLAN/HANDOFF "written by prep/cook/cater" + "handoff" → contradicts §V16. HANDOFF.md FILE section + baked header verbose.
- `skills/handoff/SKILL.md`: writes `HANDOFF.md`; template duplicates encode-docs; ~60-line prose.
- `tests/`: 5 files. `repo-hygiene.test.mjs` (~780 lines) asserts skill-body prose ("seven lifecycle commands", "front door", retired names) + cites stale invariant nums (V8/V14/V39 ← `SPEC-OBSELETE.md`) → the "bad" suite. Keepers: `skill-contract.test.mjs` (§V1-4), `cli-discovery.test.mjs` (§V5), `helpers.mjs`. `attribution.test.mjs` → dropped (license = manual review now).
- `skills/encode-commit/SKILL.md` = 94 lines; vendored (NOTICE row) → trim body, keep NOTICE, ⊥ attribution block in body.
- Install (RESEARCHED → §R6/§R7): `npx skills add -a <agent>` ALREADY serves Codex + Claude Code from flat `skills/` ∴ Codex needs ⊥ new files. Only new artifact = Claude Code plugin marketplace (`.claude-plugin/marketplace.json` + `plugin.json`) for CLI-free `/plugin` install. Old `codex.skills.sh/docs` = 404 → §C fixed in review-plan.
- `release.sh` gate = `npm test`; ! stay meaningful (2 real oracles ok).
- `skills/review-code/SKILL.md`: taxonomy defined TWICE & inconsistently — "Review procedure" step 5 (by *nature*) vs "## CLASSIFY" (by *gate action*); CLASSIFY HARDEN = "split a vague step" = plan-review language mis-pasted. Gate output = bare `gate: <GO|NO-GO>`, no category→gate rule. Already ⊥ writes PLAN/HANDOFF/SPEC (hands to prep) ∴ ⊥ in F4 sweep.
- `skills/review-plan/SKILL.md`: "## CLASSIFY" lists DIVERGENCE but "## GATE" output template OMITS it; only rule = "plan w/ open BLOCKs ⊥ GO"; DIVERGENCE/`?`/HARDEN/NOTE unmapped. Has direct "Replace PLAN.md"/"Update HANDOFF.md" verbs ∴ ∈ F4 sweep.
- §V24 (review-plan) + §V25 (review-code) name the skills but ⊥ define the taxonomy or gate rule.
- `SPEC-OBSELETE.md` + `REFACTOR.md` = cruft, out of scope, leave untouched.

## §T tasks
id|phase|desc|status|checks
T1|F1|confirm §R6/§R7 currency + lock marketplace.json/plugin.json field-set|x|schema matches cited docs, F6 file-set final
T2|F2|purge tests → minimal gate; narrow §C|x|§V1-5, §C truthful
T3|F3|encode-docs sole-mutator ∀3 + lean HANDOFF (`F<n>.T<n>`) + handoff skill|.|§V16, §V20
T4|F4|sole-mutator consumer sweep + AGENTS.md|.|§V16
T5|F5|slim encode-commit ≤60 lines|.|§V4, ≤60
T6|F6|Claude Code plugin marketplace manifests + document all install paths|.|manifests parse, §I install rows, README/AGENTS 3 paths
T7|F7|unify review-code + review-plan taxonomy + exhaustive GO/NO-GO gate|.|§V mirror-check, both skills identical block
T8|F8|final verify code vs SPEC/PLAN|.|all

## phase order
id|goal|depends|exit
F1|confirm §R6/§R7 currency; lock manifest field-set|-|schema matches cited docs; F6 file-set final
F2|purge tests → minimal gate (skill-contract+CLI); narrow §C|F1|`node --test` green, 2 test files+helpers, §C edited via encode-docs
F3|encode-docs sole-mutator ∀3 + lean HANDOFF + handoff skill|F1|encode-docs+handoff consistent, ≤500 lines, ⊥ §V16/§V20 contradiction
F4|sole-mutator consumer sweep + AGENTS.md|F3|grep: ⊥ direct PLAN/HANDOFF write outside encode-docs
F5|slim encode-commit ≤60 lines|-|encode-commit ≤60 lines, spec-compliant, NOTICE intact
F6|Claude Code plugin marketplace manifests + document 3 install paths; §I via encode-docs; README/AGENTS|F1|manifests parse; `skills add . --list`=11; docs show 3 paths
F7|unify review skills: shared taxonomy + exhaustive GO/NO-GO gate|F4|both review skills mirror one taxonomy+gate; §V anchor via encode-docs
F8|final verify code vs SPEC & PLAN|F2,F3,F4,F5,F6,F7|full suite green, §V table filled, CHANGELOG updated, drift resolved

## F1 confirm install research
task: T1
goal: confirm §R6/§R7 still current; lock exact `.claude-plugin/marketplace.json` + `plugin.json` field-set for F6. (Heavy research DONE in review-plan → §R6/§R7; this phase = currency check only. Removal candidate on next `/prep`.)
inputs: SPEC §R6 §R7, https://code.claude.com/docs/en/plugin-marketplaces, https://code.claude.com/docs/en/plugins-reference, https://www.skills.sh/agent/codex
files: none (research only)
steps:
1. Re-fetch plugin-marketplaces + plugins-reference; confirm marketplace.json required keys `{name, owner{name}, plugins[]}` + plugin entry `{name, source, description}`; confirm `source:"."` = repo-root plugin w/ `skills/` auto-scan. If drifted → update §R7 via encode-docs.
2. Confirm `npx skills add -a codex` + `-a claude-code` still valid (skills.sh/agent pages); Codex ⊥ new files.
3. Lock F6 file-set: `.claude-plugin/marketplace.json` + `.claude-plugin/plugin.json` (both @ repo root, ⊥ under `skills/`).
verify: schema matches live docs (or §R7 updated); F6 file-set final; ⊥ unresolved `?`.
exit: manifest field-set locked.
next: F2

## F2 tests purge → minimal gate
task: T2
goal: replace bloated brittle suite w/ 2 real oracles; narrow §C test-scope to match.
inputs: `tests/*`, `tests/helpers.mjs`, SPEC §V1-5 + §C test-scope line
files: `tests/skill-contract.test.mjs`, `tests/cli-discovery.test.mjs`, `tests/helpers.mjs` (keep); delete `tests/repo-hygiene.test.mjs` + `tests/attribution.test.mjs`; `SPEC.md` §C via encode-docs; `AGENTS.md` test note
steps:
1. Delete `tests/repo-hygiene.test.mjs` + `tests/attribution.test.mjs`.
2. Keep `tests/helpers.mjs`. In `tests/skill-contract.test.mjs` re-point comments → current §V1-4 (drop stale V8/V14/V39); keep V1-4 assertions (frontmatter parse, name/desc non-empty string, name==dir & legal & unique & ≤64, desc ≤1024, body ≤500).
3. In `tests/cli-discovery.test.mjs` re-point comment → §V5; keep real-CLI `skills add . --list` list oracle.
4. Route §C edit → encode-docs (AMEND): narrow test-scope line → "Tests = `node:test`; scope = Agent Skills contract (§V1-4) + real CLI discovery (§V5) only; license/release/hygiene = manual review, ⊥ test-backed; ⊥ assert doc prose | skill-body wording." Show diff, write.
5. Update `AGENTS.md` `tests/` layout note + End-of-Chat checklist → new scope (F4 also edits AGENTS.md; keep edits additive, ⊥ clobber).
verify: `node --test` green; `tests/` = skill-contract + cli-discovery + helpers only; grep `tests/` for stale `V8|V14|V39` refs = 0; SPEC §C reflects new scope.
exit: minimal suite green, §C truthful.
next: F3

## F3 encode-docs sole-mutator ∀3 + lean HANDOFF
task: T3
goal: encode-docs body = sole mutator ∀ SPEC/PLAN/HANDOFF (match §V16); redesign HANDOFF.md FILE + baked header lean & SPEC-style w/ `F<n>.T<n>` pointers; align handoff skill.
inputs: `skills/encode-docs/SKILL.md`, `skills/handoff/SKILL.md`, SPEC §V16 §V20, user HANDOFF direction
files: `skills/encode-docs/SKILL.md`, `skills/handoff/SKILL.md`
steps:
1. encode-docs line 13: "sole mutator of `SPEC.md`" → sole mutator of ∀ 3 docs. Fix doc table `written by` col → "encode-docs (content from <skill>)" ∀ rows; ⊥ "written by prep/cook/handoff".
2. Rewrite `## HANDOFF.md FILE`: lean, symbol-heavy, one-line where possible (learn from SPEC row shapes). Pointer convention: cite PLAN phase.task as `F<n>.T<n>` (current e.g. `F2.T5`, next e.g. `F2.T6`). Retain full resolution: header (branch|commit|tests|baseline+oracle|uncommitted), done, in-progress(exact next: file+function), next(`F<n>.T<n>`), deviations, watchouts, final-verify table. Cut prose, ⊥ cut facts.
3. Rewrite HANDOFF baked header → match new lean shape + `F<n>.T<n>` convention.
4. `skills/handoff/SKILL.md`: keep as content-gatherer; state it hands content → encode-docs writes (⊥ direct write); reference new lean template (⊥ duplicate full template); keep ≤ current length.
5. Confirm encode-docs still ≤500 lines; §V16/§V20 satisfied; ⊥ self-contradiction.
verify: grep encode-docs + handoff: sole-mutator = ∀3; HANDOFF template uses `F<n>.T<n>`; `node --test` green; encode-docs body ≤500 lines.
exit: format owner + baton skill consistent w/ lean HANDOFF.
next: F4

## F4 sole-mutator consumer sweep + AGENTS.md
task: T4
goal: ∀ consumer skill routes PLAN/HANDOFF writes through encode-docs; ⊥ direct-write phrasing.
inputs: `skills/{prep,cook,cater,garnish,review-plan,setup}/SKILL.md`, `AGENTS.md`, F3 result
files: `skills/prep/SKILL.md`, `skills/cook/SKILL.md`, `skills/cater/SKILL.md`, `skills/garnish/SKILL.md`, `skills/review-plan/SKILL.md`, `skills/setup/SKILL.md`, `AGENTS.md`
steps:
1. prep: "Write or replace `PLAN.md`" (§4) + "trigger handoff" → "hand `PLAN.md` content to encode-docs (sole mutator); it writes"; keep research-first/verify-last intact.
2. cook + cater: "refresh `HANDOFF.md`" / "flip §T in `PLAN.md`" → route write through encode-docs.
3. garnish: purge/blank `PLAN.md`+`HANDOFF.md` → route through encode-docs.
4. review-plan: "updates `PLAN.md` and `HANDOFF.md`" → route through encode-docs.
5. setup: blank SPEC/PLAN/HANDOFF spawn → via encode-docs.
6. `AGENTS.md` `## AI File Purpose`: state encode-docs = sole mutator ∀ 3 docs.
verify: grep `skills/**` for direct `PLAN.md`|`HANDOFF.md` write verbs (write|replace|refresh|overwrite|purge) ⊥ adjacent to "encode-docs" = 0 offenders; `node --test` green.
exit: §V16 realized in ∀ bodies.
next: F5

## F5 slim encode-commit
task: T5
goal: encode-commit ≤60 lines (whole file), aggressive cut, keep signal.
inputs: `skills/encode-commit/SKILL.md`, `NOTICE.md` row
files: `skills/encode-commit/SKILL.md`
steps:
1. Keep: frontmatter (name+description), Conventional Commits subject rules (≤50/72, imperative, types), body-only-if-needed, never-list incl. ⊥ encoding symbols + ⊥ plan/spec ids (`F1`/`T77`/`V77`) w/ 1-line "expand to English", 1 tight example.
2. Cut: redundant prose, duplicate examples, Auto-Clarity section (fold into body rule), verbose Boundaries.
3. ⊥ attribution block in body (NOTICE = record). Whole file ≤60 lines.
verify: `wc -l skills/encode-commit/SKILL.md` ≤60; `node --test` green; `NOTICE.md` encode-commit row intact + still marked modified.
exit: encode-commit lean.
next: F6

## F6 Claude Code plugin marketplace + install docs
task: T6
goal: add Claude Code CLI-free `/plugin` install via marketplace manifests; document all 3 install paths. Codex needs ⊥ new files (§R6) — doc-only.
inputs: F1 locked field-set, SPEC §R6 §R7, `README.md`, `AGENTS.md`, SPEC §I
files: `.claude-plugin/marketplace.json`, `.claude-plugin/plugin.json`, `README.md`, `AGENTS.md`, `SPEC.md` §I via encode-docs
steps:
1. Write `.claude-plugin/marketplace.json` = `{name:<mkt>, owner:{name:"jasonyang-ee"}, plugins:[{name:<plugin>, source:".", description}]}`. Write `.claude-plugin/plugin.json` = `{name:<plugin>, description, version}` (sets plugin name; root `skills/` auto-scanned as its skills). Both @ repo root, ⊥ under `skills/`, ⊥ scripts/runtime dep (§V6).
2. Validate both JSON parse; `skills add . --list` still lists all 11 skills; skill-contract + CLI tests green.
3. `README.md` + `AGENTS.md`: document 3 install paths beside npx — `npx skills add jasonyang-ee/skills -a claude-code`, `... -a codex`, `/plugin marketplace add jasonyang-ee/skills` + `/plugin install <plugin>@<mkt>`.
4. Route SPEC §I via encode-docs: add `file:` (marketplace.json) + `cmd:` (`/plugin ...`) install rows. §V install invariant only if durable standing guarantee (high bar; default none).
verify: both manifests parse + match §R7 schema; `node --test` green; `skills add . --list`=11; README+AGENTS show 3 paths; SPEC §I updated. Live `/plugin marketplace add .` = manual user smoke (UNVERIFIABLE in CI).
exit: Claude Code plugin path live + all 3 install paths documented.
next: F7

## F7 unify review-skill gates
task: T7
goal: one canonical finding taxonomy + one exhaustive GO/NO-GO rule, stated identically in review-code + review-plan; anchor via §V. Skill-specific axes/scope stay separate.
inputs: `skills/review-code/SKILL.md`, `skills/review-plan/SKILL.md`, SPEC §V24 §V25, user intent (may expand categories)
files: `skills/review-code/SKILL.md`, `skills/review-plan/SKILL.md`, `SPEC.md` §V via encode-docs
steps:
1. Catalog both skills: every place a category is defined + every gate phrase; confirm the drifts (review-code dual/mis-pasted CLASSIFY; review-plan gate omits DIVERGENCE; no exhaustive rule).
2. Design canonical taxonomy. Base 4: BLOCK, HARDEN, DIVERGENCE, NOTE. Expand ONLY where it raises accuracy — candidates: security finding ! always BLOCK; DIVERGENCE {open|resolved} (resolved once user picks fix-code | amend-SPEC-via-encode-docs); unresolved `?`/UNKNOWN (review-plan research gate) as own gate-holding state. Each category = one line: name — meaning — required action — gate effect.
3. Design exhaustive GO/NO-GO decision rule covering ∀ category & combo: NO-GO iff ≥1 open BLOCK | ≥1 open DIVERGENCE | ≥1 blocking unresolved `?`; else GO. HARDEN + NOTE never block GO (carry to next `prep`). State the resolve-path flipping DIVERGENCE open→resolved. ⊥ shrug; always GO|NO-GO.
4. Write ONE shared block (taxonomy + gate table) verbatim into BOTH skills. Delete review-code's duplicate/mis-pasted definitions; add DIVERGENCE to review-plan gate output; make both gate outputs list ∀ category.
5. Keep each skill's own scope + axes intact (review-plan = pre-cook plan gaps; review-code = post-release code sweep). Only taxonomy + gate rule are shared.
6. Hand §V → encode-docs: prefer editing §V24/§V25 over adding; anchor "review-code & review-plan use identical finding taxonomy + GO/NO-GO rule". Show diff, write.
verify: diff both skills — taxonomy+gate block byte-identical; both gate outputs list ∀ category; grep review-code for "split a vague step" = 0; SPEC §V anchors the shared contract; `node --test` green (bodies ≤500).
exit: review skills consistent + gate exhaustive; §V anchored.
next: F8

## F8 final verify
task: T8
goal: prove cycle vs SPEC+PLAN; resolve drift; close.
inputs: SPEC §V1-5,§V16,§V20,§V24/§V25 + touched §C/§I/§R/§V; PLAN F1-F7; tests; `git diff` since HEAD
files: `CHANGELOG.md`, `HANDOFF.md` via encode-docs (read all touched)
steps:
1. Re-read touched SPEC sections + PLAN phases.
2. Run `node --test` (green) + `wc -l skills/encode-commit/SKILL.md` (≤60) + grep sweeps (⊥ direct PLAN/HANDOFF writes; ⊥ stale invariant refs in tests; sole-mutator = ∀3; HANDOFF template `F<n>.T<n>`; review taxonomy+gate block identical across both review skills).
3. Classify §V1-5, §V16, §V20, review §V, new install §I/§V as HOLD|VIOLATE|UNVERIFIABLE w/ file/test evidence.
4. Sweep touched skills for logic/complexity/reuse/coherence drift; cite each.
5. Update `CHANGELOG.md` `[Unreleased]` plain English (∀ item: sole-mutator, lean HANDOFF, test purge, install paths, encode-commit slim, review-gate unification).
6. Record result table → `HANDOFF.md` via encode-docs.
verify: full suite green; ∀ §V item HOLD or drift decided; CHANGELOG updated.
exit: cycle proven; ready `/garnish`.
next: - (cycle end → `/garnish`)

<!-- HANDOFF FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Session baton. Overwritten in full ∀ session. Records STATE, ⊥ intent (intent → PLAN.md, truth → SPEC.md).
Sections: header | done this session | in progress (exact stop point) | next | deviations & decisions | watchouts | final verification. Empty section → -, ⊥ deleted.
Header ! carry: branch | last commit sha (⊥ subject) | tests pass N/N | FAIL: file+case + command | uncommitted files + why
Pointers = F<n>.T<n> (phase.task → PLAN.md), ⊥ bare step numbers. "in progress" & "next" ! use them.
"in progress" ! name current working task precisely: action, file, function. mid-edit files ! listed | `none`.
Failing tests ! named exactly (file + case), ⊥ "some failing".
final verification table ! filled only by final verify phase; else header row alone.
Encoding: same symbol set as SPEC.md.
Full rules: /encode-docs skill.
-->

# HANDOFF 2026-09-05

branch `main` | last commit `331df1d` | tests pass 7/7 (`npm test`) | uncommitted: `CHANGELOG.md`, `HANDOFF.md`, `PLAN.md`, `SPEC.md`, `skills/cater/SKILL.md`, `skills/cook/SKILL.md`, `skills/prep/SKILL.md`, `skills/review-code/SKILL.md` — cycle complete; commit deferred because explicit user ask required

## done this session
F1.T1-F1.T2: mapped portable latest-model cues to repo roles; fixed blast radius on `CHANGELOG.md` required, `README.md`/`skills/review-plan/SKILL.md` evidence-gated → uncommitted
F2.T1-F2.T2: updated `prep` quality contract with focused-question autonomy, instruction priority, result-first reporting, and verification scoped to planning work → uncommitted
F3.T1-F3.T3: updated `cook` + `cater` with follow-through, approval/instruction rules, plain reporting, and calibrated verification wording → uncommitted
F4.T1-F4.T3: updated `review-code` read-only autonomy guidance; left mirrored `review-plan` blocks untouched; added `CHANGELOG.md` unreleased note → uncommitted
F5.T1-F5.T3: reread touched docs, self-reviewed diff, ran `npm test` 7/7, marked plan done, routed next step to `/garnish` → uncommitted

## in progress (exact stop point)
F5.T3: status: done
mid-edit files: none

## next
F5.T3 | preconditions: plan complete; invoke `/garnish`; ask if user wants commits before release workflow

## deviations & decisions
- began with `/prep` output already on disk, then executed remaining work through `cook`
- `SPEC.md` amended only in §R: added source-backed portable guidance row `R10`; durable invariant set unchanged because prose-only behavior lacks a named semantic oracle beyond structural repo checks
- Context7 docs lookup unavailable (`ctx7sk` API key missing) → used direct source page fetch `https://developers.openai.com/api/docs/guides/latest-model` dated 2026-09-05
- `README.md` unchanged; current public skill summaries still accurate enough after this wording pass
- `skills/review-plan/SKILL.md` unchanged; mirrored FINDING TAXONOMY & GATE and REPORT OUTPUT blocks in `review-code` stayed byte-identical by leaving them untouched
- commit step from `cook` intentionally skipped: higher-priority session policy forbids git commits without explicit user ask

## watchouts
- `review-code` shares FINDING TAXONOMY & GATE + REPORT OUTPUT blocks with `review-plan`; any edit there ! byte-identical mirror
- guide source is model-specific (`GPT-6 Astra`); implementation should keep only portable behavioral guidance in public generic skills
- `prep` must increase follow-through without authorizing code edits; `review-code` must increase follow-through without losing read-only boundary
- on next `/prep`, remove broad external-guide research for this topic if source unchanged — unknowns already resolved; retain only repo-local confirmation needed for changed files

## final verification
item|status|evidence|decision
F2.T1|HOLD|`skills/prep/SKILL.md` quality contract item 1 + item 6|code
F2.T2|HOLD|`skills/prep/SKILL.md` quality contract items 7-8|code
F3.T1|HOLD|`skills/cook/SKILL.md` OPERATING PRINCIPLES 6-9 + EXECUTE step 4|code
F3.T2|HOLD|`skills/cater/SKILL.md` OPERATING PRINCIPLES 2,6-8|code
F3.T3|HOLD|`skills/cook/SKILL.md` EXECUTE step 8; `skills/cater/SKILL.md` OPERATING PRINCIPLES 9 + acceptance review step 7|code
F4.T1|HOLD|`skills/review-code/SKILL.md` `## REVIEW AUTONOMY` + REVIEW PROCEDURE step 4|code
F4.T2|HOLD|`skills/review-code/SKILL.md` shared mirror blocks unchanged vs `skills/review-plan/SKILL.md`|code
F4.T3|HOLD|`CHANGELOG.md` `## [Unreleased]` `### Changed` entry present|code
V1|HOLD|`npm test` → `tests/skill-contract.test.mjs` `ships at least one skill with parseable frontmatter`; `declares name and description as non-empty strings`|code
V3|HOLD|`npm test` → `tests/skill-contract.test.mjs` `keeps every description within the spec limit`|code
V4|HOLD|`npm test` → `tests/skill-contract.test.mjs` `keeps every body under the recommended length`|code
V5|HOLD|`npm test` → `tests/cli-discovery.test.mjs` `lists every skill in skills/`|code
V11|HOLD|`CHANGELOG.md` contains `## [Unreleased]` + new unreleased note|code
V21|HOLD|`skills/prep/SKILL.md`; `PLAN.md` keeps F1 research-first, F5 final verify|code
V22|HOLD|`skills/cook/SKILL.md` keeps verification-first execution + stop conditions|code
V25|HOLD|`skills/review-code/SKILL.md` remains read-only and still hands work to `prep`|code
V26|HOLD|`skills/review-code/SKILL.md` mirrored taxonomy/report blocks left unchanged against `skills/review-plan/SKILL.md`|code
V29|HOLD|`PLAN.md` planning status `done`; all `§T` rows `x`|code
V30|HOLD|`skills/cater/SKILL.md` still requires model/effort disclosure and bounded delegation|code

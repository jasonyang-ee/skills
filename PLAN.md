# PLAN

goal: canonical focus-trigger keywords ∀ 6 SDD steps in owning SKILL.md; + Security/infosec dimension; fix shipped `workonplan` description defect (B5).

## ground rules
- quality contract: production-quality, verification-driven, evidence-based. ∀ phase → evidence named before flip §T `x`.
- `spec` sole SPEC.md mutator. ∀ PLAN/HANDOFF write → load `caveman-encode`.
- ∀ description edit ! stay ≤1024 chars (V6) & Agent Skills spec legal (§R.1).
- ⊥ restyle vendored voice beyond keyword additions; NOTICE.md diff scope unchanged.
- keyword placement rule: focus keyword ! live in skill loaded @ that step (description = trigger surface, body = behavior). `cook` quality contract = map, mirrors ⊥ sole carrier (V75).
- tests scope = `skills/**` only (§C). Doc §V = manual oracle.

## existing assets
- review-code sweep 2026-07-16: baseline v0.4.0, head 8f3ed58, tests 183/183 green, gate NO-GO (B5).
- re-sweep 2026-07-17: ∀ findings re-confirmed vs live tree; tests 183/183 green; +2 defects from prior session: dup §B id `B2` (renumbered → B5, done) & PLAN.md emitted w/o HANDOFF.md pair (fixed this session via handoff).
- findings: B5 `workonplan` description fragment @ skills/workonplan/SKILL.md:6-8; zero security vocab ∀ 6 core skills (grep proof); review-plan research gate ⊥ "latest web data" wording @ skills/review-plan/SKILL.md:48-49; cook quality contract sole carrier of 6 cues @ skills/cook/SKILL.md:25-47; cook description dup keywords @ :8-14.
- NOTE (⊥ phase): tests/repo-hygiene.test.mjs:318 asserts typographic quotes “ ” verbatim → brittle; fix opportunistically ∈ F4.
- SPEC: V71-V75, T72-T76, B5 landed.
- existing tests: tests/repo-hygiene.test.mjs `cook stays the planning front door` suite; V62 description-keyword test pattern reusable ∀ new keyword asserts.

## phase order
id|goal|depends|exit
F1|research keyword set + trigger best practice|-|§R rows landed, keyword table fixed, F2-F4 tightened
F2|fix workonplan description (B5)|F1|V72 test green
F3|add Security/infosec dimension|F1|V73 test green
F4|align ∀ 6 descriptions + dedupe cook|F2,F3|V74,V75 tests green
F5|final verify|F4|full suite green, drift resolved

## F1 research
task: T72
goal: fix canonical focus-keyword set per step; confirm description-trigger mechanics from current web sources.
inputs: https://agentskills.io/specification.md ; https://code.claude.com/docs/en/skills ; ∀ 6 SKILL.md descriptions; §R.1, §R.7.
steps:
1. web: fetch latest Agent Skills spec + Claude Code skills doc → how descriptions matched/injected; description vs body budget. Date-stamp findings.
2. harvest current trigger phrases ∀ 6 skills → gap table vs user's target vocab: security check, infosec, plan gap finding, latest web data, production-quality, verification-driven, evidence-based.
3. fix canonical set (draft, refine ∈ research): 1 cook = "production-quality planning, evidence-based"; 2 caveman-encode = "lossless compression"; 3 review-plan = "plan gap finding, research with latest web data"; 4 workonplan/dispatchplan = "production-quality, verification-driven, evidence-based implementation"; 5 garnish = "evidence-gated closure"; 6 review-code = "security check, infosec sweep, evidence-based audit".
4. `spec` → §R rows (sources + final keyword table). Tighten F2-F4 wording targets.
verify: ∀ §R row ∋ source URL | file:line; keyword table covers ∀ 6 steps.
exit: keyword set frozen; later phases updated if research contradicts draft.
next: F2

## F2 fix workonplan description
task: T73
goal: repair B5 fragment; weave step-4 keywords.
inputs: skills/workonplan/SKILL.md:3-14; F1 keyword set.
files: skills/workonplan/SKILL.md, skills/dispatchplan/SKILL.md (step-4 peer), tests/repo-hygiene.test.mjs.
steps:
1. rewrite description → grammatical sentences; ∋ "production-quality" & "verification-driven" & "evidence-based" (V72). Keep existing triggers verbatim.
2. mirror step-4 keywords → dispatchplan description (keep "sub-agent"/"dispatch"/"parallel" — V62).
3. add V72 test: description ⊥ `one phase. at` fragment & ∋ 3 keywords.
verify: node --test tests/repo-hygiene.test.mjs green; V62 case still green.
exit: B5 closed, V72 automated.
next: F3

## F3 security dimension
task: T74
goal: infosec focus enters loop @ steps 3,4,6.
inputs: F1 keyword set; skills/review-code/SKILL.md:49-65; skills/review-plan/SKILL.md:71-75; skills/workonplan/SKILL.md:92-99.
files: skills/review-code/SKILL.md, skills/review-plan/SKILL.md, skills/workonplan/SKILL.md, tests/repo-hygiene.test.mjs.
steps:
1. review-code: add **Security** dimension bullet — secrets in diff, injection, authn/authz changes, untrusted input paths, dependency/supply-chain deltas. Description ∋ "security check" & "infosec".
2. review-plan blast radius: + secrets/injection/untrusted-input cues.
3. workonplan self-review checklist: + "no secret material, no new untrusted-input path unvalidated" line.
4. add V73 test (review-code Security dimension + description keywords).
verify: node --test green; V73 case asserts new text.
exit: V73 automated.
next: F4

## F4 align descriptions
task: T75
goal: canonical keywords ∈ ∀ 6 owning descriptions; cook description deduped.
inputs: F1 keyword table; ∀ 6 SKILL.md.
files: skills/cook/SKILL.md, skills/caveman-encode/SKILL.md, skills/review-plan/SKILL.md, skills/garnish/SKILL.md, tests/repo-hygiene.test.mjs.
steps:
0. ∀ description: key use case first (R26 — 1536-char listing truncation).
1. cook description: state keyword set once; rm dup + dangling `says "cook this",` line break. Body quality contract stays (V71) w/ cross-point "each cue lives in owning skill".
2. review-plan description: + "plan gap finding" | "find gaps in the plan" & "research with latest web data"; research gate body → current-primary-sources + date-stamp + ⊥ model-memory wording (V74).
3. caveman-encode + garnish descriptions: + canonical keywords (lossless compression / evidence-gated closure) — light touch, vendored voice preserved for caveman-encode.
4. tests: V74 + V75 asserts (keyword ∈ description ∀ 6 steps); relax quote-glyph assert @ tests/repo-hygiene.test.mjs:318 → word match.
verify: node --test green; ∀ description ≤1024 (existing V6 case).
exit: V71,V74,V75 automated.
next: F5

## F5 final verify
task: T76
goal: prove work vs SPEC + PLAN.
steps:
1. re-read §V71-V75, ∀ touched phases.
2. npm test → full suite.
3. classify V71-V75 HOLD|VIOLATE|UNVERIFIABLE + evidence; manual sweep doc §V (V50,V52,V55-V60).
4. sweep diffs: coherence, ⊥ dup logic, ⊥ drive-by; CHANGELOG `## [Unreleased]` entry; flip §T rows.
5. result table → HANDOFF.md.
verify: ∀ V71-V75 HOLD w/ evidence.
exit: cycle ready for /garnish.
next: -

<!-- PLAN FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Short-lived: one cycle. Replaced wholesale, ⊥ amended. Durable facts → SPEC.md.
Order: goal | ground rules | existing assets | phase order table | one section per phase.
Phase ids F1..Fn monotonic. F1 ! research. Fn ! final verify. ⊥ coding outside that span.
∀ phase names: goal | inputs | files | §T tasks (≥1) | verify | exit | next
§T tasks defined & tracked in each phase. Status: x done | ~ wip | . todo.
Tracked: planning status ∈ {new, work-in-progress, done} — keyed to EXECUTION, ⊥ authorship. prep writes/expands as `new`; cook/cater ALONE flip new→work-in-progress at start & run on new(has phases)|wip; handoff→done on ∀ §T x + verify HOLD; garnish resets new. `new`+⊥phases (empty stub) → /prep; `done` → /garnish. prep expands ⟺ status ≠ work-in-progress.
Encoding: same symbol set as SPEC.md. Preserve code, paths, ids verbatim.
Executable cold: a phase ⊥ readable without chat history is ⊥ finished.
Full rules: /encode-docs skill.
planning status: done
-->

# PLAN

goal: `release.sh` ! sync Claude plugin manifest version with each package release.

## ground rules

- Research first; confirm local release flow + current official Claude version resolution before edits.
- Smallest coherent diff; ⊥ duplicate `version` in `.claude-plugin/marketplace.json` because `.claude-plugin/plugin.json` wins silently (§R9).
- Preserve release safety: `npm test` gate, ⊥ skip flag, changelog/tag checks, explicit staging, push behavior (§C7, §I9, §V14).
- Release behavior = manual-review scope (§C8): ⊥ add prose/script assertions to `tests/`; use shell syntax, JSON/version, dry-run, diff, + full-suite evidence.
- Every phase ! name evidence; status flips only after contract holds; implementation updates `CHANGELOG.md` `## [Unreleased]`; ⊥ push/tag.
- Final verification classifies relevant §I/§V/§T as `HOLD`|`VIOLATE`|`UNVERIFIABLE` in `HANDOFF.md`.

## existing assets

- `release.sh` computes `NEW_VERSION`, runs `npm test`, calls `npm version`, rewrites `CHANGELOG.md`, validates package/changelog, stages package files + changelog, commits, tags, pushes.
- `.claude-plugin/plugin.json` carries explicit `version: "0.6.0"`; `.claude-plugin/marketplace.json` carries ⊥ plugin version.
- `package.json` version = `0.6.0`; `package-lock.json` version updated by `npm version`.
- §R9: explicit plugin version = Claude cache/update key; plugin manifest precedes marketplace entry & ! bump each release.
- `tests/` covers Agent Skills contract + real CLI discovery only (§C8); `release.sh` checks remain manual.

## phase order

id|goal|depends|exit
|---|---|---|---|
F1|confirm version authority + release integration|-|facts + exact edit/oracle contract confirmed
F2|sync plugin manifest in release transaction|F1|target oracles green + changelog updated
F3|final verify code vs spec + plan|F2|full suite green; all relevant rows classified; drift resolved

## F1 research

goal: Confirm authoritative version field, local mutation/staging flow, + failure gates before code edits.
inputs: backlog request; `release.sh`; `.claude-plugin/*.json`; `package*.json`; §I5; §I9; §R9; §V14; official Claude plugin docs checked 2026-07-28.
files: `release.sh`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `package.json`, `package-lock.json`, `SPEC.md`, `PLAN.md`

§T TASKS:

T1|x|confirm version authority + target
touch: `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `package.json`, `SPEC.md`
details: Verify `.claude-plugin/plugin.json` owns explicit plugin version, package + plugin begin equal, marketplace entry stays unversioned; check §I5, §R9, §V14.
verify: `node -e "const p=require('./package.json');const m=require('./.claude-plugin/plugin.json');if(p.version!==m.version)process.exit(1)"`; official version-resolution docs dated 2026-07-28 cited in §R9.
exit: One authoritative plugin version target + standing equality contract confirmed.
next: F1.T2

T2|x|map release mutation, validation, + staging seams
touch: `release.sh`, `package-lock.json`, `CHANGELOG.md`, `PLAN.md`
details: Locate preflight files, `NEW_VERSION`, post-test mutation order, mirror gates, `git add`, dry-run output; preserve §C7 + §I9; sharpen F2 without changing code.
verify: Each F2 edit names exact insertion seam + failure oracle; ⊥ unresolved `?`; review-plan gate = GO.
exit: Cold executor can edit + verify without guessing.
next: F2.T1

## F2 implementation

goal: Make plugin manifest version part of same release mutation, validation, + commit as package version.
inputs: F1 evidence; §C7; §C8; §I5; §I9; §R9; §V14.
files: `release.sh`, `.claude-plugin/plugin.json`, `CHANGELOG.md`

§T TASKS:

T1|x|add manifest preflight + version mutation
touch: `release.sh`, `.claude-plugin/plugin.json`
details: Require plugin manifest at repo-root preflight; after `npm version`, parse existing JSON + set only `version` to `NEW_VERSION` with Node, preserving valid 2-space JSON + trailing newline; emit clear release step; ⊥ add marketplace-entry version. Check §I5, §I9, §V14.
verify: `bash -n release.sh`; `node -e "JSON.parse(require('node:fs').readFileSync('.claude-plugin/plugin.json','utf8'))"`; full diff confirms mutation runs only after green `npm test` + outside dry-run.
exit: Real release path writes plugin manifest to computed version or fails before commit/tag.
next: F2.T2

T2|x|gate + stage synchronized version
touch: `release.sh`, `CHANGELOG.md`
details: Add mirror check requiring `.claude-plugin/plugin.json` version == `NEW_VERSION`; stage manifest in release commit; update dry-run plan text if needed to expose plugin sync; add plain-English `## [Unreleased]` fix entry. Preserve tag/push order + §C7.
verify: `bash -n release.sh`; `bash ./release.sh --help`; `bash ./release.sh --dry-run --patch`; static path audit confirms manifest preflight, mutation, equality gate, + `git add`; `git diff --check`.
exit: A stale/missing/invalid plugin manifest cannot reach release commit/tag; release commit includes manifest.
next: F3.T1

## F3 final verification

goal: Prove synchronized release contract, regression safety, + repo coherence before closure.
inputs: full F1-F2 diff; relevant SPEC rows; all PLAN §T; repo end checklist.
files: `release.sh`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `package.json`, `package-lock.json`, `CHANGELOG.md`, `SPEC.md`, `PLAN.md`, `HANDOFF.md`

§T TASKS:

T1|x|audit spec + release-path coherence
touch: all F2 files, `SPEC.md`, `PLAN.md`
details: Re-read §I5, §I9, §V14 + every task; inspect full diff for ordering, failure propagation, JSON safety, duplicate versions, missed staging, unnecessary complexity, reuse, secrets, + unrelated edits.
verify: Classify §I5, §I9, §V14, + F1-F3 §T as `HOLD`|`VIOLATE`|`UNVERIFIABLE` with file/command evidence; any drift gets code or SPEC decision before closure.
exit: ⊥ open violation/drift; review findings resolved.
next: F3.T2

T2|x|run final oracles + record baton
touch: repo verification surfaces, `HANDOFF.md`
details: Run release syntax/help/dry-run oracles, JSON/version oracle, `npm test`, + `git diff --check`; confirm `CHANGELOG.md` Unreleased entry; record exact results + final classification via handoff/encode-docs; ⊥ push/tag.
verify: `bash -n release.sh`; `bash ./release.sh --help`; `bash ./release.sh --dry-run --patch`; `node -e "const p=require('./package.json');const m=require('./.claude-plugin/plugin.json');if(p.version!==m.version)process.exit(1)"`; `npm test`; `git diff --check`.
exit: All commands exit 0, relevant items HOLD, clean review, HANDOFF final table complete.
next: complete → `/garnish`

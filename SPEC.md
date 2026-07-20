<!-- SPEC FORMAT (baked by /spec — keep; makes this file self-describing)
Sections, fixed order: §G goal | §C constraints | §I interfaces | §R research? | §V invariants | §T tasks | §B bugs
Address §<S>.<n> — §V.2 = invariants item 2. Commits/PRs cite by §.
Encoding: drop articles/filler/aux verbs. Fragments fine. Short synonyms (fix > implement).
Preserve verbatim: code, paths, identifiers, URLs, numbers, error strings, SQL, regex.
Symbols: → leads to | ∴ therefore | ∀ every | ∃ some | ! must | ? may/unknown | ⊥ never | ≠ | ∈ | ∉ | ≤ | ≥ | & and | § section
Tables (§R,§T,§B): pipe-delimited. ids monotonic, never reused. Escape literal \| . Empty cell = -
§T status: x done | ~ wip | . todo
One file rule: >500 lines → compact §B oldest-first, ⊥ split into more files.
Full rules: /spec skill (§FORMAT). Cutting a word that loses a fact ⊥ allowed.
-->

# SPEC

## §G GOAL

Public repo `jasonyang-ee/skills` → personal central skill collection, installable via `npx skills add jasonyang-ee/skills`. Own skills (`handoff`, `cook`, `review-code`, `garnish`, `setup`, `cater`) + derived `prep` + vendored cavekit/caveman suite. Core purpose = 6-step spec-driven workflow, narrative → `README.md` `## The six core workflow steps` (⊥ separate doc file; order contract → V47): 1) `prep` turns idea/bug/feature/expected behavior → `PLAN.md` + `HANDOFF.md` + durable `SPEC.md`; 2) `encode-docs` governs every `PLAN.md`/`HANDOFF.md` write; 3) cold-session `review-plan` researches/refutes until plan ready; 4) cold-session `cook`|`cater` executes phases with handoff closure; 5) `garnish` routes durable cleanup through `spec` then purges short-term files; 6) `review-code` closes cycle and may trigger next `prep`. Steps 3 and 6 iterate internally; order ! skipped.

## §C CONSTRAINTS

- Layout `skills/<name>/SKILL.md`. Agent Skills spec + skills CLI flat discovery (§R.1, §R.4).
- ∀ SKILL.md ! Agent Skills spec compliant. Spec ⊃ skills CLI reqs ∴ spec binds (§R.1, §R.2).
- Skills = markdown only. ⊥ runtime deps for installing user. ⊥ Python. ⊥ `scripts/` (∵ user ruling 2026-07-15).
- `prep` ! write encoded `PLAN.md` + `HANDOFF.md` pair. `PLAN.md` ! research-first & verify-last. Durable truth ! land in `SPEC.md` via `spec`.
- `PLAN.md` + `HANDOFF.md` ! encoded ∀ writes (load `encode-docs` ∵ session-efficiency).
- core workflow order = `prep` → `encode-docs` → `review-plan` → `cook`|`cater` → `garnish` → `review-code` → (`prep` next cycle). `/setup` bootstraps repo guidance; ⊥ core step. `cook`|`cater` ⊥ without prior `prep` output (`PLAN.md` ∃); `garnish` ⊥ without completed `cook`|`cater`; `review-code` ! end by invoking `prep` or declaring ⊥ further work.
- `cook` ! refresh & commit `HANDOFF.md` ∀ phase end (∵ session-cut safety; cold resume ! start from baton).
- ⊥ vendor skills needing hooks | subagents (∵ `npx skills add` installs ⊥ either → silent no-op. §R.11, §R.12).
- License MIT. `LICENSE` @ root. Vendored MIT work → `NOTICE.md` ! reproduce upstream copyright + permission notice (∵ MIT §; README credit alone ⊥ sufficient).
- Publish = GitHub Release only. npm publish ⊥ (∵ §R.3).
- Tests: `node:test` (Node built-in runner). devDeps: `js-yaml`, `skills`. ⊥ `skills-ref` npm (∵ §R.8).
- Node ≥ 20 LTS.
- ⊥ private-codebase refs in published skills (∵ repo public).
- CI ! least-priv top-level `permissions:`. ⊥ secrets beyond `GITHUB_TOKEN`.
- dependabot version updates ⊥ open PRs → `open-pull-requests-limit: 0` ∀ ecosystem (∵ user ruling 2026-07-15, PR noise). Repo setting `dependabot_security_updates` ! stay enabled & alerts ! stay on (∵ `package-lock.json` public ∴ vuln scannable regardless; security PR closes exposure window ⊥ opens it. Alerts private on public repo ∴ ⊥ disclosure). ⊥ CI-testable (repo API) ∴ manual.
- ⊥ push | tag without explicit user ask (house policy, `CLAUDE.md`).
- ⊥ `FORMAT.md`. Format → embedded in `spec` skill + baked header @ top of SPEC.md (§R.13).
- `SPEC.md` + `AGENTS.md` encoded. `README.md`/`.github/CONTRIBUTING.md`/`NOTICE.md` normal English (∵ human-facing).
- `CONTRIBUTING.md` @ `.github/` ⊥ root (mv @ `ccec8bc`).
- Line endings mixed & ! preserved per file: `skills/encode-commit/`, `skills/encode-pr/` = CRLF (vendored caveman-repo); ∀ other tracked file = LF. `core.autocrlf=false`, ⊥ `.gitattributes` ∴ ⊥ normalization on write — whatever a tool writes lands in the commit (∵ §B.6).
- Test scope = `skills/**` content + license/release guards (V10,V11,V12,V15,V16,V17) only. ⊥ assert doc prose (`README.md`, `.github/CONTRIBUTING.md`, `AGENTS.md`, `CLAUDE.md`) (∵ user ruling 2026-07-16: "test for things in skills folder only"; prose asserts → brittle, red @ file mv, ⊥ caught real defect). ∴ doc §V → manual oracle, ⊥ retired: requirement stands, automation ⊥.

## §I INTERFACES

- cmd: `npx skills add jasonyang-ee/skills` → installs ∀ 12 skills → detected agents
- cmd: `npx skills add jasonyang-ee/skills --list` → lists ∀ 12
- cmd: `npx skills add jasonyang-ee/skills -s prep -s cook -s spec -a claude-code -g -y` → 3 skills, 1 agent, global, non-interactive
- file: `skills/<name>/SKILL.md` → frontmatter `{name == <name>, description, license: MIT}`
- roster: own → `handoff`, `cook`, `review-code`, `garnish`, `setup`, `cater`. derived → `prep`. cavekit → `spec`, `review-plan`, `encode-docs`. caveman → `encode-commit`, `encode-pr`
- command graph: `/setup` (bootstrap) → `/prep` → [`/review-plan`]* → `/cook`|`/cater` (phases + `handoff` per phase) → `/garnish` → [`/review-code` → `/prep`]*
- cmd: `/cater` → parallel multi-phase execution via sub-agents; creates `HANDOFF-<phase-id>.md` per assignment; selects sub-agent by phase complexity (capability terms, ⊥ harness-specific names); sub-agent → `## completion` block → main agent phase-scoped acceptance review → purge assignment file; main `HANDOFF.md` refresh ∀ dispatch/completion/acceptance/stop; `/review-code` ⊥ mid-dispatch (stays step 6)
- cmd: `/setup` → safely bootstrap `AGENTS.md`, exact `CLAUDE.md` import when absent, minimal `CHANGELOG.md`, and `SPEC.md` via `spec`; bootstrap support, ⊥ core workflow step
- workflow: `README.md` `## The six core workflow steps` → canonical six-step narrative (⊥ separate doc file); `prep` → `encode-docs` → `review-plan` → `cook`|`cater` → `garnish` → `review-code` → next `prep`
- cmd: `/review-plan` → research gate (resolve required `?` items) + plan refutation → update `PLAN.md`/`HANDOFF.md` → GO/NO-GO; iterative until no research phase needed; `/review-code` → post-baseline code sweep → next `prep`; `/garnish` → close completed PLAN cycle & purge `PLAN.md`/`HANDOFF.md`
- phase close: `cook`|`cater` → `handoff` refresh + commit after every phase; session end → final refresh
- garnish close: `garnish` → `spec` durable cleanup handoff → purge short-term files → `/review-code`
- file: `SPEC.md` @ consumer repo root → baked format header (HTML comment) first bytes, written by `spec` skill
- file: `PLAN.md` @ consumer repo root → encoded phase plan, drafted by `prep`, executed by `cook`|`cater`
- file: `HANDOFF.md` @ consumer repo root → encoded baton, drafted by `prep`, refreshed by `handoff`
- file: `PLAN.md` phase → `task:` names exactly one `§T` id; `cook`|`cater` uses id for phase status/verification
- file: final verification phase → per-`§V`/`§I`/`§T` result table, drift decision, agreed commands
- file: `HANDOFF.md` `## final verification` → `item|status|evidence|decision` table; status `HOLD` | `VIOLATE` | `UNVERIFIABLE`
- file: phase verification contract → exact test file/case per touched `§V`; oracle command
- file: task failure record → code bug | spec bug | unspecified edge; latter 2 → `spec bug:` before retry
- cmd: `npm test` → `node --test` → exit 0 ⟺ automated §V tests pass; release/manual checks (e.g. V13) separate. Scope → §C test scope: `skills/**` + V10,V11,V12,V15,V16,V17. Doc §V (V50,V52,V55-V60) → manual review oracle ∴ exit 0 ⊥ proves them
- cmd: `./release.sh [--major|--minor|--patch] [-y] [-n]` → release entrypoint. Preflight (branch, clean tree, tag ⊥ ∃, `[Unreleased]` ⊥ empty) → `npm test` gate → bump → changelog move → commit → tag `v<x.y.z>` → push. ⊥ publish (tag push → `release.yml` → GitHub Release ∵ dup else). Test gate ! stay & ! surface output on red; ⊥ skip flag (∵ red tag ≫ painful to revert)
- ci: push | PR → `.github/workflows/ci.yml` → matrix Node 20, 22, 24
- ci: tag `v*.*.*` → `.github/workflows/release.yml` → GitHub Release, body ← `CHANGELOG.md` section

## §R RESEARCH

id|claim|source
R1|`name` ! 1-64 chars, `[a-z0-9-]` only, ⊥ lead/trail `-`, ⊥ `--`, ! == parent dir name. `description` ! 1-1024 chars, non-empty. `license`/`compatibility`/`metadata`/`allowed-tools` optional|https://agentskills.io/specification.md
R2|`parseSkillMd` → `null` unless `name` & `description` ∃ & `typeof === "string"` ∴ skill invisible to CLI|`skills@1.5.17` `dist/cli.mjs:809-826`
R3|`skills add owner/repo` → git clone GitHub direct. npm registry ∉ install path ∴ npm publish ⊥ needed|`skills@1.5.17` `README.md` §Source Formats
R4|discovery PRIORITY_PREFIXES: root, `skills/`, `skills/.curated/`, `skills/.experimental/`, `skills/.system/`, `.claude/skills/`, +60 agent dirs. `skills/` walked 1 deep, `skills/<cat>/<name>/` 2 deep|`skills@1.5.17` `dist/cli.mjs` PRIORITY_PREFIXES + `discoverSkills()`
R5|`sanitizeMetadata`: `[\r\n]+` → `" "` ∴ YAML block scalar `description: \|` safe, collapses to 1 line|`skills@1.5.17` `dist/cli.mjs:245-247`
R6|SKIP_DIRS ∋ `node_modules`, `.git`, `dist` ∴ ⊥ scanned|`skills@1.5.17` `dist/cli.mjs:759`
R7|Claude Code: ∀ frontmatter optional, `name` ← dir name default. `description`+`when_to_use` truncated @ 1536 chars in listing. Spec 1024 stricter ∴ 1024 binds|https://code.claude.com/docs/en/skills
R8|npm `skills-ref@0.1.5` author `YanchaoMa` ∉ agentskills org ∴ ⊥ trust as official validator. Hand-roll vs §R.1 instead|https://registry.npmjs.org/skills-ref
R9|SKILL.md body ≤ 500 lines & ≤ 5000 tokens recommended|https://agentskills.io/specification.md
R10|`metadata.internal: true` → hidden from discovery unless `INSTALL_INTERNAL_SKILLS=1`|`skills@1.5.17` `dist/cli.mjs:815`
R11|`caveman-stats` delivered by `hooks/caveman-stats.js` — "model does not need to do anything". ⊥ hook → skill = silent no-op. `skills add` installs ⊥ hooks ∴ ⊥ vendorable|`JuliusBrussee/caveman` `skills/caveman-stats/SKILL.md`
R12|`cavecrew` dispatches subagents `cavecrew-{builder,investigator,reviewer}` ∈ `agents/`. `skills add` installs skills ⊥ agents ∴ ⊥ vendorable|`JuliusBrussee/caveman` `skills/cavecrew/SKILL.md` + `agents/`
R13|2 upstream skills named `caveman` & contradict: cavekit = spec encoding "prefer → ∴ ∀"; caveman repo = conversational "No causal arrows (→) — own token, save nothing". Same `name:` ∴ 1 shadows other on install|`cavekit/skills/caveman/SKILL.md` vs `caveman/skills/caveman/SKILL.md`
R14|`caveman-compress` ! `python3 -m scripts <path>`, `scripts/*.py` adjacent to SKILL.md|`JuliusBrussee/caveman` `skills/caveman-compress/SKILL.md:22-26`
R15|MIT ! "above copyright notice and this permission notice shall be included in all copies or substantial portions" ∴ README credit alone ⊥ compliant|`cavekit/LICENSE`, `caveman/LICENSE` — both `Copyright (c) 2026 Julius Brussee`
R16|current shipped roster = 12 dirs under `skills/`; adding `dispatchplan` → 13|`Get-ChildItem skills -Directory` @ review-plan 2026-07-16
R17|`workonplan` requires root `HANDOFF.md` → `PLAN.md` → `SPEC.md`, baseline test, exact phase verification contract, phase commit, then `handoff`; `/spec` alone cannot satisfy execution precondition|`skills/workonplan/SKILL.md:24-62` @ review-plan 2026-07-16
R18|existing repo hygiene tests use named `node:test` cases + `assert.match`; CLI discovery already derives roster through `loadSkills()`|`tests/repo-hygiene.test.mjs:43-267`, `tests/helpers.mjs` @ review-plan 2026-07-16
R19|`garnish` preconditions ! ∀ mapped `§T` == `x` & ⊥ unrelated dirty files; procedure removes exactly root `PLAN.md`+`HANDOFF.md` ∴ per-sub-agent garnish mid-plan → stops @ precondition (completion ⊥ flagged) \| destroys main baton. ⊥ scoped-file concept|`skills/garnish/SKILL.md:22-31,48-49,69` @ review-plan 2026-07-16
R20|`review-code` baseline = latest reachable tag; ! "confirm the plan is complete"; cook handoff mandatory ("Do not skip the `cook` handoff") ∴ per-sub-agent call → re-sweeps full baseline→HEAD ∀ run & `cook` rewrites executing `PLAN.md`|`skills/review-code/SKILL.md:21,29,42-43,105-107,118` (path @ T60 rename; sourced pre-rename as `review-implementation`) @ review-plan 2026-07-16
R21|`AGENTS.md` ⊥ ∋ sub-agent roster; `sonnet-implementer`/`Explore` = harness-supplied ⊥ repo files; `skills add` installs ⊥ agents (§R.12) ∴ named-agent refs in skill body → silent no-op ∀ other harness|`AGENTS.md` full read + §R.12 @ review-plan 2026-07-16
R22|`tests/attribution.test.mjs:12-20` asserts `NOTICE.md` rows ∀ VENDORED only; `NOTICE.md:92-96` "Original work" own-skill roster ⊥ test-anchored ∴ omission silent|`tests/attribution.test.mjs`, `NOTICE.md` @ review-plan 2026-07-16
R23|`workonplan` self-review contract = read FULL `git diff`, check plan match, larger-picture coherence, ⊥ debug leftovers/dead code/drive-by, comments state constraints ∴ reusable as dispatcher acceptance review, phase-scoped, ⊥ cook handoff|`skills/workonplan/SKILL.md:84-92` @ review-plan 2026-07-16
R24|`workonplan` default has no phase arg → run every remaining PLAN.md phase sequentially; explicit phase arg remains targeted override|user request 2026-07-16 + `skills/workonplan/SKILL.md`, `README.md`, `skills/prep/SKILL.md`
R25|Agent Skills spec: description 1-1024 chars, ! state what + when-to-use, ! ∋ specific keywords for task matching; name+description = sole startup-loaded metadata (~100 tokens), body loads on activation, ≤500 lines|https://agentskills.io/specification.md @ 2026-07-17
R26|Claude Code: ∀ skill descriptions always in context & drive auto-invocation; description+when_to_use listing truncated @ 1536 chars ∴ key use case first; weak-trigger fix = strengthen description; tuning oracle = should-trigger vs should-not-trigger hit rate|https://code.claude.com/docs/en/skills @ 2026-07-17
R27|canonical focus keywords frozen ∀ 6 steps: 1 cook="production-quality planning, evidence-based"; 2 caveman-encode="lossless compression"; 3 review-plan="plan gap finding, research with latest web data"; 4 workonplan+dispatchplan="production-quality, verification-driven, evidence-based implementation"; 5 garnish="evidence-gated closure"; 6 review-code="security check, infosec sweep, evidence-based audit"|gap grep 2026-07-17 (zero security vocab ∀ 6 core skills) + R25/R26 + user target vocab 2026-07-16
R28|`workonplan` EXECUTE step 6: "ONE summary commit. Follow repo commit conventions." ∴ ⊥ phase id, ⊥ body, ⊥ evidence; `handoff` rule 8: standalone commit = bare `docs: handoff` ∴ ⊥ phase closed, ⊥ next phase, ⊥ test state; `caveman-commit` Conventional Commits format w/ type+scope+subject+body already codified ∴ workonplan+handoff ! reference it explicitly; ⊥ other commit-guidance text in either file|`skills/workonplan/SKILL.md:105-112`, `skills/handoff/SKILL.md` rule 8, `skills/caveman-commit/SKILL.md` full read @ 2026-07-19
R29|`caveman-encode` BOUNDARIES already rules "Commit message → normal English (git readers expect it)" ∴ symbol/plan-id commits contradict encode skill itself; `caveman-commit` prose ⊥ ∋ symbol ban, ⊥ ∋ id-expansion rule @ present ∴ gap real; `NOTICE.md:56` row `skills/caveman-commit/` Modified == `No` ∴ edit forks pristine vendor → row ! flip `Yes` (AGENTS.md vendor rule "Diff = only what NOTICE.md records"); `tests/attribution.test.mjs:12-20` asserts row EXISTS ⊥ Modified column ∴ new assert needed; `skills/**` ∈ §C test scope ∴ prose asserts allowed here (≠ doc prose) ∴ V77-V80 automatable, ⊥ MANUAL|`skills/caveman-encode/SKILL.md` BOUNDARIES, `skills/caveman-commit/SKILL.md` full read, `NOTICE.md:56`, `tests/attribution.test.mjs:12-20`, `AGENTS.md` Encoding @ 2026-07-19

R30|rename chain safe order = `prep`→`setup`, then `cook`→`prep`, then `workonplan`→`cook` (∀ target name vacated before filled ∴ ⊥ double-shift); ! word-boundary match ∵ `prepare`/`prepares` ×10 ∈ repo & `-` = word boundary in grep ∴ bare `caveman` also matches `caveman-encode` substring; `cater`+`encode-*` tokens vacant; `setup` already ∃ @ `.github/workflows/*.yml` (`actions/setup-node`) + `.github/CONTRIBUTING.md` heading ∴ ⊥ assert "zero setup tokens"; `tests/helpers.mjs` `loadSkills()` derives roster from disk ∴ most asserts auto-adapt; hardcoded lists = `tests/attribution.test.mjs:12-20` VENDORED + `tests/repo-hygiene.test.mjs:41` LIVE_REF_FILES; 25 §V rows name renamed skill paths; roster claim `13` @ `README.md:16`, `AGENTS.md:6`, §I ×2|`git grep -o -w` counts + `tests/helpers.mjs` + `tests/attribution.test.mjs:12-20` + `tests/repo-hygiene.test.mjs:41,186-195` @ 2026-07-19
R31|rename reuses names across DIFFERENT skills ∴ ∀ ref ! re-point by MEANING ⊥ by string: `review-code` "Invokes cook" == planning ∴ → `prep`; `review-plan` "hand to `workonplan`" == execution ∴ → `cook`; `garnish` "completed workonplan" → `cook`; bootstrap `prep` refs → `setup`. 3-pass sweep in §R30 order yields correct text, but ∀ touched file ! re-read post-sweep to confirm meaning preserved. `NOTICE.md` highest risk ∵ license-relevant: vendored row `skills/cook/` (cavekit-derived planning) → `skills/prep/`, while Original-work roster gains `cook` (was `workonplan`) ∴ blind sed swaps provenance between vendored & original|`skills/review-code/SKILL.md:7-8,109-111`, `skills/review-plan/SKILL.md:18-22,116`, `NOTICE.md:17,92-96` @ 2026-07-19
R32|`skills/caveman/SKILL.md` §Rules + §Persistence = bake source. §Rules bans invented abbreviations (`cfg`/`impl`/`req`) & causal arrows ∵ tokenizer splits them same as full word ∴ zero saving, decode cost real. §Persistence = always-on, ⊥ drift, off only on "stop caveman"/"normal mode". §Auto-Clarity drops compression ∀ security warnings, irreversible-action confirms, multi-step order-sensitive sequences ∴ carve-out ! survive the bake, else terse style compresses exactly the `review-code` Security findings (V73) & `review-plan` blast-radius items that ! stay explicit|`skills/caveman/SKILL.md:20-35,52-61` + V73 @ 2026-07-19
R33|merge OVERLAP (dedupe → keep once): spec §ENCODING(:153-198) ≈ encode-docs §GRAMMAR+§SYMBOLS+§PRESERVE VERBATIM+§EXAMPLES — symbol tables differ only in gloss wording (`triggers`\|`on <x>`; `impossible`\|`nil`) ∴ 1 canonical table; spec §SECTIONS row formats ≈ encode-docs §SHAPES. UNIQUE-to-encode-docs (⊥ lose): scope line, hedging\|pleasantry bans, 8-item verbatim list, Interface shape, §BOUNDARIES 4 exits, "compression ⊥ amputation". UNIQUE-to-spec (⊥ lose): sole-mutator, §DISPATCH 5 modes, §INPUTS sectioned-ownership, NEW\|DISTILL\|BUG\|AMEND procedures, §SECTIONS skeleton, table-cell rules, §ADDRESSING, ONE FILE RULE, §WRITES, §BAKED HEADER emit-verbatim, monotonic-numbering, §NON-GOALS, legacy FORMAT.md handling|full read both SKILL.md @ 2026-07-19
R34|line budget merged `encode-docs`: shared core ~75 (128 − 3 attribution − 29 §SHAPES→SPEC − 19 dupe §EXAMPLES) + SPEC SECTIONS ~162 + PLAN SECTIONS ~55 + HANDOFF SECTIONS ~45 + frontmatter ~14 = ~351 ∴ < 500 (V14) w/ ~150 headroom. Dedupe REQUIRED: raw concat = 378 body + 3 new header blocks → overflow risk. PLAN template src = `skills/prep/SKILL.md` 42 lines; HANDOFF template src = `skills/handoff/SKILL.md` 28 lines|`wc -l` + section arithmetic @ 2026-07-19
R35|oracle-loss map ∀ F7 cut — §V whose ONLY oracle = a single-skill prose case: V9,V19,V20,V21,V36,V42,V53,V54,V61,V62,V63,V64,V65,V66,V67,V68,V72,V73,V74,V75,V77,V78,V79,V80,V81,V82,V84,V85. License/release guards V10,V11,V12,V22 = separate, ! survive the cut (§C test scope). ∴ F7 ! decide per §V: keep aggregate case \| mark MANUAL \| hard-delete per V90 — 28 rows @ risk, ⊥ 1|`grep -n "// V"` `tests/repo-hygiene.test.mjs` @ 2026-07-19
R36|`npx skills add <repo>` installs `SKILL.md` ONLY + `skills-lock.json` (source path, sourceType, computedHash). ⊥ `NOTICE.md`, ⊥ `LICENSE`, ⊥ any copyright\|permission notice. Verified empirically ×2: single-skill install & full 12-skill install into temp dirs — payload = 12× `.claude/skills/<name>/SKILL.md` + lockfile, nothing else. ∴ `NOTICE.md` ⊥ travels to installing user ∴ V94 GATE ⊥ CLEARED: stripping in-file attribution leaves ∀ vendored copy w/ ⊥ notice (MIT §R.15 requires notice in "all copies or substantial portions"). Exposure PRE-EXISTS: `encode-commit`,`encode-pr`,`spec`,`review-plan`,`prep` already ship bare; `encode-docs` = the ONLY vendored skill still carrying it|`npx skills add` → temp dir → `find . -type f` @ 2026-07-19

## §V INVARIANTS

V1: ∀ `skills/*/SKILL.md` → frontmatter ! parse as valid YAML
V2: ∀ skill → `name` ! string & non-empty
V3: ∀ skill → `description` ! string & non-empty
V4: ∀ skill → `name` == parent dir name
V5: ∀ skill → `name` ∈ `/^[a-z0-9]+(-[a-z0-9]+)*$/` & len ≤ 64
V6: ∀ skill → `description` len ≤ 1024
V7: ∀ skill `name` → unique across repo
V8: `skills add . --list` → ⊇ ∀ dirs ∈ `skills/` (real CLI oracle, ⊥ mock)
V9: ∀ `skills/**/SKILL.md` → ⊥ match private-ref denylist (`trading`, `StrategyBacktestConfig`, `test.sh`, `V52`, `money math`)
V10: `LICENSE` ! ∃ @ root & ∋ `MIT`
V11: `CHANGELOG.md` ! ∃ `## [Unreleased]`
V12: ∀ `.github/workflows/*.yml` → ! top-level `permissions:` block
V13: release tag `v<x.y.z>` → `CHANGELOG.md` ! ∃ `## [<x.y.z>]` section & `package.json` version == `<x.y.z>`, else release ⊥. Enforced by `release.yml` ⊥ `npm test` (∵ needs tag ctx). Verified manually both directions 2026-07-15.
V14: ∀ skill → SKILL.md body ≤ 500 lines (∵ §R.9)
V15: `NOTICE.md` ! ∃ @ root (∵ §R.15)
V16: `NOTICE.md` ! ∋ `Copyright (c) 2026 Julius Brussee` & full permission notice
V17: ∀ vendored skill → `NOTICE.md` ! ∋ row `skills/<name>/` (new vendor ⊥ row = license violation)
V18: RETIRED @ T82 (2026-07-19) — conversational `caveman` deleted & `caveman-encode` → `encode-docs` ∴ name collision (§R.13) gone permanently; ⊥ cross-point to maintain. id ⊥ reused
V19: ∀ skill → ⊥ `scripts/` dir (∵ §C markdown-only, user ruling)
V20: `skills/spec/SKILL.md` ! ∋ `## FORMAT` & `## BAKED HEADER` & header template
V21: ∀ skill → ⊥ require `FORMAT.md`; root ⊥ ∃ `FORMAT.md`
V22: `.github/dependabot.yml` → ∀ `updates[]` entry ! `open-pull-requests-limit: 0` (∵ §C; re-enable = unwanted public PR)
V23: retired skill dirs `skills/{backprop,build,check,deepen,grill,research}/` ⊥ ∃
V24: `skills/prep/SKILL.md` ! mention `PLAN.md`, `HANDOFF.md`, `spec`, `cook`
V25: `skills/prep/SKILL.md` ! require research 1st phase & final verification last phase
V26: `skills/cook/SKILL.md` ! route spec-memory failures via `/spec bug:` & ⊥ mention `backprop`
V27: `prep` PLAN phase ∀ → `task:` exactly one existing `§T` id; F1 research first, Fn final verify last
V28: F1 research → unknowns resolved or marked `?`; sourced findings land in `§R`; later phases updated before handoff
V29: Fn final verify → re-read relevant `§V`/`§I`/`§T`, run agreed commands, classify each as `HOLD`/`VIOLATE`/`UNVERIFIABLE`, record drift decision
V30: `cook` phase execution → uses PLAN `task:` id for `§T` status; no phase starts without matching SPEC task
V31: phase start → verification contract names exact test file/case per touched `§V` before edit
V32: phase close → oracle command & named tests green; session end → full suite green
V33: verification failure → classify code bug | spec bug | unspecified edge; spec bug/edge → `spec bug:` before retry
V34: `cook` execution → honors `§R`; no re-derive/contradict sourced facts
V35: `HANDOFF.md` → records exact test status, uncommitted paths/reasons, stop point, next executable step
V36: `skills/review-plan/SKILL.md` reads `PLAN.md` & `SPEC.md`; research gate resolves open `?` items & records findings in `§R` before refuting plan structure; updates `PLAN.md`/`HANDOFF.md`; ends explicit GO/NO-GO; old `skills/review/` ⊥ ∃
V37: `review-code` → baseline = latest reachable release tag, else explicit release commit; sweep covers complexity, reuse, correctness, coherence; findings cite evidence & end by invoking `prep`
V38: `garnish` → purge `PLAN.md`/`HANDOFF.md` only after ∀ §T `x`, final verification `HOLD`, no unrelated uncommitted files; preserve `SPEC.md`
V39: new skills → Agent Skills contract, README/NOTICE/tests roster aligned
V40: `cook` phase close → `HANDOFF.md` refreshed & committed before next phase or report; baton names exact next step
V41: `garnish` → `spec` receives durable cleanup handoff before deletion; only then purge `PLAN.md`/`HANDOFF.md`; next `/review-code`
V42: `/setup` → generated/completed `AGENTS.md` lists exactly seven bootstrap commands in order: `/setup`, `/prep`, `/review-plan`, `/cook`, `/cater`, `/garnish`, `/review-code`; `/cater` = peer entry ⊥ nested `alt` line (∵ user ruling 2026-07-16 — nested alt read as afterthought ∴ skill undiscovered); `/cook` \| `/cater` exclusive per phase, ⊥ both; list ≠ core six workflow steps (V47 — `cook`\|`cater` = 1 step there)
V43: `setup` → existing `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`, `SPEC.md` preserved; only missing files/sections may be added without explicit overwrite direction
V44: missing `CLAUDE.md` → created with exact content `@AGENTS.md`; existing non-import content → preserved and reported
V45: missing `CHANGELOG.md` → minimal `# Changelog` + `## [Unreleased]`; missing `SPEC.md` → `spec` NEW mode, never direct `setup` write
V46: generated/completed `AGENTS.md` → sections `Commands`, `Encoding symbols`, `End of Chat Checklist`; support skills documented outside six bootstrap commands; unknown project facts marked `?`
V47: core workflow ! preserve exact order: 1 `prep` → 2 `encode-docs` → 3 `review-plan` → 4 `cook`|`cater` → 5 `garnish` → 6 `review-code`; `cook`|`cater` ! have `PLAN.md` ∃ (prior `prep`); `garnish` ! have ∀ §T `x` & final verification `HOLD`; `review-code` ! end by invoking `prep` or declaring ⊥ further work; ∀ `PLAN.md`/`HANDOFF.md` write ! load `encode-docs`
V48: `skills/setup/SKILL.md` description ! include `/setup`, `bootstrap this repo`, `set up workflow files`, `prepare a new project for prep`, `initialize agent guidance`
V49: `setup` preflight step 1 ! load `encode-docs` before reading/writing `AGENTS.md`; generated `AGENTS.md` template ! include full standard encoding symbol legend, ⊥ user-filled symbol placeholder
V50: `README.md` ! explain `/setup` bootstrap separation & exact six core workflow steps, responsibilities, iteration, and mandatory order/gates [MANUAL @ T64 — oracle = review, ⊥ `npm test` (§C test scope). Requirement stands.]
V51: RETIRED @ T63 (2026-07-16, user ruling) — `truth-workflow.md` deleted; ⊥ separate narrative file. Six-step order contract → V47; README narrative → V50. id ⊥ reused
V52: README `## The six core workflow steps` step 2 ∋ encode-docs described as automatic discipline (∋ "automatically" or "loaded by"); ⊥ imply user-triggered `/encode` command [MANUAL @ T64 — oracle = review, ⊥ `npm test` (§C test scope). Requirement stands.]
V53: `skills/setup/SKILL.md` AGENTS.md template support line ∋ `/encode-commit`
V54: `tests/repo-hygiene.test.mjs` ! ∋ assertion `skills/prep/SKILL.md` ∋ "incomplete phases" (anchors expand-vs-replace contract)
V55: `README.md` small-task path ! route `/spec` → `/prep` before `/cook`; ⊥ direct `/spec` → `/cook` [MANUAL @ T64 — oracle = review, ⊥ `npm test` (§C test scope). Requirement stands.]
V56: `.github/CONTRIBUTING.md` encoding guidance ! point at embedded `skills/spec/SKILL.md`/`§FORMAT`; ⊥ link/reference `FORMAT.md` [MANUAL @ T64 — oracle = review, ⊥ `npm test` (§C test scope). Requirement stands.]
V57: RETIRED @ T82 (2026-07-19) — `skills/caveman/` deleted ∴ ⊥ README row to match. id ⊥ reused
V58: `README.md` Layout tree ! list each current `skills/` child exactly once [MANUAL @ T64 — oracle = review, ⊥ `npm test` (§C test scope). Requirement stands.]
V59: `README.md` encode-docs loader list ! include `review-plan` (writer of `PLAN.md`/`HANDOFF.md`) [MANUAL @ T64 — oracle = review, ⊥ `npm test` (§C test scope). Requirement stands.]
V60: `§I` test oracle ! distinguish automated `npm test` checks from release/manual invariants (e.g. V13); ⊥ claim exit 0 proves ∀ §V [MANUAL @ T64 — oracle = review, ⊥ `npm test` (§C test scope). Requirement stands.]
V61: `skills/review-code/SKILL.md` ∃ & `skills/review-implementation/` ⊥ ∃; ∀ live non-CHANGELOG refs → `review-code`; historical `§T` task labels may retain original name as record
V62: `skills/cater/SKILL.md` ∃; frontmatter `name: cater`; description ∋ "sub-agent" & "dispatch" & "parallel"
V63: `cater` SKILL.md ! describe dedicated per-assignment handoff file, exact literal pattern `HANDOFF-<phase-id>.md` @ repo root (1 phase → 1 sub-agent ∴ phase-id sufficient; ⊥ agent-id suffix)
V64: `cater` SKILL.md ! describe sub-agent selection by phase/task complexity & ⊥ dispatch concurrent assignments touching same file (shared-file safety)
V65: `cater` sub-agent → on finish ! write `## completion` block (status\|evidence\|tests) into assigned `HANDOFF-<phase-id>.md`; main agent ! run phase-scoped acceptance review of sub-agent diff per `cook` self-review contract (§R.23) before accept. `garnish` ⊥ per-sub-agent (∵ §R.19); `/review-code` ⊥ mid-dispatch — stays step 6 (∵ §R.20, V47)
V66: `cater` SKILL.md ! describe main `HANDOFF.md` refresh @ each of: before dispatch, after sub-agent completion, after acceptance review, before stop (∵ large context in parallel workflow)
V67: `cater` SKILL.md ⊥ ∋ harness-specific agent names (e.g. `sonnet-implementer`, `Explore`); selection ! expressed in capability/complexity terms (∵ §R.21, §R.12 — `skills add` installs ⊥ agents → silent no-op; §C ⊥ project-specific refs in `skills/**`)
V68: `cater` → ∀ `HANDOFF-<phase-id>.md` purged after acceptance; root ⊥ ∃ `HANDOFF-*.md` @ cycle close (∵ §R.19 — garnish removes only `PLAN.md`/`HANDOFF.md` & blocks on unrelated dirty files ∴ leftovers litter | block close)
V69: `/setup` new `AGENTS.md` template → ∃ `## AI File Purpose`, `## Skills`, `## Project Scripts`, `## Encoding symbols`, `## End of Chat Checklist`; checklist ! includes lint/tests, CHANGELOG, SPEC, HANDOFF, commit, ⊥ push/tag; project-specific commands remain `?` placeholders
V70: `/cook` without phase arg → execute ∀ remaining PLAN.md phases sequentially; `/cook F<n>` → execute targeted phase only
V71: `prep` quality contract → production-quality, verification-driven, evidence-based implementation cues mapped across all 6 workflow steps; completion ! role label alone
V72: `skills/cook/SKILL.md` description → well-formed sentences (⊥ fragment `targets one phase. at principal-engineer quality`) & ∋ step-4 focus keywords "production-quality" & "verification-driven" & "evidence-based"
V73: `skills/review-code/SKILL.md` ! ∋ Security review dimension (secrets in diff, injection, authn/authz change, untrusted input, dependency/supply-chain delta) & description ∋ "security check" & "infosec"
V74: `skills/review-plan/SKILL.md` research gate ! prefer current primary web sources (official docs/changelogs/release notes), date-stamp ∀ finding, ⊥ trust model memory for versions/APIs; description ∋ gap-finding trigger ("gap") & "latest web data"
V75: ∀ 6 workflow steps → canonical focus keywords ∈ owning skill description (1 `prep`, 2 `encode-docs`, 3 `review-plan`, 4 `cook`+`cater`, 5 `garnish`, 6 `review-code`); keyword set → §R row from research; `prep` quality contract mirrors, ⊥ sole carrier
V77: `cook` (execution skill) EXECUTE step 6 ! invoke `encode-commit` ∀ commit message; scope = touched component, ⊥ phase id (`F2`); body ! name changed paths & what was verified, plain English; ⊥ bare "summary commit" [AMENDED 2026-07-19 ×2: per user ruling + §R29 (prior text mandated `feat(F2):` phase scope & `§V` body), then renamed `workonplan`→`cook`, `caveman-commit`→`encode-commit` per §R30]
V78: `handoff` rule 8 ! invoke `encode-commit` ∀ standalone baton commit; body = phase closed + next step + test state, plain English; ⊥ phase ids, ⊥ symbols, ⊥ bare `docs: handoff` [AMENDED 2026-07-19 ×2 per §R29 + §R30]
V79: `skills/encode-commit/SKILL.md` ! ∋ rule banning encoding symbols (`→ ∴ ∀ ⊥ ∃ §`) in GENERATED commit output & rule banning plan/spec ids (`F1`, `T77`, `V77`, `R28`, `B5`) as carrier of meaning; ! ∋ expansion guidance (∀ id → self-contained plain-English detail) & ≥1 before/after example. Scope = generated OUTPUT ⊥ skill's own prose (∵ its description ∋ `≤50 chars`)
V80: `NOTICE.md` row `skills/encode-commit/` Modified == `Yes` & names human-facing commit expansion change (∵ §R29 — vendored fork ! recorded per AGENTS.md vendor rule)
V81: shipped roster == 12 dirs exactly: `handoff`, `cook`, `cater`, `review-code`, `garnish`, `setup`, `prep`, `spec`, `review-plan`, `encode-docs`, `encode-commit`, `encode-pr`. `skills/{caveman,caveman-commit,caveman-encode,caveman-pr,workonplan,dispatchplan}/` ⊥ ∃. Roster count claim == `12` @ `README.md`, `AGENTS.md`, §I ×2 (∵ §R30 — stale `13` survives rename silently)
V82: ∀ live ref → new names only. `workonplan`, `dispatchplan`, `caveman-encode`, `caveman-commit`, `caveman-pr`, `caveman` ⊥ ∋ `skills/**`, `README.md`, `AGENTS.md`, `NOTICE.md`, `.github/CONTRIBUTING.md`, SPEC §G/§C/§I/§V. Historical §T/§B/§R labels + `CHANGELOG.md` retain original names as record (mirrors V61 `review-implementation` precedent)
V83: rename re-point ! by MEANING ⊥ by string (∵ §R31 — names reused across different skills): planning → `prep`, sequential execution → `cook`, parallel execution → `cater`, bootstrap → `setup`. `NOTICE.md` provenance ! verified by hand: `skills/prep/` ∈ cavekit-derived rows, `skills/cook/`+`skills/cater/`+`skills/setup/` ∈ Original work
V84: `skills/caveman/` ⊥ ∃; its §Rules + §Persistence baked into `review-plan` + `review-code` ONLY; ⊥ other skill carries the terse-output discipline (∵ user ruling 2026-07-19 — `prep`/`cook`/`cater` gain minimal benefit ∵ their output = files ⊥ chat)
V85: `review-plan` + `review-code` ! carry report-output token discipline: drop articles/filler/pleasantries/hedging, ⊥ tool-call narration, ⊥ decorative tables/emoji, ⊥ invented abbreviations, ⊥ causal arrows in report prose; always-on ∀ report; ! carve-out — Security findings, irreversible-action warnings, & ∀ BLOCK item stay explicit uncompressed prose (∵ §R32 — else compression eats exactly the findings that ! stay legible)

V86: `skills/spec/` ⊥ ∃ — merged into `encode-docs`. `encode-docs` = sole `SPEC.md` mutator & sole owner of all 3 doc formats. `/spec` ⊥ resolves; ∀ live ref → `encode-docs` (∵ user ruling 2026-07-19)
V87: `encode-docs` ! carry 3 explicit tailored sections `## SPEC SECTIONS`, `## PLAN SECTIONS`, `## HANDOFF SECTIONS`. ∀ section ! own structure + rules fitted to that doc's function (durable truth \| phase contract \| session baton); ⊥ one generic ruleset stretched across 3
V88: ∀ 3 docs ! own BAKED HEADER, emitted verbatim as first bytes by `encode-docs`. `PLAN.md` + `HANDOFF.md` headers NEW @ T86 (∵ prior: SPEC only ∴ cold agent read plan/baton w/ ⊥ format cue)
V89: baked header ∀ `SPEC.md` ! carry next-id counter (`next: V<n> T<n> B<n>`) ∵ V90 hard-deletes rows ∴ max-id scan ⊥ valid ∴ counter = sole id source. ids ⊥ reused ∀ time
V90: `garnish` ! instruct pruning §V + §T rows ⊥ relevant to current code: HARD-DELETE the row (⊥ `RETIRED` tombstone), bump baked-header `next:`, ⊥ reuse id (∵ user ruling 2026-07-19 — tombstones still cost ∀ session context; git = history). ! evidence-gated: prune only when code|test proving the row is gone
V91: ∀ `skills/**/SKILL.md` ⊥ emoji. Behavior examples ! labelled `good` / `bad` as words (∵ user ruling 2026-07-19). Applies to vendored files too → `NOTICE.md` Modified ! record it
V92: `tests/**` ⊥ emoji
V93: `npm test` total < 50 (∵ user ruling 2026-07-19 — over-tested @ 189). Collapse per-skill loops → aggregate case reporting ∀ offender at once; scope stays `skills/**` + license/release guards. §V losing its automated oracle ! be marked MANUAL \| deleted per V90, ⊥ silently unguarded
V94: ∀ `skills/**/SKILL.md` body ⊥ carry vendor attribution block (`> Vendored from...`, copyright line, `See NOTICE.md`). `NOTICE.md` = SOLE attribution record; frontmatter `license:` MAY stay (1 line, spec-native) (∵ user ruling 2026-07-19 — per-session token cost; 5 of 6 vendored skills already lean ∴ this = consistency fix). GATE §R36 ⊥ CLEARED & user ACCEPTED w/ evidence 2026-07-19: `npx skills add` proven to copy `SKILL.md` only ∴ `NOTICE.md` ⊥ reaches installer ∴ ∀ vendored copy ships w/ ⊥ notice. User informed of MIT §R.15 exposure, chose leanness. `NOTICE.md` stays complete in-repo (V15,V16,V17 unchanged). Frontmatter `license:` = the 1 permitted & travelling declaration ∴ ! present ∀ vendored skill

## §T TASKS

id|status|task|cites
T1|x|mv `handoff/`, `workonplan/` → `skills/`|C,V4,R4
T2|x|generalize `skills/workonplan/SKILL.md` → strip private refs|V9
T3|x|add `LICENSE` MIT|V10
T4|x|`CHANGELOG` → `CHANGELOG.md`, fix `CLAUDE.md` ref|V11
T5|x|add `package.json` — private, `test` script, node ≥20, devDeps `js-yaml`+`skills`|I.cmd
T6|x|impl `tests/skill-contract.test.mjs`|V1,V2,V3,V4,V5,V6,V7,V14
T7|x|impl `tests/repo-hygiene.test.mjs`|V9,V10,V11,V12
T8|x|impl `tests/cli-discovery.test.mjs` — CLI oracle|V8
T9|x|write `README.md` — install, skill table|I.cmd
T10|x|add `.github/workflows/ci.yml` — matrix 20,22,24 + win|V12,I.ci
T11|x|add `.github/workflows/release.yml` — tag → Release|V12,V13,I.ci
T12|x|add `.gitignore`|-
T13|x|add `CONTRIBUTING.md`|-
T14|x|add `.github/dependabot.yml` — actions + npm|-
T15|x|resolve `AGENTS.md`/`CLAUDE.md` hardlink → `CLAUDE.md` = `@AGENTS.md` import|-
T16|x|vendor cavekit 8 → `spec`,`build`,`check`,`backprop`,`grill`,`research`,`review`,`deepen`|C,V15,R15
T17|x|vendor cavekit `caveman` → `skills/caveman-encode/` + fix `name:` + disambiguate triggers|V4,V18,R13
T18|x|vendor caveman repo → `caveman`,`caveman-commit`,`caveman-review` + point `caveman` desc → `caveman-encode`|V18,R13
T19|x|rewrite `skills/caveman-help/SKILL.md` → this collection's roster (∵ upstream doc'd ⊥ vendored skills)|-
T20|x|⊥ vendor `caveman-stats`,`cavecrew`,`caveman-compress`|C,R11,R12,R14
T21|x|refine `spec` skill → embed §FORMAT + §BAKED HEADER, drop FORMAT.md dep|V20,V21
T22|x|repoint `build`,`handoff`,`workonplan` → baked header + `caveman-encode`|V18,V21
T23|x|add `NOTICE.md` — upstream MIT notices + per-skill provenance|V15,V16,V17,R15
T24|x|impl `tests/attribution.test.mjs`|V15,V16,V17,V18
T25|x|extend `tests/repo-hygiene.test.mjs` → no-scripts, no-FORMAT.md, spec-embeds-format|V19,V20,V21
T26|x|rm `FORMAT.md` + bake header into own `SPEC.md`|V21
T27|x|README — full roster table + credits|I.cmd
T28|x|`git push -u origin main` + tag `v0.1.0` (∵ v0.1.0 ⊥ released yet → fold collection into 1st release). push x @ `ae762ef`; tag `v0.1.0` x @ `892da32` (∵ user ask 2026-07-15). §T.29 dependabot + B4 js-yaml folded → `## [0.1.0]` ∵ ⊥ released ∴ ∀ main ∈ v0.1.0|V13
T29|x|dependabot `open-pull-requests-limit: 0` ∀ ecosystem; security updates + alerts stay on|V22,C
T30|x|rm `skills/backprop`, `check`, `deepen`, `grill`, `research` from shipped roster|V23
T31|x|add composite `skills/cook/SKILL.md` — `PLAN.md` + `HANDOFF.md` + spec handoff|V24,V25,I.file
T32|x|repoint `build`,`workonplan`,`spec`,`caveman-encode`,`caveman-help` → `cook` + `/spec bug:` flow|V24,V25,V26
T33|x|update `README.md`,`NOTICE.md`,`AGENTS.md`,`package.json`,`CHANGELOG.md` for 11-skill roster + `cook` provenance|I.cmd,V17
T34|x|extend tests → retired skills absent + `cook` contract + attribution update|V23,V24,V25,V26,V17
T35|x|harden `cook`/`workonplan` → phase `task:` mapping, sourced F1, per-item final verification|V27,V28,V29,V30,I.file
T36|x|test cook plan contract + workonplan phase/task contract|V27,V28,V29,V30
T37|x|refine `workonplan` verification gates → exact tests, §R fidelity, failure classification|V31,V32,V33,V34
T38|x|refine `handoff` state capture → exact test status, stop point, next executable step|V35
T39|x|test build-derived session gates and AGENTS symbol legend|V31,V32,V33,V34,V35
T40|x|retire `build` skill; migrate all `/build` cmd refs to `/workonplan`; update roster to 10 skills|V23,V26
T41|x|rename `caveman-review` → `caveman-pr`; update roster, NOTICE.md, tests, all refs|V4,V17
T42|x|rename `review` → `review-plan`; update triggers, docs, NOTICE, tests|V36,V39
T43|x|add `review-implementation` → baseline code sweep, evidence gate, `cook` handoff|V37,V39
T44|x|add `garnish` → verify completed plan, purge short-term files, preserve durable state|V38,V39
T45|x|test new roster, review contracts, garnish safety contract|V36,V37,V38,V39
T46|x|refine `workonplan` → invoke/commit `handoff` after every phase|V35,V40
T47|x|refine `garnish` → spec cleanup handoff, guarded purge, review-implementation next|V38,V41
T48|x|test per-phase baton + garnish durable close contract|V40,V41
T49|x|add `prep` → safe six-step repository bootstrap skill|V42,V43,V44,V45,V46
T50|x|update AGENTS/README/NOTICE/SPEC roster → 12 skills + prep lifecycle|V39,V42
T51|x|document 6-step lifecycle as §G core purpose + §C order constraint + §I flow line + V47 integrity invariant|V47,§G,§C,§I
T52|x|test prep contract → ordered commands, safe-file rules, minimal outputs|V42,V43,V44,V45,V46
T53|x|harden `prep` triggers, encode-first preflight, and generated symbol legend|V48,V49
T54|x|document six core workflow steps and `/prep` separation in README|V50,§G,§I
T55|x|release `v0.2.0` with matching package and changelog versions|V13
T56|x|research — confirm exact text targets, test patterns for V51-V60|V51,V52,V53,V54,V55,V56,V57,V58,V59,V60
T57|x|fix workflow docs + README contracts + add V51,V52,V55-V60 tests|V51,V52,V55,V56,V57,V58,V59,V60,§I
T58|x|fix prep template support line + add V53/V54 tests|V53,V54
T59|x|final verify: `npm test` green; §V51-V60 hold|V51,V52,V53,V54,V55,V56,V57,V58,V59,V60
T60|x|rename `skills/review-implementation/` → `skills/review-code/`; update ∀ live refs (incl. README layout tree + NOTICE original-work); preserve historical `§T` labels|V61,V58
T61|x|add `skills/dispatchplan/SKILL.md` + roster updates (README table+layout tree, AGENTS, NOTICE original-work, truth-workflow, tests)|V62,V63,V64,V65,V66,V67,V68,V39,V58
T62|x|final verify: rename + dispatchplan contracts; §V61-V68 HOLD + V58/V50 regression|V61,V62,V63,V64,V65,V66,V67,V68,V58,V50
T63|x|retire `truth-workflow.md` (user ruling 2026-07-16: ⊥ separate narrative file) → V51 retired; §G/§I narrative → `README.md`; purge dead refs @ `README.md:59`, `skills/prep/SKILL.md:25`, tests (`LIVE_REF_FILES`, V51 case). `workonplan` stays strict ⊥ sub-agent ∴ ⊥ cross-point → `dispatchplan`|V47,V50,§G,§I
T64|x|narrow test scope → `skills/**` + license/release guards (user ruling 2026-07-16); drop doc-prose asserts (README V50/V52/V55/V57/V58/V59, `.github/CONTRIBUTING.md` V56, AGENTS legend, CLAUDE import, V60) → those §V now MANUAL ⊥ retired; fix stale root `CONTRIBUTING.md` paths @ `LIVE_REF_FILES` + V56 case (red @ `ccec8bc`); `release.sh` test gate ! show output on red; AGENTS.md → 7-cmd list w/ `/dispatchplan` peer + full support roster + `release.sh`/`.github/` layout|V42,V50,V52,V55,V56,V57,V58,V59,V60,§C,§I
T65|x|research prep golden template requirements|V69
T66|x|update prep template + contract test + changelog|V69
T67|x|final verify prep template change|V69
T68|x|research `/workonplan` default-vs-explicit phase semantics + stale guidance|V70,R24
T69|x|update `workonplan` + README + prep + AGENTS + tests → default executes all phases|V70,R24
T70|x|final verify default execution contract + full suite|V70
T71|x|strengthen `cook` quality contract → observable cues across 6 workflow steps|V24,V25,V71
T72|x|research canonical focus-keyword set ∀ 6 steps + description-trigger best practice (latest web sources) → §R|V75
T73|x|fix `workonplan` description fragment + weave step-4 keywords|V72
T74|x|add Security dimension → `review-code`; security cues → `review-plan` blast radius + `workonplan` self-review|V73
T75|x|align ∀ 6 step descriptions w/ canonical keywords; dedupe `cook` description; update tests|V71,V74,V75
T76|x|final verify: full suite + manual doc §V oracle sweep|V72,V73,V74,V75
T77|x|research: vendored-fork constraint + commit-message boundary → §R29 (done); rename chain safety, substring hazards, semantic re-point map, caveman bake targets → §R30,R31,R32|V79,V80,V81,V83,V84,R29,R30,R31,R32
T78|x|add human-facing expansion rules to `encode-commit` (⊥ symbols, ⊥ plan ids, ∀ id → prose detail, before/after examples); repoint `cook` step 6 + `handoff` rule 8 → delegate to it; flip `NOTICE.md` Modified row; add tests. RUNS AFTER rename (T80-T82)|V77,V78,V79,V80
T79|x|final verify: §V77-V85 HOLD, `npm test` green, CHANGELOG + full diff coherent, ⊥ stale skill name in live refs|V77,V78,V79,V80,V81,V82,V83,V84,V85
T80|x|rename 7 skill dirs + frontmatter `name:` + intra-skill cross-refs, safe order per §R30: `prep`→`setup`, `cook`→`prep`, `workonplan`→`cook`, `dispatchplan`→`cater`, `caveman-encode`→`encode-docs`, `caveman-commit`→`encode-commit`, `caveman-pr`→`encode-pr`|V81,V82,V83,V4
T81|x|delete `skills/caveman/`; bake §Rules + §Persistence → always-on report-output discipline in `review-plan` + `review-code` only; preserve Auto-Clarity carve-out ∀ security/irreversible/BLOCK items|V84,V85,R32
T82|x|sweep repo surface: SPEC §G/§C/§I/§V paths + encoding-style vocabulary, `README.md`, `AGENTS.md`, `NOTICE.md` (by hand ∵ license), `.github/CONTRIBUTING.md`, tests (VENDORED list + stale-name guard), `CHANGELOG.md`; retire V18+V57; roster 13→12|V81,V82,V83,V18,V57

## §B BUGS

id|date|cause|fix
B1|2026-07-15|release.yml awk: dynamic regex `"^## \\[" ver "\\]"` → shell/awk collapse `\\[`→`\[`→`[` ∴ `[0.1.0]` parsed as char class ∴ ⊥ match ∴ notes empty ∀ release|`index($0, header) == 1` — ⊥ regex, ⊥ escaping. V13 empty-guard catches recurrence.
B2|2026-07-15|release.yml awk: last CHANGELOG section → ⊥ next `## [` ∴ ran to EOF ∴ trailing `[x]: url` link defs leaked into release notes|awk `found && /^\[/ { exit }`
B3|2026-07-15|copy-over commit `7bb0bc0` renamed `LICENSE` → `LICENSE.md` (git R100, pure rename, ⊥ intent) ∴ V10 red ∴ CI ⊥ on main + ∀ 3 dependabot PRs. README badge + README link + `NOTICE.md` link → `LICENSE` ∴ broke silently too|`git mv LICENSE.md LICENSE`. V10 caught @ CI ∴ ⊥ new invariant (V10 worked as designed).
B4|2026-07-15|`js-yaml` 5.x = ESM, ⊥ `default` export ∴ `import yaml from 'js-yaml'` → `SyntaxError: does not provide an export named 'default'` ∴ ∀ 4 test files ⊥ load, pass 0/fail 4. Rode in via PR #3 (`js-yaml` 4.3.0→5.2.1) merged while CI already red from B3 ∴ breakage masked ∵ red ⊥ distinguishable from red|`import * as yaml from 'js-yaml'` @ `tests/helpers.mjs` + `tests/repo-hygiene.test.mjs`. `load` still named export ∴ `yaml.load` call sites unchanged. CI `npm ci` caught ∴ ⊥ new invariant. ⚠ process gap: ⊥ branch protection ∴ red PR mergeable — user call.
B5|2026-07-16|`workonplan` description sentence fragment `targets one phase. at principal-engineer quality` — v0.4.0 all-phases edit (`c3aabac`) left stale clause; shipped in tag|V72
B6|2026-07-19|MSYS `sed`/`grep` strip CR on read ∴ `sed -i` on CRLF file rewrote whole file LF (2592-line phantom diff, ∀ content unchanged); `grep -q $'\r'` returned false ∀ CRLF file ∴ detection loop wrong → "fix" pass appended CR to LF files, inverting the damage. Caught @ F2 self-review via `git diff --stat`, ⊥ by tests (content identical ∴ suite green throughout)|Restore from `git show HEAD:<path>`, re-apply edit via Edit tool ⊥ sed. Detect line endings with `tr -dc '\r' \| wc -c`, ⊥ `grep`. §C line-ending row records the per-file map. ⊥ new §V (⊥ testable: green suite ⊥ distinguishes it)
T83|x|research: merge surface (`spec`+`encode-docs` overlap, ref counts, line budget vs V14 ≤500), §V losing oracle @ test cut, emoji inventory, PLAN/HANDOFF header design → §R33-R35; DOES `npx skills add` copy `NOTICE.md` to installed copy → §R36 (gates V94)|V86,V87,V88,V93,V94
T84|~|merge `spec` → `encode-docs`: 3 tailored sections (SPEC\|PLAN\|HANDOFF) + mutator rules (NEW/DISTILL/BUG/AMEND) + dedupe encoding grammar; `git rm -r skills/spec/`|V86,V87
T85|.|3 baked headers, 1 per doc, emitted verbatim; SPEC header gains `next: V<n> T<n> B<n>` counter|V88,V89
T86|.|re-point ∀ `/spec` + `spec` skill ref → `encode-docs` across `skills/**` + root docs + `NOTICE.md` (cavekit row ! credit `caveman`+`spec` both); roster 12→11|V86,V17,V81
T87|.|lean skill bodies: purge emoji ∀ `skills/**` + `tests/**` (❌/✅ → `bad`/`good` words, severity emoji → text labels) + strip vendor attribution block @ `encode-docs` (§R36-gated); `NOTICE.md` Modified rows record vendored edits|V91,V92,V94,V17
T88|.|`garnish` gains evidence-gated §V/§T prune step: hard-delete, bump `next:`, ⊥ reuse id|V90
T89|.|cut tests < 50: collapse per-skill loops → aggregate; drop brittle prose asserts; ∀ §V losing oracle → MANUAL \| deleted per V90|V93
T90|.|final verify: §V86-V93 HOLD, suite green & < 50, ⊥ stale `spec` ref, ⊥ emoji|V86,V87,V88,V89,V90,V91,V92,V93

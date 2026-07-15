<!-- SPEC FORMAT (baked by /spec — keep; makes this file self-describing)
Sections, fixed order: §G goal | §C constraints | §I interfaces | §R research? | §V invariants | §T tasks | §B bugs
Address §<S>.<n> — §V.2 = invariants item 2. Commits/PRs cite by §.
Encoding caveman: drop articles/filler/aux verbs. Fragments fine. Short synonyms (fix > implement).
Preserve verbatim: code, paths, identifiers, URLs, numbers, error strings, SQL, regex.
Symbols: → leads to | ∴ therefore | ∀ every | ∃ some | ! must | ? may/unknown | ⊥ never | ≠ | ∈ | ∉ | ≤ | ≥ | & and | § section
Tables (§R,§T,§B): pipe-delimited. ids monotonic, never reused. Escape literal \| . Empty cell = -
§T status: x done | ~ wip | . todo
One file rule: >500 lines → compact §B oldest-first, ⊥ split into more files.
Full rules: /spec skill (§FORMAT). Cutting a word that loses a fact ⊥ allowed.
-->

# SPEC

## §G GOAL

Public repo `jasonyang-ee/skills` → personal central skill collection, installable via `npx skills add jasonyang-ee/skills`. Own skills (`handoff`, `workonplan`) + vendored cavekit/caveman suite.

## §C CONSTRAINTS

- Layout `skills/<name>/SKILL.md`. Agent Skills spec + skills CLI flat discovery (§R.1, §R.4).
- ∀ SKILL.md ! Agent Skills spec compliant. Spec ⊃ skills CLI reqs ∴ spec binds (§R.1, §R.2).
- Skills = markdown only. ⊥ runtime deps for installing user. ⊥ Python. ⊥ `scripts/` (∵ user ruling 2026-07-15).
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
- `SPEC.md` + `AGENTS.md` caveman. `README.md`/`CONTRIBUTING.md`/`NOTICE.md` normal English (∵ human-facing).

## §I INTERFACES

- cmd: `npx skills add jasonyang-ee/skills` → installs ∀ 15 skills → detected agents
- cmd: `npx skills add jasonyang-ee/skills --list` → lists ∀ 15
- cmd: `npx skills add jasonyang-ee/skills -s spec -a claude-code -g -y` → 1 skill, 1 agent, global, non-interactive
- file: `skills/<name>/SKILL.md` → frontmatter `{name == <name>, description, license: MIT}`
- roster: own → `handoff`, `workonplan`. cavekit → `spec`, `build`, `check`, `backprop`, `grill`, `research`, `review`, `deepen`, `caveman-encode`. caveman → `caveman`, `caveman-commit`, `caveman-review`, `caveman-help`
- file: `SPEC.md` @ consumer repo root → baked format header (HTML comment) first bytes, written by `spec` skill
- cmd: `npm test` → `node --test` → exit 0 ⟺ ∀ §V pass
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
V18: `caveman` ↔ `caveman-encode` ! cross-point in description (∵ §R.13 — wrong load → SPEC.md written ⊥ symbols, silent)
V19: ∀ skill → ⊥ `scripts/` dir (∵ §C markdown-only, user ruling)
V20: `skills/spec/SKILL.md` ! ∋ `## FORMAT` & `## BAKED HEADER` & header template
V21: ∀ skill → ⊥ require `FORMAT.md`; root ⊥ ∃ `FORMAT.md`
V22: `.github/dependabot.yml` → ∀ `updates[]` entry ! `open-pull-requests-limit: 0` (∵ §C; re-enable = unwanted public PR)

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
T28|~|`git push -u origin main` + tag `v0.1.0` (∵ v0.1.0 ⊥ released yet → fold collection into 1st release). push x @ `ae762ef`; tag ⊥ yet (∵ user ruling 2026-07-15 — push only)|-
T29|x|dependabot `open-pull-requests-limit: 0` ∀ ecosystem; security updates + alerts stay on|V22,C

## §B BUGS

id|date|cause|fix
B1|2026-07-15|release.yml awk: dynamic regex `"^## \\[" ver "\\]"` → shell/awk collapse `\\[`→`\[`→`[` ∴ `[0.1.0]` parsed as char class ∴ ⊥ match ∴ notes empty ∀ release|`index($0, header) == 1` — ⊥ regex, ⊥ escaping. V13 empty-guard catches recurrence.
B2|2026-07-15|release.yml awk: last CHANGELOG section → ⊥ next `## [` ∴ ran to EOF ∴ trailing `[x]: url` link defs leaked into release notes|awk `found && /^\[/ { exit }`
B3|2026-07-15|copy-over commit `7bb0bc0` renamed `LICENSE` → `LICENSE.md` (git R100, pure rename, ⊥ intent) ∴ V10 red ∴ CI ⊥ on main + ∀ 3 dependabot PRs. README badge + README link + `NOTICE.md` link → `LICENSE` ∴ broke silently too|`git mv LICENSE.md LICENSE`. V10 caught @ CI ∴ ⊥ new invariant (V10 worked as designed).
B4|2026-07-15|`js-yaml` 5.x = ESM, ⊥ `default` export ∴ `import yaml from 'js-yaml'` → `SyntaxError: does not provide an export named 'default'` ∴ ∀ 4 test files ⊥ load, pass 0/fail 4. Rode in via PR #3 (`js-yaml` 4.3.0→5.2.1) merged while CI already red from B3 ∴ breakage masked ∵ red ⊥ distinguishable from red|`import * as yaml from 'js-yaml'` @ `tests/helpers.mjs` + `tests/repo-hygiene.test.mjs`. `load` still named export ∴ `yaml.load` call sites unchanged. CI `npm ci` caught ∴ ⊥ new invariant. ⚠ process gap: ⊥ branch protection ∴ red PR mergeable — user call.

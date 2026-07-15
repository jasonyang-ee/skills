# SPEC

## §G GOAL

Public repo `jasonyang-ee/skills` → ship `handoff` + `workonplan` skills, installable via `npx skills add jasonyang-ee/skills`.

## §C CONSTRAINTS

- Layout `skills/<name>/SKILL.md`. Agent Skills spec + skills CLI flat discovery (§R.1, §R.4).
- ∀ SKILL.md ! Agent Skills spec compliant. Spec ⊃ skills CLI reqs ∴ spec binds (§R.1, §R.2).
- Skills = markdown only. ⊥ runtime deps for installing user.
- License MIT. `LICENSE` @ root.
- Publish = GitHub Release only. npm publish ⊥ (∵ §R.3).
- Tests: `node:test` (Node built-in runner). devDeps ≤ 1 (`js-yaml`). ⊥ `skills-ref` npm (∵ §R.8).
- Node ≥ 20 LTS.
- ⊥ private-codebase refs in published skills (∵ repo public).
- CI ! least-priv top-level `permissions:`. ⊥ secrets beyond `GITHUB_TOKEN`.
- ⊥ push | tag without explicit user ask (house policy, `CLAUDE.md`).
- `SPEC.md` + `FORMAT.md` caveman. `README.md`/`CONTRIBUTING.md` normal English (∵ human-facing).

## §I INTERFACES

- cmd: `npx skills add jasonyang-ee/skills` → installs both skills → detected agents
- cmd: `npx skills add jasonyang-ee/skills --list` → lists `handoff`, `workonplan`
- cmd: `npx skills add jasonyang-ee/skills -s handoff -a claude-code -g -y` → 1 skill, 1 agent, global, non-interactive
- file: `skills/handoff/SKILL.md` → frontmatter `{name: handoff, description}`
- file: `skills/workonplan/SKILL.md` → frontmatter `{name: workonplan, description}`
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

## §V INVARIANTS

V1: ∀ `skills/*/SKILL.md` → frontmatter ! parse as valid YAML
V2: ∀ skill → `name` ! string & non-empty
V3: ∀ skill → `description` ! string & non-empty
V4: ∀ skill → `name` == parent dir name
V5: ∀ skill → `name` ∈ `/^[a-z0-9]+(-[a-z0-9]+)*$/` & len ≤ 64
V6: ∀ skill → `description` len ≤ 1024
V7: ∀ skill `name` → unique across repo
V8: `skills add . --list` → ⊇ {`handoff`, `workonplan`} (real CLI oracle, ⊥ mock)
V9: ∀ `skills/**/SKILL.md` → ⊥ match private-ref denylist (`trading`, `StrategyBacktestConfig`, `test.sh`, `V52`, `money math`)
V10: `LICENSE` ! ∃ @ root & ∋ `MIT`
V11: `CHANGELOG.md` ! ∃ `## [Unreleased]`
V12: ∀ `.github/workflows/*.yml` → ! top-level `permissions:` block
V13: release tag `v<x.y.z>` → `CHANGELOG.md` ! ∃ `## [<x.y.z>]` section & `package.json` version == `<x.y.z>`, else release ⊥. Enforced by `release.yml` ⊥ `npm test` (∵ needs tag ctx). Verified manually both directions 2026-07-15.
V14: ∀ skill → SKILL.md body ≤ 500 lines (∵ §R.9)

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
T16|.|`git push -u origin main` + tag `v0.1.0`|-

## §B BUGS

id|date|cause|fix
B1|2026-07-15|release.yml awk: dynamic regex `"^## \\[" ver "\\]"` → shell/awk collapse `\\[`→`\[`→`[` ∴ `[0.1.0]` parsed as char class ∴ ⊥ match ∴ notes empty ∀ release|`index($0, header) == 1` — ⊥ regex, ⊥ escaping. V13 empty-guard catches recurrence.
B2|2026-07-15|release.yml awk: last CHANGELOG section → ⊥ next `## [` ∴ ran to EOF ∴ trailing `[x]: url` link defs leaked into release notes|awk `found && /^\[/ { exit }`

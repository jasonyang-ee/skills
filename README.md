# skills

[![CI](https://github.com/jasonyang-ee/skills/actions/workflows/ci.yml/badge.svg)](https://github.com/jasonyang-ee/skills/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Agent skills for running a long, multi-session project from a plan without
losing the thread between sessions.

Two skills that work as a pair:

| Skill | What it does |
| --- | --- |
| [`workonplan`](skills/workonplan/SKILL.md) | Executes `PLAN.md` phases one at a time as a single main agent — verification contract first, self-review before every commit, no sub-agents. |
| [`handoff`](skills/handoff/SKILL.md) | Writes `HANDOFF.md`, the baton the next cold session reads to know exactly where work stopped and what to watch out for. |

`workonplan` invokes `handoff` at the end of every session, so the next session
starts by reading it. That loop is the point: the plan holds the intent, the
handoff holds the state.

## Install

```bash
npx skills add jasonyang-ee/skills
```

That detects your agents and installs both skills. To be more specific:

```bash
# Preview what's in here without installing
npx skills add jasonyang-ee/skills --list

# One skill, one agent
npx skills add jasonyang-ee/skills --skill workonplan --agent claude-code

# Install globally (available in every project), no prompts
npx skills add jasonyang-ee/skills --global --yes
```

Works with [Claude Code](https://code.claude.com/docs/en/skills), Cursor,
Codex, OpenCode, and [70+ other agents](https://github.com/fforres/skills#supported-agents).
Requires Node 18 or newer.

## Use

Once installed, invoke either skill directly:

```
/workonplan          # pick up the next unfinished phase
/workonplan F1       # run a specific phase
/handoff             # write the session baton now
```

Or just describe the task — "continue the plan", "wrap up the session" — and
your agent will load the matching skill on its own.

### What they expect

`workonplan` reads these files from your repo root if they exist. None are
required to be present, but the skill is most useful when they are:

- `PLAN.md` — phases, each with a verification contract
- `SPEC.md` — goal, constraints, invariants (§V), task table (§T)
- `HANDOFF.md` — written by `handoff`; the resume pointer

Neither skill assumes a language, framework, or directory layout. `workonplan`
finds your test command from `package.json`, `Makefile`, `justfile`, or CI
config rather than hardcoding one.

## Layout

```
skills/
├── handoff/SKILL.md
└── workonplan/SKILL.md
```

Each skill is a directory with a `SKILL.md`, per the
[Agent Skills specification](https://agentskills.io/specification.md). The
`skills/` directory is what `npx skills add` scans.

## Development

```bash
npm install
npm test
```

The suite checks three things:

1. **Contract** — both skills satisfy the Agent Skills spec: name matches its
   directory, name and description are present and within the 64/1024 character
   limits, bodies stay under 500 lines.
2. **Hygiene** — an MIT `LICENSE` exists, `CHANGELOG.md` keeps an `Unreleased`
   section, and every workflow declares least-privilege `permissions`.
3. **Discovery** — the real `skills` CLI is run against this repo and must list
   every skill. A skill with perfect frontmatter is still broken if the tool
   users install with can't see it.

Adding a skill means adding `skills/<name>/SKILL.md`; the tests pick it up with
no extra wiring.

## Releasing

Releases are cut from a tag, and there is no npm package — `npx skills add`
installs straight from GitHub.

```bash
# 1. Move Unreleased notes under a new version heading in CHANGELOG.md
# 2. Match package.json's version to it
git tag v0.2.0
git push origin v0.2.0
```

The release workflow re-runs the tests, verifies the tag matches
`package.json`, extracts that version's `CHANGELOG.md` section, and publishes a
GitHub Release with it. A tag without a matching changelog section fails
instead of shipping empty notes.

## License

[MIT](LICENSE)

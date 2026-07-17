# skills

[![CI](https://github.com/jasonyang-ee/skills/actions/workflows/ci.yml/badge.svg)](https://github.com/jasonyang-ee/skills/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A personal central collection of agent skills for spec-driven development: hold
the truth in one `SPEC.md`, execute it phase by phase, and never lose the thread
between sessions. `/prep` is one-time bootstrap; the core loop has six steps.

## Install

```bash
npx skills add jasonyang-ee/skills
```

That detects your agents and installs all 13 skills. To be more specific:

```bash
# Preview what's in here without installing
npx skills add jasonyang-ee/skills --list

# Just the plan-and-execute front door
npx skills add jasonyang-ee/skills --skill cook --skill workonplan --skill spec --agent claude-code

# Install globally (available in every project), no prompts
npx skills add jasonyang-ee/skills --global --yes
```

## The skills

### Spec-driven loop

One `SPEC.md` at your repo root is the single source of truth. `/spec` is its
only mutator; everything else reads it or feeds it material.

| Skill | What it does |
| --- | --- |
| [`prep`](skills/prep/SKILL.md) | Bootstraps `AGENTS.md`, the `CLAUDE.md` import, and minimal missing `CHANGELOG.md`/`SPEC.md` files before the core workflow. |
| [`cook`](skills/cook/SKILL.md) | Turns a request into a research-first `PLAN.md` + `HANDOFF.md`, hands durable facts to `spec`, and reserves the last phase for final verification. |
| [`spec`](skills/spec/SKILL.md) | Creates and amends `SPEC.md`. Sole mutator. |
| [`review-plan`](skills/review-plan/SKILL.md) | Adversarial senior review that tries to *refute* the spec and plan before implementation. Ends in an explicit go/no-go. |
| [`review-code`](skills/review-code/SKILL.md) | Principal-engineer sweep since the last release baseline for correctness, complexity, reuse, and coherence; hands fixes to `cook`. |
| [`garnish`](skills/garnish/SKILL.md) | Verifies a completed plan cycle, then removes short-lived `PLAN.md` and `HANDOFF.md` while preserving `SPEC.md`. |

### Session continuity

| Skill | What it does |
| --- | --- |
| [`workonplan`](skills/workonplan/SKILL.md) | Executes all remaining `PLAN.md` phases in order as a single main agent by default — verification contract first, self-review before every commit, no sub-agents. Pass a phase such as `F1` to target one phase. |
| [`dispatchplan`](skills/dispatchplan/SKILL.md) | The parallel alternative: assigns phases to sub-agents through per-phase handoff files, never overlapping their file sets, and reviews each diff before accepting it. |
| [`handoff`](skills/handoff/SKILL.md) | Writes `HANDOFF.md`, the baton the next cold session reads to know exactly where work stopped and what to watch out for. |

Both `workonplan` and `dispatchplan` invoke `handoff` at the end of every
session, so the next session starts by reading it. The plan holds the intent;
the handoff holds the state.

## The six core workflow steps

This section is the canonical sequence. `/prep` prepares a repository for this
sequence but is not one of its six steps:

1. **Cook** — turn an idea, bug, feature, or expected behavior into an
   iterative `PLAN.md` and `HANDOFF.md`, while handing durable decisions to
   `SPEC.md` through `spec`.
2. **Encode** — every `PLAN.md` and `HANDOFF.md` update is written in
   `caveman-encode`, so a cold session can read the compact, standard symbol
   language. The skills that write those files load the encoding
   automatically; this is a writing discipline, not a command you invoke.
3. **Review the plan** — in a cold session, resolve research questions and
   refute the plan until it reaches an explicit GO gate. Repeat as needed.
4. **Work on the plan** — in another cold session, execute all remaining
   phases in order with `workonplan`, verifying, committing, and refreshing
   `HANDOFF.md` after each phase. Pass a phase to target one phase only. Or use
   `dispatchplan` to run phases whose file sets do not overlap in parallel,
   across sub-agents.
5. **Garnish** — after all phases pass, route durable cleanup through `spec`,
   then remove short-lived `PLAN.md` and `HANDOFF.md`.
6. **Review the implementation** — sweep the completed implementation from its
   release baseline, then send accepted fixes or improvements into the next
   `cook` cycle.

The loop is intentionally iterative: step 3 can refine research and the plan,
and step 6 can start another cook cycle. The order and safety gates remain
mandatory.

### Compression

| Skill | What it does |
| --- | --- |
| [`caveman`](skills/caveman/SKILL.md) | Ultra-compressed replies for ordinary chat. Two levels: full (default) and ultra. |
| [`caveman-encode`](skills/caveman-encode/SKILL.md) | The encoding `SPEC.md`, `PLAN.md`, and `HANDOFF.md` are written in. Loaded by `/spec`, `/cook`, `/review-plan`, `/handoff`, and `/workonplan`. |
| [`caveman-commit`](skills/caveman-commit/SKILL.md) | Terse Conventional Commits messages. Subject ≤50 chars. |
| [`caveman-pr`](skills/caveman-pr/SKILL.md) | Terse PR review. One line per finding: location, problem, fix. |

> **`caveman` vs `caveman-encode`** — these do opposite things and it matters.
> `caveman-encode` *requires* the symbol set (`→ ∴ ∀ ⊥`) that `SPEC.md` is
> written in; `caveman` deliberately *avoids* arrows as not worth their tokens
> in prose. Writing a spec → `caveman-encode`. Talking → `caveman`. Upstream
> both are named `caveman`; this collection renames the spec encoder so the two
> can coexist.

## No FORMAT.md needed

Upstream, `/spec` requires a `FORMAT.md` checked into every project that uses
it. Here the format is embedded in the `spec` skill, and every `SPEC.md` it
writes opens with a baked format header — an HTML comment, so it stays invisible
on GitHub while a cold agent reading the raw file learns the section schema,
symbol set, and table rules without loading anything else. One less file to
carry per project.

Works with [Claude Code](https://code.claude.com/docs/en/skills), Cursor,
Codex, OpenCode, and [70+ other agents](https://github.com/fforres/skills#supported-agents).
Requires Node 20 or newer.

## Use

Invoke any skill directly, or just describe the task and your agent loads the
matching one on its own.

```
/prep                 # bootstrap guidance before the core workflow
/cook                # draft PLAN.md + HANDOFF.md, research first
/spec                # write or amend SPEC.md
/workonplan          # run all remaining plan phases in order
/workonplan F1       # run a specific plan phase
/handoff             # write the session baton now
```

A typical multi-session run starts with `/prep`, then follows the six core
steps: `/cook` → encode → `/review-plan` → `/workonplan` → `/garnish` →
`/review-code`. For a small, already-clear spec task, record it with `/spec`,
then still run `/cook` before `/workonplan` — `/workonplan` executes `PLAN.md`
phases, and only `/cook` produces that file. `/review-plan` is the step worth
skipping when the blast radius is small, not `/cook`.

After a completed cycle: `/review-code` → `/cook` for fixes or improvements →
`/garnish` after all workonplan phases finish.

### What they expect

These files at your repo root, if they exist. None are required, but the skills
are most useful when they are:

- `SPEC.md` — goal, constraints, invariants (§V), task table (§T). Written by
  `/spec`, typically fed by `/cook`.
- `PLAN.md` — phases, each with a verification contract. Drafted by `/cook`,
  executed by `/workonplan`.
- `HANDOFF.md` — drafted by `/cook`, refreshed by `/handoff`; the resume pointer.

No skill assumes a language, framework, or directory layout. `workonplan` finds
your test command from `package.json`, `Makefile`, `justfile`, or CI config
rather than hardcoding one.

## Layout

```
skills/
├── caveman/          caveman-commit/   caveman-encode/   caveman-pr/
├── cook/             dispatchplan/     garnish/          handoff/
├── prep/             review-code/      review-plan/      spec/
└── workonplan/
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

1. **Contract** — every skill satisfies the Agent Skills spec: name matches its
   directory, name and description are present and within the 64/1024 character
   limits, bodies stay under 500 lines.
2. **Hygiene** — an MIT `LICENSE` exists, `CHANGELOG.md` keeps an `Unreleased`
   section, and every workflow declares least-privilege `permissions`.
3. **Discovery** — the real `skills` CLI is run against this repo and must list
   every skill. A skill with perfect frontmatter is still broken if the tool
   users install with can't see it.

Adding a skill means adding `skills/<name>/SKILL.md`; the tests pick it up with
no extra wiring.

## Credits

Most of this collection is the work of **[Julius Brussee](https://github.com/JuliusBrussee)**,
vendored under MIT and gratefully used:

- **[cavekit](https://github.com/JuliusBrussee/cavekit)** — `spec`,
  `review` (renamed here as `review-plan`), and the encoding that ships here as `caveman-encode`, plus the
  upstream planning trio (`grill`, `research`, `check`) that was recomposed here
  into `cook`. The `SPEC.md` schema is his design.
- **[caveman](https://github.com/JuliusBrussee/caveman)** — `caveman`,
  `caveman-commit`, `caveman-pr`.

Only `handoff`, `workonplan`, `dispatchplan`, `review-code`, `garnish`, and `prep` are fully original here. `cook` is a composite
skill derived from cavekit's planning flow. Where skills were modified — the
`caveman-encode` rename, the embedded format in `spec`, the `cook` composite —
it's recorded per-skill in [NOTICE.md](NOTICE.md), along with the upstream
copyright and permission notices that MIT requires travel with the copies.

Three upstream skills are deliberately **not** vendored, because they can't work
when installed this way. Get them from Julius's repos directly:

| Skill | Why not here |
| --- | --- |
| `caveman-stats` | Delivered by a hook (`hooks/caveman-stats.js`). `npx skills add` doesn't install hooks, so it would be a silent no-op. |
| `cavecrew` | Dispatches the `cavecrew-*` subagents, which aren't installable as skills. |
| `caveman-compress` | Needs Python 3 for its bundled scripts; this collection is markdown-only. |

If you want the full caveman experience including hooks and subagents, install
[JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) with its own
installer — it sets up the pieces `npx skills add` can't.

## License

[MIT](LICENSE) for original work. Vendored skills are MIT,
Copyright (c) 2026 Julius Brussee — see [NOTICE.md](NOTICE.md).

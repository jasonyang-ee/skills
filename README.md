# skills

[![CI](https://github.com/jasonyang-ee/skills/actions/workflows/ci.yml/badge.svg)](https://github.com/jasonyang-ee/skills/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A personal central collection of agent skills for spec-driven development: hold
the truth in one `SPEC.md`, execute it phase by phase, and never lose the thread
between sessions. `/setup` is one-time bootstrap; the core loop has six steps.

## Install

```bash
npx skills add jasonyang-ee/skills
```

That detects your agents and installs all 11 skills. To be more specific:

```bash
# Preview what's in here without installing
npx skills add jasonyang-ee/skills --list

# Just the plan-and-execute front door
npx skills add jasonyang-ee/skills --skill prep --skill cook --skill encode-docs --agent claude-code

# Install globally (available in every project), no prompts
npx skills add jasonyang-ee/skills --global --yes
```

## The skills

### Spec-driven loop

One `SPEC.md` at your repo root is the single source of truth. `/encode-docs` is its
only mutator; everything else reads it or feeds it material.

| Skill | What it does |
| --- | --- |
| [`setup`](skills/setup/SKILL.md) | Bootstraps `AGENTS.md`, the `CLAUDE.md` import, and minimal missing `CHANGELOG.md`/`SPEC.md` files before the core workflow. |
| [`prep`](skills/prep/SKILL.md) | Turns a request into a research-first `PLAN.md` + `HANDOFF.md`, hands durable facts to `encode-docs`, and reserves the last phase for final verification. |
| [`encode-docs`](skills/encode-docs/SKILL.md) | Owns the format of all three documents and is the only writer of `SPEC.md`. Listed again under Compression. |
| [`review-plan`](skills/review-plan/SKILL.md) | Adversarial senior review that tries to *refute* the spec and plan before implementation. Ends in an explicit go/no-go. |
| [`review-code`](skills/review-code/SKILL.md) | Principal-engineer sweep since the last release baseline for correctness, complexity, reuse, and coherence; hands fixes to `prep`. |
| [`garnish`](skills/garnish/SKILL.md) | Verifies a completed plan cycle, then removes short-lived `PLAN.md` and `HANDOFF.md` while preserving `SPEC.md`. |

### Session continuity

| Skill | What it does |
| --- | --- |
| [`cook`](skills/cook/SKILL.md) | Executes all remaining `PLAN.md` phases in order as a single main agent by default — verification contract first, self-review before every commit, no sub-agents. Pass a phase such as `F1` to target one phase. |
| [`cater`](skills/cater/SKILL.md) | The parallel alternative: assigns phases to sub-agents through per-phase handoff files, never overlapping their file sets, and reviews each diff before accepting it. |
| [`handoff`](skills/handoff/SKILL.md) | Writes `HANDOFF.md`, the baton the next cold session reads to know exactly where work stopped and what to watch out for. |

Both `cook` and `cater` invoke `handoff` at the end of every
session, so the next session starts by reading it. The plan holds the intent;
the handoff holds the state.

## The six core workflow steps

This section is the canonical sequence. `/setup` prepares a repository for this
sequence but is not one of its six steps:

1. **Prep** — turn an idea, bug, feature, or expected behavior into an
   iterative `PLAN.md` and `HANDOFF.md`, while handing durable decisions to
   `SPEC.md` through `encode-docs`.
2. **Encode** — every `PLAN.md` and `HANDOFF.md` update is written in
   `encode-docs`, so a cold session can read the compact, standard symbol
   language. The skills that write those files load the encoding
   automatically; this is a writing discipline, not a command you invoke.
3. **Review the plan** — in a cold session, resolve research questions and
   refute the plan until it reaches an explicit GO gate. Repeat as needed.
4. **Work on the plan** — in another cold session, execute all remaining
   phases in order with `cook`, verifying, committing, and refreshing
   `HANDOFF.md` after each phase. Pass a phase to target one phase only. Or use
   `cater` to run phases whose file sets do not overlap in parallel,
   across sub-agents.
5. **Garnish** — after all phases pass, route durable cleanup through `encode-docs`,
   then remove short-lived `PLAN.md` and `HANDOFF.md`.
6. **Review the implementation** — sweep the completed implementation from its
   release baseline, then send accepted fixes or improvements into the next
   `prep` cycle.

The loop is intentionally iterative: step 3 can refine research and the plan,
and step 6 can start another prep cycle. The order and safety gates remain
mandatory.

### Compression

| Skill | What it does |
| --- | --- |
| [`encode-docs`](skills/encode-docs/SKILL.md) | The encoding all three documents are written in, a tailored section set and baked header for each, and the only writer of `SPEC.md`. Loaded by `/prep`, `/review-plan`, `/handoff`, and `/cook`. |
| [`encode-commit`](skills/encode-commit/SKILL.md) | Terse Conventional Commits messages. Subject ≤50 chars. |
| [`encode-pr`](skills/encode-pr/SKILL.md) | Terse PR review. One line per finding: location, problem, fix. |

> **Where terse output went** — this collection used to ship a conversational
> `caveman` skill for compressing ordinary chat replies. It is gone. Its rules
> now apply automatically to the reports `/review-plan` and `/review-code`
> write, which is the only place they paid for themselves. Security findings,
> warnings about irreversible actions, every BLOCK item, and all `file:line`
> evidence are exempt and stay in full prose.

## No FORMAT.md needed

Upstream, the spec skill required a `FORMAT.md` checked into every project that used
it. Here the format is embedded in `encode-docs`, and every `SPEC.md` it
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
/setup      # bootstrap guidance before the core workflow
/prep       # draft PLAN.md + HANDOFF.md, research first
/encode-docs # write or amend SPEC.md
/cook       # run all remaining plan phases in order
/cook F1    # run a specific plan phase
/handoff    # write the session baton now
```

A typical multi-session run starts with `/setup`, then follows the six core
steps: `/prep` → encode → `/review-plan` → `/cook` → `/garnish` →
`/review-code`. For a small, already-clear spec task, record it with `/encode-docs`,
then still run `/prep` before `/cook` — `/cook` executes `PLAN.md`
phases, and only `/prep` produces that file. `/review-plan` is the step worth
skipping when the blast radius is small, not `/prep`.

After a completed cycle: `/review-code` → `/prep` for fixes or improvements →
`/garnish` after all cook phases finish.

### What they expect

These files at your repo root, if they exist. None are required, but the skills
are most useful when they are:

- `SPEC.md` — goal, constraints, invariants (§V), task table (§T). Written by
  `/encode-docs`, typically fed by `/prep`.
- `PLAN.md` — phases, each with a verification contract. Drafted by `/prep`,
  executed by `/cook`.
- `HANDOFF.md` — drafted by `/prep`, refreshed by `/handoff`; the resume pointer.

No skill assumes a language, framework, or directory layout. `cook` finds
your test command from `package.json`, `Makefile`, `justfile`, or CI config
rather than hardcoding one.

## Layout

```
skills/
├── cater/            cook/            encode-commit/   encode-docs/
├── encode-pr/        garnish/         handoff/         prep/
└── review-code/      review-plan/     setup/
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

- **[cavekit](https://github.com/JuliusBrussee/cavekit)** — his `spec` and
  `caveman` skills, merged here into `encode-docs`; `review` (renamed here as
  `review-plan`); plus the upstream planning trio (`grill`, `research`,
  `check`) recomposed here into `prep`. The `SPEC.md` schema is his design.
- **[caveman](https://github.com/JuliusBrussee/caveman)** — `encode-commit`
  and `encode-pr`, plus the terse-output rules now baked into `/review-plan`
  and `/review-code`.

Only `handoff`, `cook`, `cater`, `review-code`, `garnish`, and `setup` are fully original here. `prep` is a composite
skill derived from cavekit's planning flow. Where skills were modified — the
`encode-docs` rename, the embedded format now in `encode-docs`, the `prep` composite —
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

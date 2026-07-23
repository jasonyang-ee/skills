# AGENT SKILLS

[![CI](https://github.com/jasonyang-ee/skills/actions/workflows/ci.yml/badge.svg)](https://github.com/jasonyang-ee/skills/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A personal collection of agent skills for spec-driven development

## INSTALL

Install with the [`skills`](https://www.skills.sh/docs) CLI — it copies the skills into every detected agent (Claude Code, Codex, Cursor, and more).

- Default — install into every detected agent

	```bash
	npx skills add jasonyang-ee/skills
	```

- All skills, global scope, non-interactive

	```bash
	npx skills add jasonyang-ee/skills --all --global --yes
	```

- Target one agent with `-a`

	```bash
	npx skills add jasonyang-ee/skills --all --global --yes -a claude-code
	npx skills add jasonyang-ee/skills --all --global --yes -a codex
	```

### Claude Code plugin

Claude Code can also install straight from the plugin marketplace — no `npx` needed:

```
/plugin marketplace add jasonyang-ee/skills
/plugin install skills@jasonyang-ee
```

## SKILLS

| Skill&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | What it does |
| --- | --- |
| [`setup`](skills/setup/SKILL.md) | Bootstraps `AGENTS.md`, the `CLAUDE.md` import, and minimal missing `CHANGELOG.md`/`SPEC.md` files before the core workflow. |
| [`prep`](skills/prep/SKILL.md) | Turns a request into a research-first `PLAN.md` + `HANDOFF.md`, hands durable facts to `encode-docs`, and reserves the last phase for final verification. |
| [`encode-docs`](skills/encode-docs/SKILL.md) | Owns the format of all three documents and is the only writer of `SPEC.md`, `PLAN.md`, and `HANDOFF.md`. Listed again under Compression. |
| [`review-plan`](skills/review-plan/SKILL.md) | Adversarial senior review that tries to *refute* the spec and plan before implementation. Ends in an explicit go/no-go. |
| [`cook`](skills/cook/SKILL.md) | Executes all remaining `PLAN.md` phases in order as a single main agent by default — verification contract first, self-review before every commit, no sub-agents. Pass a phase such as `F1` to target one phase. |
| [`cater`](skills/cater/SKILL.md) | The parallel alternative: assigns phases to sub-agents through per-phase handoff files, never overlapping their file sets, and reviews each diff before accepting it. |
| [`handoff`](skills/handoff/SKILL.md) | Gathers `HANDOFF.md`, the baton the next cold session reads to know exactly where work stopped and what to watch out for, and hands it to `encode-docs` to write. |
| [`review-code`](skills/review-code/SKILL.md) | Principal-engineer sweep since the last release baseline for correctness, complexity, reuse, and coherence; hands fixes to `prep`. |
| [`garnish`](skills/garnish/SKILL.md) | Verifies a completed plan cycle, then removes short-lived `PLAN.md` and `HANDOFF.md` while preserving `SPEC.md`. |

## FIVE STEPS WORKFLOW

`/setup` bootstraps a repository for the following workflow:

1. **Prep** — Using `/prep` to turn an idea, bug, feature, or expected behavior into an iterative `PLAN.md` and `HANDOFF.md`, while handing durable decisions to `SPEC.md`.
2. **Review the plan** — in a cold session, `review-plan` resolves research questions and refutes the plan until it reaches an explicit GO gate. Repeat as needed.
3. **Work on the plan** — in another cold session, `/cook` executes all remaining phases in order, verifying, committing, and refreshing `HANDOFF.md` after each phase. Pass a phase to target one phase only. Or use `/cater` to dispatch multiple sub-agents in parallel to run `/cook` for phases whose file sets do not overlap.
4. **Garnish** — after all phases pass, `/garnish` routes durable cleanup, then remove short-lived `PLAN.md` and `HANDOFF.md`. Then `SPEC.md` is reviewed and pruned for out of scope spec.
5. **Review the implementation** — `/review-code` to sweep the completed implementation from its release baseline, then send accepted fixes or improvements into the next `/prep` cycle.

The loop is intentionally iterative: step 1 can refine research and the plan, and step 6 can start another prep cycle. The order and safety gates remain mandatory.

Both `cook` and `cater` invoke `handoff` at the end of every session, so the next session starts by reading it. The plan holds the intent; the handoff holds the state.

### Compression

| Skill&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | What it does |
| --- | --- |
| [`encode-docs`](skills/encode-docs/SKILL.md) | The encoding of `SPEC.md`, `PLAN.md`, and `HANDOFF.md` are written in. Loaded by `/prep`, `/review-plan`, `/review-code`, `/handoff`, `/cook`, and `/cater`. |
| [`encode-commit`](skills/encode-commit/SKILL.md) | Generate compressed commits messages. Subject ≤50 chars. |
| [`encode-pr`](skills/encode-pr/SKILL.md) | Generate compressed summary. One line per finding: location, problem, fix. |

## SKILL LOADING STATE MACHINE

| Skill&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Trigger | Reads | Outputs | Co-Loaded |
| --- | --- | --- | --- | --- |
| setup | blank project | AGENTS, CLAUDE, CHANGELOG, SPEC | AGENTS, CLAUDE, CHANGELOG, SPEC | encode-docs |
| prep | new idea | SPEC, PLAN, HANDOFF, BACKLOG, repo | SPEC, PLAN, HANDOFF, BACKLOG | encode-docs, handoff |
| review-plan | end of `prep` | PLAN, SPEC, HANDOFF, web | SPEC, PLAN, HANDOFF | encode-docs |
| cook | end of `prep`, `review-plan` | HANDOFF, PLAN, SPEC, git | SPEC, PLAN, HANDOFF | encode-docs, encode-commit, handoff |
| cater | end of `prep`, `review-plan` | HANDOFF, PLAN, SPEC, git | SPEC, PLAN, HANDOFF | cook, encode-docs, handoff |
| garnish | end of `cook`, `cater` | SPEC, PLAN, HANDOFF, git | PLAN, HANDOFF | encode-docs |
| review-code | end of `garnish` | SPEC, PLAN, HANDOFF, diff, tests | SPEC, PLAN, HANDOFF | prep, encode-docs, handoff |
| handoff | all sessions | git, PLAN, SPEC | HANDOFF | encode-docs |
| encode-docs | all main skills | target doc | SPEC, PLAN, HANDOFF | - |
| encode-header | blank project | SPEC, PLAN, HANDOFF | SPEC, PLAN, HANDOFF | encode-docs |
| encode-commit | auto by `cook`/`handoff` | staged diff | - | - |
| encode-pr | user | PR diff | - | - |

## License

[MIT](LICENSE) for original work. see [NOTICE.md](NOTICE.md) for modified upstream source.

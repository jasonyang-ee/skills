---
name: caveman-help
description: >
  Quick-reference card for every skill in this collection: the caveman
  compression modes, the caveman-encode/spec/build SDD loop, and the
  session skills. One-shot display, not a persistent mode. Trigger:
  /caveman-help, "caveman help", "what caveman commands", "what skills do I
  have", "how do I use these skills".
license: MIT
---

# Caveman Help

Display this card when invoked. One-shot — do NOT change mode, write flag files,
or persist anything. Output in caveman style.

## Two different "caveman"

Most common confusion. They do opposite things:

| Skill | For | Symbols |
|-------|-----|---------|
| **caveman** | Compress ordinary chat replies. Conversational mode. | Avoids `→` — costs a token, saves nothing |
| **caveman-encode** | Encode `SPEC.md` + spec-adjacent writes. | Requires `→ ∴ ∀ ⊥ !` — the SPEC symbol set |

Writing a spec → `caveman-encode`. Talking → `caveman`.

## Modes (caveman skill)

| Mode | Trigger | What change |
|------|---------|-------------|
| **Lite** | `/caveman lite` | Drop filler. Keep sentence structure. |
| **Full** | `/caveman` | Drop articles, filler, pleasantries, hedging. Fragments OK. Default. |
| **Ultra** | `/caveman ultra` | Extreme compression. Bare fragments. Tables over prose. |
| **Wenyan-Lite** | `/caveman wenyan-lite` | Classical Chinese style, light compression. |
| **Wenyan-Full** | `/caveman wenyan` | Full 文言文. Maximum classical terseness. |
| **Wenyan-Ultra** | `/caveman wenyan-ultra` | Extreme. Ancient scholar on a budget. |

Mode stick until changed or session end. Off: "stop caveman" / "normal mode".

## Spec-driven loop

`SPEC.md` = one file, repo root. Format baked into its header — ⊥ FORMAT.md needed.

| Skill | Trigger | What it do |
|-------|---------|-----------|
| **grill** | `/grill` | Interrogate fuzzy idea → §G + §C. Kill bad idea before §T exist. |
| **research** | `/research` | Pull external fact once → §R row + source. ⊥ hallucinate lib behavior. |
| **spec** | `/spec` | Sole mutator of SPEC.md. new / amend / bug: / from-code. Bakes format header. |
| **review** | `/review` | Adversarial senior review. Try refute spec. Ends go / no-go. |
| **build** | `/build` | Plan→execute §T tasks. Test fail → auto-backprop. |
| **check** | `/check` | Read-only drift report. Code vs §V. Writes ⊥. |
| **backprop** | `/backprop` | Bug → root cause → §B row + §V candidate. The loop that learns. |
| **deepen** | `/deepen` | Spare-budget design pass. Shrink interfaces, hide decisions. |

Order: grill → research → spec → review → build → check. backprop fires on any failure.

## Session skills

| Skill | Trigger | What it do |
|-------|---------|-----------|
| **workonplan** | `/workonplan [phase]` | Execute PLAN.md phases, one at a time, single agent, full quality. |
| **handoff** | `/handoff` | Write HANDOFF.md — baton for next cold session. |

workonplan calls handoff at session end. Always.

## Writing skills

| Skill | Trigger | What it do |
|-------|---------|-----------|
| **caveman-commit** | `/caveman-commit` | Terse commit message. Conventional Commits. ≤50 char subject. |
| **caveman-review** | `/caveman-review` | Terse PR review. One line per finding: location, problem, fix. |

## Install

```bash
npx skills add jasonyang-ee/skills
npx skills add jasonyang-ee/skills --list
npx skills add jasonyang-ee/skills --skill spec --skill build -a claude-code
```

## Not here

`caveman-stats` (needs hooks), `cavecrew` (needs subagents), `caveman-compress`
(needs Python) live upstream → https://github.com/JuliusBrussee/caveman

# Contributing

Thanks for taking a look. This repo publishes agent skills — plain Markdown
with YAML frontmatter — so contributing is mostly writing, plus a test suite
that keeps the writing installable.

## Setup

```bash
npm install
npm test
```

Node 20 or newer.

## Adding a skill

Create `skills/<name>/SKILL.md`:

```markdown
---
name: <name>
description: |
  What it does and, just as importantly, when to use it. Include the phrases a
  user would actually say, since this text is how an agent decides to load the
  skill.
license: MIT
---

# <name> — one-line purpose

...
```

The tests enforce the [Agent Skills specification](https://agentskills.io/specification.md):

- `name` must match the directory name, be 1–64 characters, and use only
  lowercase letters, numbers, and single hyphens.
- `description` must be present and at most 1024 characters. It is the only
  part of your skill an agent reads at startup, so spend the words there.
- Keep the body under 500 lines. It loads in full once the skill activates;
  move long reference material into `references/` alongside `SKILL.md`.

No registry file to update — `skills/` is scanned directly.

## Skills must stay portable

This is a public repo, and these skills get installed into codebases that look
nothing like yours. A skill must not hardcode one project's conventions:
directory names, type names, log formats, branch names, or a specific test
script. Say "find the project's test command" rather than naming one.

`tests/repo-hygiene.test.mjs` enforces this with a denylist of references that
leaked in from the skills' original private home. If you are moving a skill in
from elsewhere, read it line by line first.

## Style

- Write the body for an agent, not a human reader: imperative, concrete, and
  specific about what is forbidden.
- Prefer a rule that can be checked ("body ≤ 500 lines") over one that cannot
  ("keep it short").
- `SPEC.md` and `AGENTS.md` use caveman encoding; `README.md`, this file, and
  commit messages use normal English. The encoding and section schema live in
  the [`spec` skill](skills/spec/SKILL.md) under `## FORMAT`, and every
  `SPEC.md` repeats them in its own baked header.

## Pull requests

1. Branch off `main`.
2. `npm test` must pass. CI runs Node 20, 22, and 24 on Linux, plus Node 22 on
   Windows.
3. Add a `CHANGELOG.md` entry under `## [Unreleased]`.
4. Describe what changed and why — the why is the part reviewers can't recover
   from the diff.

## Reporting problems

Open an [issue](https://github.com/jasonyang-ee/skills/issues). If a skill
misbehaved, include the agent you used, the skill, and what you expected it to
do instead — the fix is usually a wording change to `SKILL.md`.

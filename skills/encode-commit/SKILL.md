---
name: encode-commit
description: >
  Ultra-compressed commit message generator. Cuts noise from commit messages while preserving
  intent and reasoning. Conventional Commits format. Subject ≤50 chars, body only when "why"
  isn't obvious. Use when user says "write a commit", "commit message", "generate commit",
  "/commit", or invokes /encode-commit. Auto-triggers when staging changes.
---

Write commit messages terse and exact. Conventional Commits format. No fluff. Why over what.

## Rules

**Subject line:**
- `<type>(<scope>): <imperative summary>` — `<scope>` optional
- Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `build`, `ci`, `style`, `revert`
- Imperative mood: "add", "fix", "remove" — not "added", "adds", "adding"
- ≤50 chars when possible, hard cap 72
- No trailing period
- Match project convention for capitalization after the colon

**Body (only if needed):**
- Skip entirely when subject is self-explanatory
- Add body only for: non-obvious *why*, breaking changes, migration notes, linked issues
- Wrap at 72 chars
- Bullets `-` not `*`
- Reference issues/PRs at end: `Closes #42`, `Refs #17`

**What NEVER goes in:**
- "This commit does X", "I", "we", "now", "currently" — the diff says what
- "As requested by..." — use Co-authored-by trailer
- "Generated with Claude Code" or any AI attribution — unless the user's own rule requires an `Assisted-by`/AI-attribution trailer, then add it as a trailer
- Emoji (unless project convention requires)
- Restating the file name when scope already says it
- Encoding symbols (`→ ∴ ∀ ⊥ ∃ §`) — write the English word instead
- Plan or spec identifiers (`F1`, `T77`, `V77`, `R28`, `B5`) carrying the
  meaning — see below

## Examples

Diff: new endpoint for user profile with body explaining the why
- ❌ "feat: add a new endpoint to get user profile information from the database"
- ✅
  ```
  feat(api): add GET /users/:id/profile

  Mobile client needs profile data without the full user payload
  to reduce LTE bandwidth on cold-launch screens.

  Closes #128
  ```

Diff: breaking API change
- ✅
  ```
  feat(api)!: rename /v1/orders to /v1/checkout

  BREAKING CHANGE: clients on /v1/orders must migrate to /v1/checkout
  before 2026-06-01. Old route returns 410 after that date.
  ```

## Expanding plan references

`SPEC.md` and `PLAN.md` are working files. They get purged when a cycle
closes; the git log outlives them. A reader running `git log` a year from now
has the diff and the message, nothing else. An identifier that pointed into a
deleted file is a dead reference, and it was never readable to anyone outside
that session anyway.

So expand every identifier into what it stood for. Say the phase did, not
which phase it was. Name the invariant's rule, not its number. Cite an
identifier only as a bare cross-reference alongside the meaning, never as the
carrier of it.

❌
```
feat(F2): implement T80 per §R30

Satisfies V81 → V83. See §T.
```

✅
```
refactor(skills): rename seven skills to the new vocabulary

Renames the skill directories and every cross-reference between them. The
first three names are reused across different skills, so the sweep runs in
a fixed order and each reference was re-pointed by what it meant rather
than by matching the string.
```

The scope is the component the diff touched, not the phase that touched it.

## Auto-Clarity

Always include body for: breaking changes, security fixes, data migrations, anything reverting a prior commit. Never compress these into subject-only — future debuggers need the context.

## Boundaries

Only generates the commit message. Does not run `git commit`, does not stage files, does not amend. Output the message as a code block ready to paste. "stop encode-commit" or "normal mode": revert to verbose commit style.

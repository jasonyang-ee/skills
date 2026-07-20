---
name: review-code
description: |
  Principal-engineer sweep of implementation quality since the latest release
  tag or explicit release commit: a security check plus evidence-based audit
  of full-picture code coherence, complexity, reuse, and logic correctness.
  Invokes prep to turn accepted fixes and improvements into a research-first
  PLAN.md and HANDOFF.md. Triggers after cook completes a plan or when
  the user asks for an implementation review, code-quality sweep, security
  check, infosec sweep, or post-release audit.
license: MIT
---

# review-code — post-release code sweep → prep

This is a read-only implementation review. It finds risks and improvement
opportunities across the whole change surface, then hands the result to
`prep`. It does not edit code, `SPEC.md`, `PLAN.md`, or `HANDOFF.md` directly.

## When to use

Use after all phases in a `PLAN.md` finish and before starting another round.
Use it for a post-release or post-tag audit when the implementation needs a
principal-engineer coherence check.

## Baseline

Resolve the comparison point before reading the diff:

1. Use the latest reachable tag matching `v<major>.<minor>.<patch>`.
2. If no such tag exists, use the explicit release commit supplied by the user
   or recorded in repository release documentation.
3. If neither exists, stop and ask for a baseline. Do not silently use `HEAD~1`
   or an arbitrary branch tip.

Record baseline ref, `HEAD`, branch, and dirty-tree state in the review. Review
the baseline-to-HEAD diff, then inspect surrounding callers and shared modules
needed to judge the full picture.

## Load

1. Read `SPEC.md` sections `§G`, `§C`, `§I`, `§R`, `§V`, and `§T`.
2. Read `PLAN.md` and `HANDOFF.md` when present; confirm the plan is complete
   before treating this as a post-plan review.
3. Read repository guidance, tests, changed files, callers, and adjacent
   abstractions in full.
4. Run the documented verification command and record its exact result. A red
   baseline is a finding, not evidence that the new code is correct.

## Review dimensions

For every finding, cite `file:line`, test name, commit, or sourced reference.
Flag `[unverified]` when evidence is unavailable.

- **Correctness** — wrong states, boundary cases, error paths, ordering,
  partial failure, stale assumptions, and violated `§V`/`§I` contracts.
- **Complexity** — unnecessary branches, indirection, state, duplication, or
  abstraction whose cost exceeds its value.
- **Reuse** — logic reimplemented instead of using an existing helper or
  shared boundary; parallel paths that can drift.
- **Coherence** — naming, interfaces, ownership, error policy, test strategy,
  and module boundaries remain consistent across the codebase.
- **Verification** — changed behavior has focused tests, regression coverage,
  and a full-suite result appropriate to its blast radius.
- **Security** — secrets or credentials in the diff, injection risks,
  untrusted input paths, authn/authz changes, and dependency or
  supply-chain deltas since baseline.

## Review procedure

1. Inventory baseline-to-HEAD files and classify behavior vs mechanical edits.
2. Trace changed entrypoints through callers, shared helpers, persistence, and
   error paths; inspect both the happy path and failure path.
3. Search for duplicate logic and near-identical abstractions before proposing
   new helpers. Prefer reducing concepts and hiding decisions at boundaries.
4. Test or reason through edge cases; run focused tests, then the full oracle.
5. Classify each finding:
   - `BLOCK` — correctness, safety, or release-level defect; fix before next
     plan cycle.
   - `HARDEN` — invariant, test, simplification, or reuse improvement that
     prevents recurrence or lowers complexity.
   - `NOTE` — useful observation with no required action.
6. Produce the gate below. Never report “looks good” without listing the scope,
   commands, and evidence reviewed.

## Output and prep handoff

Output:

```md
## implementation review
baseline: <tag | explicit commit>
head: <sha>
scope: <files / modules / behavior>
tests: <command> → <green | exact failures>

BLOCK: <count>
- <file:line> — <claim> — <impact> — <fix direction>

HARDEN: <count>
- <file:line> — <complexity/reuse/coherence claim> — <evidence> — <improvement>

NOTE: <count>
- <evidence> — <observation>

gate: <GO | NO-GO>
```

After the report, invoke `prep` with the accepted `BLOCK` and `HARDEN`
findings, evidence, baseline, and gate. `prep` must create the next
research-first `PLAN.md` + `HANDOFF.md` and hand durable changes to `encode-docs`.
If gate is `NO-GO`, the prep plan starts with defect remediation. If `GO`, it
starts with the selected simplification or improvement work, or records that
no implementation work is needed.

## Report output

Always on, for every report this skill produces. It does not drift back to
prose after a long session, and it is not something the user has to ask for.

Drop articles, filler (just/really/basically/simply), pleasantries, and
hedging. Fragments are fine. Prefer short synonyms — "fix", not "implement a
solution for". Do not narrate tool calls. No decorative tables or emoji. Use
standard well-known acronyms (API, DB, HTTP), but never invent new ones
(cfg/impl/req): the tokenizer splits an invented abbreviation into the same
pieces as the full word, so it saves nothing and costs the reader a decode.
No causal arrows in report prose for the same reason — spell out the word.
Do not restate evidence the gate block already carries.

**Carve-out — these stay explicit, uncompressed prose:**

- Security findings. A compressed vulnerability report is a missed
  vulnerability.
- Warnings about irreversible or destructive actions.
- Every `BLOCK` item.
- `file:line` evidence, quoted error strings, and code. Never reword these.

Compression that eats a finding has destroyed the thing the report exists to
deliver. When terseness would make an order-sensitive sequence or a risk
ambiguous, write the full sentence.

## Boundaries

- Do not edit implementation, tests, `SPEC.md`, `PLAN.md`, or `HANDOFF.md`.
- Do not invent a baseline.
- Do not prescribe refactors without tracing callers and citing evidence.
- Do not treat green tests as proof of correctness when coverage is absent.
- Do not skip the `prep` handoff after the review report.

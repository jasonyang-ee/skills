---
name: review-plan
description: |
  Find gaps in PLAN.md phases before any implementation starts — plan gap
  finding backed by research with latest web data. Opens with a research
  gate — if open unknowns remain, runs targeted research against current
  primary sources, records sourced findings in §R via encode-docs, and tightens
  later phases. Then refutes phase ordering, verification contracts, §T
  mappings, and phase dependencies. Hands PLAN.md, HANDOFF.md, and §V
  updates to encode-docs, and ends with an explicit GO / NO-GO
  gate. Iterative: each round can reduce the number of needed research
  phases until none remain. Triggers: "/review-plan".
---

# review-plan — validate PLAN.md before cook

A cold session that reads the plan and the spec together, resolves any
remaining unknowns through research, and decides whether the work is safe
to hand to `cook`. Every finding is corrected before the gate closes.

## WHEN

Before the first `/cook`, or after a previous `/review-plan` returns
NO-GO.

Skip when there are no `?` items, all phase contracts are named, and the
previous `/review-plan` already returned GO.

## LOAD

1. Load `encode-docs` — PLAN.md and HANDOFF.md use that encoding.
2. Read `PLAN.md` in full: goal, ground rules, phase order table, and every
   phase section.
3. Read `SPEC.md`: §G, §C, §I, §R, §V. Note which `PLAN.md` `§T` rows map to
   which phases.
4. Read `HANDOFF.md` if present: current next pointer and watchouts.
5. Count open research phases: phases with unresolved `?` items or an
   explicit research goal. Record as "research phases remaining: N".

## RESEARCH GATE

Before reviewing plan structure, resolve open unknowns.

For each open research phase in order:

1. List every `?` item in the phase.
2. Research them: read codebase modules, existing tests, and current
   primary web sources (official docs, changelogs, release notes) —
   never trust model memory for versions, APIs, or external behavior.
   Every finding must cite a source (file:line or URL) and carry the
   date it was checked. Items that cannot be resolved stay `?` with a
   note on why.
3. Record sourced findings in `§R` by invoking `encode-docs`.
4. Rewrite the affected phase steps with confirmed facts; remove guesses.
5. If all `?` items in this phase are resolved with no new unknowns, mark
   it as a removal candidate. Note it in the gate output so the user can
   confirm removal on the next `/prep` cycle.

Skip this gate entirely when no `?` items remain in any phase.

## REFUTE THE PLAN

Attack the plan on these axes. Every finding cites evidence or is tagged
`[unverified]` and down-ranked to NOTE.

- **Phase ordering** — does each phase depend on its predecessor's output?
- **Verification contracts** — does every phase name the exact test file
  and case that proves each touched `§V`? "add tests" without a file name
  is a BLOCK.
- **§T mapping** — does every phase carry exactly one `task: T<n>` that
  exists in `PLAN.md §T` and is not already `x`? Duplicate or missing
  mappings are a BLOCK.
- **Phase gates** — are all preconditions achievable? Does any gate depend
  on elapsed time, external approval, or a soak period?
- **Blast radius** — does any phase touch shared modules, auth, data
  migrations, or public `§I` surfaces? Does any step handle secrets,
  untrusted input, or injection-prone surfaces? Flag for an extra safety
  step in that phase's verification contract.
- **Altitude** — are steps concrete enough to finish in one session?
  Unverifiable steps are a BLOCK.
- **Drift** — is plan diviating from `SPEC.md`? Diviation is a DIVERGENCE.

## FINDING TAXONOMY & GATE

Shared verbatim with the paired review skill (`review-plan` ⟷ `review-code`):
identical categories and identical GO / NO-GO rule. Each skill keeps its own
review axes and scope; only this taxonomy and gate are shared.

Every finding is exactly one category — evidence → claim → category:

- **BLOCK** — a correctness, safety, or release-level defect. A security finding is always BLOCK. Action: fix before proceeding. Gate: any open BLOCK forces NO-GO.
- **DIVERGENCE** — reality (the code or the plan) has drifted from `SPEC.md`. Action: resolve one way — change the work to match `SPEC.md`, or amend `SPEC.md` through `encode-docs`. Gate: any open DIVERGENCE forces NO-GO; once resolved it no longer holds the gate.
- **UNKNOWN** (`?`) — an open question that needs current primary-source research, never model memory. Action: resolve it with a cited source and the date checked, or record it as a non-blocking `?` with the reason it cannot be resolved yet. Gate: any open blocking `?` forces NO-GO.
- **HARDEN** — an invariant, test, simplification, or reuse improvement that lowers complexity or prevents recurrence. Action: carry it to the next `prep`. Gate: never holds the gate.
- **NOTE** — an observation with no required action. A finding with no evidence is down-ranked here and tagged `[unverified]`. Action: carry it as a note. Gate: never holds the gate.

GO / NO-GO — exhaustive, never a shrug:

- **NO-GO** if any open BLOCK, any open DIVERGENCE, or any open blocking `?` (UNKNOWN) remains.
- **GO** otherwise. HARDEN and NOTE never hold the gate — they carry to the next `prep`.

## UPDATE

1. Hand new `§R` rows and proposed `§V` additions to `encode-docs`.
2. Rewrite affected `PLAN.md` phases with resolved facts and sharper
   contracts; hand the revised `PLAN.md` to `encode-docs`, which writes it at
   repo root.
3. Hand `encode-docs` the `HANDOFF.md` next-pointer and watchout updates. If a
   research phase resolved cleanly, add a watchout: "on next `/prep`, remove
   F<n> — all unknowns resolved."

## GATE

```
## review-plan verdict
research phases remaining: <n>
BLOCK: <count>
- <phase>: <finding> — <fix required>
DIVERGENCE: <count>
- <phase>: <SPEC.md §V/§I claim vs plan> — <resolution: fix plan | amend SPEC>
UNKNOWN: <count>
- <phase>: <? item> — <source + date | unresolved reason>
HARDEN: <count>
- <phase>: <finding> — <improvement>
NOTE: <count>
- <evidence> — <observation>
gate: <GO | NO-GO>
next: /cook | /review-plan after fixes
```

Decide GO / NO-GO by the exhaustive rule in FINDING TAXONOMY & GATE — never a shrug.

## REPORT OUTPUT

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

- Security findings.
- Warnings about irreversible or destructive actions.
- Every `BLOCK` item.
- `file:line` evidence, quoted error strings, and code. Never reword these.

Compression that eats a finding has destroyed the thing the report exists to
deliver. When terseness would make an order-sensitive sequence or a risk
ambiguous, write the full sentence.

## BOUNDARIES

- Do not write code.
- Do not mark `§T` rows done or alter `§T` status.
- Do not skip the research gate when `?` items exist.
- Do not revise `PLAN.md` without a matching `HANDOFF.md` update; hand both to `encode-docs`.
- `encode-docs` is the sole mutator of `SPEC.md`; hand findings, do not write directly.

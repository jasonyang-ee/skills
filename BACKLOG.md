# BACKLOG — deferred request (queued while PLAN.md work-in-progress)

Deferred per §V27 defer-mode: a `/prep` arrived while the current cycle's `PLAN.md` (HANDOFF-header simplification + BACKLOG read-gate, F1-F4) is `work-in-progress`. Not clobbering the live plan. Pick this up in the NEXT `/prep` cycle, AFTER the current cycle closes via `/garnish`.

## Why sequence after the current cycle (ordering dependency)
The current cycle's F2 edits the HANDOFF baked-header text that lives INSIDE `skills/encode-docs/SKILL.md` `## BAKED HEADERS`. This deferred request MOVES that whole section out to a new skill. Doing them concurrently would collide on the same block. Let the current cycle simplify the HANDOFF baked header first; then this cycle relocates the already-simplified `## BAKED HEADERS` section. So: finish current cycle → `/garnish` → then `/prep` this backlog.

## Request A — extract `## BAKED HEADERS` into a new `encode-header` support skill
Goal: move the `## BAKED HEADERS` section (the three verbatim baked-header templates for SPEC.md / PLAN.md / HANDOFF.md) out of `skills/encode-docs/SKILL.md` into a NEW support skill `skills/encode-header/SKILL.md`. Rationale: the baked headers are one-time-use content (needed only when a doc is created fresh, a header is missing, or a header format update is requested), yet `encode-docs` is almost-always-loaded (§C11) and pays to carry ~50 lines of template on every load. Extracting shrinks the hot-path skill.

Details:
- New skill: `skills/encode-header/SKILL.md`. Frontmatter `name: encode-header` (== dir, §V2), a `description` ≤1024 (§V3), body ≤500 lines (§V4). Body = the three baked-header templates + guidance on when/how they are emitted verbatim.
- In `encode-docs`, replace the removed `## BAKED HEADERS` body with a ONE-LINE hint that triggers `encode-header` when a baked header is missing or the user requests a header update/format change. (User's explicit ask: "Leave a one line hint to trigger `encode-header` if header is missing or user request an update.")
- `encode-docs` stays the SOLE WRITER/mutator of the 3 docs; `encode-header` is a content-supplier (like `prep`/`handoff` supply content) — it provides the header template, `encode-docs` still performs the write. Confirm this keeps §V16 (sole mutator) intact.

## Request B — portability: strip repo-specific SPEC-id citations from skill bodies
Principle (user): "We should not mention our spec in those skills which should be portable." A generic user who installs these skills has no `§V16` in their repo.
- Distinction to preserve: the GENERIC format vocabulary (`§G/§C/§I/§R/§V/§T` as the spec-driven-workflow doc mechanism) is inherent to what these skills DO and stays. Only SPECIFIC numbered citations that point at THIS repo's rows (e.g. `(§V16)`, `(§V20)`) are non-portable and should be removed or reworded to describe the behavior self-containedly.
- Already done (uncommitted, user's working tree): `(§V16)` removed from `skills/encode-docs/SKILL.md` line 10 ("...clobbering each other."). Also reflowed the `description:` block. NOTE: this uncommitted edit sits in the same file the current cycle's F2 will touch — either commit it separately or let the current cycle's encode-docs commit sweep it up.
- Next-cycle task: audit ALL `skills/**/SKILL.md` bodies for specific numbered SPEC-row citations `(§V<n>)`/`(§C<n>)`/`(§I<n>)` and remove/reword them; keep generic `§V`-as-mechanism references. Grep seed: `§V[0-9]`, `§C[0-9]`, `§I[0-9]`, `§R[0-9]` across `skills/`.

## Research / touch-points the next /prep must confirm (do not treat as decided)
- SPEC reconciliation: does moving header emission touch §V16 ("sole mutator and OWNER of ... formats") and §V20 ("∀ 3 encoded docs open with own baked header emitted verbatim by `encode-docs`")? Likely a light reword: encode-docs emits header VIA encode-header; encode-docs remains sole writer. Decide edit-in-place vs leave.
- `SPEC.md §G` "Helpers:" list and `## Skills` support line name the support skills (`encode-docs`, `handoff`, `encode-commit`, `encode-pr`) — add `encode-header`.
- `AGENTS.md`: top line "11 skills: own (...)" → 12 skills, add `encode-header`; `## Skills` support list → add `encode-header`; `## AI File Purpose` if it references header ownership.
- `skills/setup/SKILL.md`: AGENTS template `## Skills` support line → add `encode-header`.
- `CHANGELOG.md`: `## [Unreleased]` entry; note prior "11 skills" prose (CHANGELOG.md line ~391) is historical, do not rewrite history.
- `NOTICE.md`: `encode-header` is ORIGINAL (derived from original `encode-docs`), not vendored — confirm whether an original-skill provenance row is expected.
- Plugin/marketplace: `.claude-plugin/marketplace.json` root plugin auto-scans `skills/` (§I5/§R7) → new skill auto-included; confirm no marketplace edit needed.
- Tests: `tests/skill-contract.test.mjs` asserts `skills.length > 0` (no hard count) → new skill is auto-picked-up by §V1-5 contract tests; confirm `encode-header` passes frontmatter/name/desc/body-line checks. `npm test` should go from 7/7 to still-green (new skill adds coverage, not failures).
- Trigger wording: `encode-header`'s `description` must state what + when-to-use (auto-invocation driver, §R5) — "emit/refresh the baked header for SPEC/PLAN/HANDOFF when a header is missing or a format update is requested."

## Suggested phase shape for the next cycle
F1 research (confirm the §V16/§V20 reconciliation + all touch-points above) → F2 create `encode-header` skill + move `## BAKED HEADERS` + leave one-line trigger hint in `encode-docs` → F3 portability audit (strip specific `(§V<n>)` citations across `skills/**`) + roster/doc updates (AGENTS/SPEC/setup/CHANGELOG/NOTICE) → F4 final verify (`npm test` green, §V16/§V20 HOLD, new skill contract-compliant, no repo-specific citation left, roster count consistent).

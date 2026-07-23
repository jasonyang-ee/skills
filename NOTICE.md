# Third-Party Notices

This repository is modified skills from other projects. Their original copyright and
permission notices are reproduced below, as the MIT License requires. Nothing
here supersedes the terms of those licenses.

## Source

- JuliusBrussee/cavekit
  
  <https://github.com/JuliusBrussee/cavekit>

- JuliusBrussee/caveman

  https://github.com/JuliusBrussee/caveman

## Modifications:

| Skill in this repo | Upstream name | Modified |
| --- | --- | --- |
| `skills/encode-docs/` | `caveman` + `spec` + `backprop` | Yes — these two upstream skills are merged into one here. Renamed to `encode-docs`. The SPEC format is embedded in the skill and baked as a header into generated files, removing the per-project `FORMAT.md` dependency; the skill accepts `prep` planning handoff plus `encode-docs bug:` in place of a standalone backprop skill; and it now carries a tailored section set and its own baked header for `PLAN.md` and `HANDOFF.md` as well as `SPEC.md`. |
| `skills/encode-header/` | `caveman` + `spec` | Yes — the three baked document headers were extracted out of `encode-docs` into their own skill so the header text loads only when a header is actually written. The `SPEC.md` header descends from the same upstream spec-format derivation recorded for `encode-docs` above; the `PLAN.md` and `HANDOFF.md` headers are original to this repository. |
| `skills/prep/` | `grill` + `research` + `check` | Yes — new composite planning skill derived from cavekit's idea refinement, sourced research, and final drift-check flows; adapted to draft `PLAN.md` + `HANDOFF.md` and hand durable updates to `encode-docs`. |
| `skills/review-plan/` | `review` | Yes — renamed to `review-plan` to distinguish spec/plan review from post-implementation review. |
| `skills/encode-commit/` | `caveman-commit` | Yes — renamed from `caveman-commit`; added rules barring encoding symbols and plan or spec identifiers from generated commit messages, with guidance on expanding those identifiers into plain English for readers who do not have the plan files; example markers changed from tick and cross emoji to the words good and bad. |
| `skills/encode-pr/` | `caveman-review` | Yes — renamed to `encode-pr` to better reflect its scope (PR review comments); severity prefixes and example markers changed from emoji to plain words, keeping the same labels. |

```
MIT License

Copyright (c) 2026 Julius Brussee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
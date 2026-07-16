# Third-Party Notices

This repository vendors skills from other projects. Their original copyright and
permission notices are reproduced below, as the MIT License requires. Nothing
here supersedes the terms of those licenses.

## JuliusBrussee/cavekit

<https://github.com/JuliusBrussee/cavekit>

Vendored skills:

| Skill in this repo | Upstream name | Modified |
| --- | --- | --- |
| `skills/caveman-encode/` | `caveman` | Yes — renamed to `caveman-encode` to avoid a name collision with the conversational `caveman` skill from JuliusBrussee/caveman. Frontmatter and triggers updated for `cook` / `workonplan` plan files accordingly. |
| `skills/spec/` | `spec` | Yes — the SPEC format is now embedded in the skill and baked as a header into generated `SPEC.md` files, removing the per-project `FORMAT.md` dependency, and the skill now accepts `cook` planning handoff plus `/spec bug:` in place of a standalone backprop skill. |
| `skills/cook/` | `grill` + `research` + `check` | Yes — new composite planning skill derived from cavekit's idea refinement, sourced research, and final drift-check flows; adapted to draft `PLAN.md` + `HANDOFF.md` and hand durable updates to `spec`. |
| `skills/review/` | `review` | No |

The `FORMAT.md` schema embedded in `skills/spec/SKILL.md` is also derived from
cavekit's `FORMAT.md`.

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

## JuliusBrussee/caveman

<https://github.com/JuliusBrussee/caveman>

Vendored skills:

| Skill in this repo | Upstream name | Modified |
| --- | --- | --- |
| `skills/caveman/` | `caveman` | Yes — description clarified to point spec work at `caveman-encode`; no behavioral change. |
| `skills/caveman-commit/` | `caveman-commit` | No |
| `skills/caveman-pr/` | `caveman-review` | Yes — renamed to `caveman-pr` to better reflect its scope (PR review comments). |
| `skills/caveman-help/` | `caveman-help` | Rewritten for this collection's skill roster; structure and style follow the original. |

Not vendored, and still available upstream:

- `caveman-stats` — delivered by `hooks/caveman-stats.js`; a no-op without that
  hook installed, which `npx skills add` does not do.
- `cavecrew` — dispatches the `cavecrew-*` subagents in `agents/`, which are not
  installable as skills.
- `caveman-compress` — requires Python 3 for its bundled `scripts/`; this repo
  is markdown-only.

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

## Original work

`skills/handoff/` and `skills/workonplan/` are original to this repository and
are covered by the root [LICENSE](LICENSE).

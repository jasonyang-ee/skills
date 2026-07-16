import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { REPO_ROOT, loadSkills } from './helpers.mjs';

/**
 * Skills vendored or derived from JuliusBrussee/cavekit and JuliusBrussee/caveman.
 * MIT requires the copyright and permission notice travel with the copies, so a
 * README credit alone is not enough — NOTICE.md must name every one of these.
 */
const VENDORED = [
  'caveman',
  'caveman-commit',
  'caveman-encode',
  'caveman-pr',
  'cook',
  'review-plan',
  'spec',
];

const notice = existsSync(join(REPO_ROOT, 'NOTICE.md'))
  ? readFileSync(join(REPO_ROOT, 'NOTICE.md'), 'utf8')
  : '';

describe('vendored skills are attributed', () => {
  // V15
  it('ships a NOTICE.md', () => {
    assert.ok(notice.length > 0, 'NOTICE.md missing — MIT requires the notice travel with copies');
  });

  // V16 — the permission notice, not just a credit line.
  it('reproduces the upstream copyright and permission notice', () => {
    assert.match(notice, /Copyright \(c\) 2026 Julius Brussee/);
    assert.match(notice, /The above copyright notice and this permission notice shall be included/);
  });

  // V17 — a new vendored skill with no NOTICE row is a license violation.
  for (const name of VENDORED) {
    it(`NOTICE.md accounts for ${name}`, () => {
      assert.match(notice, new RegExp(`skills/${name}/`), `add a NOTICE.md row for skills/${name}/`);
    });
  }
});

describe('original skills are accounted for', () => {
  // V39 — the vendored rows above are enforced, but the Original work roster
  // was not, so an own skill could be left out with nothing failing. Derived
  // from disk: every shipped skill is either vendored or original.
  it('NOTICE.md names every non-vendored skill as original work', () => {
    const original = notice.slice(notice.indexOf('## Original work'));
    assert.ok(original.length > 0, 'NOTICE.md has no Original work section');
    const missing = loadSkills()
      .map((skill) => skill.dirName)
      .filter((name) => !VENDORED.includes(name))
      .filter((name) => !original.includes(`skills/${name}/`));
    assert.deepEqual(missing, [], `NOTICE.md Original work omits: ${missing.join(', ')}`);
  });
});

describe('caveman and caveman-encode stay distinct', () => {
  const byName = new Map(loadSkills().map((s) => [s.dirName, s]));

  // V18 — these two contradict each other on the symbol set. If either stops
  // pointing at the other, an agent will load the wrong one for SPEC.md writes
  // and silently drop the symbols FORMAT requires.
  it('caveman points spec work at caveman-encode', () => {
    assert.match(byName.get('caveman').raw, /caveman-encode/);
  });

  it('caveman-encode distinguishes itself from caveman', () => {
    assert.match(byName.get('caveman-encode').raw, /\bcaveman\b/);
  });

  it('caveman-encode keeps the SPEC symbol set', () => {
    for (const symbol of ['→', '∴', '∀', '⊥']) {
      assert.ok(byName.get('caveman-encode').raw.includes(symbol), `missing symbol ${symbol}`);
    }
  });
});

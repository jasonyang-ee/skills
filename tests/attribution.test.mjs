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
  'encode-commit',
  'encode-docs',
  'encode-pr',
  'prep',
  'review-plan',
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

  // V17, V39 — every shipped skill is either vendored or original, and both
  // sides are enforced. A vendored skill with no row is a license violation;
  // an own skill missing from the Original work roster used to fail silently.
  it('accounts for every shipped skill, vendored or original', () => {
    const missingVendored = VENDORED.filter((name) => !notice.includes(`skills/${name}/`));
    assert.deepEqual(missingVendored, [], `NOTICE.md needs rows for: ${missingVendored.join(', ')}`);

    const original = notice.slice(notice.indexOf('## Original work'));
    assert.ok(original.length > 0, 'NOTICE.md has no Original work section');
    const missingOriginal = loadSkills()
      .map((skill) => skill.dirName)
      .filter((name) => !VENDORED.includes(name))
      .filter((name) => !original.includes(`skills/${name}/`));
    assert.deepEqual(missingOriginal, [], `NOTICE.md Original work omits: ${missingOriginal.join(', ')}`);
  });

  // The symbol set the encoder exists to apply. V18 was retired once the
  // conversational skill was deleted, but this half still matters.
  it('keeps the SPEC symbol set in the encoder', () => {
    const encoder = loadSkills().find((s) => s.dirName === 'encode-docs');
    assert.ok(encoder, 'encode-docs skill is missing');
    const missing = ['→', '∴', '∀', '⊥'].filter((symbol) => !encoder.raw.includes(symbol));
    assert.deepEqual(missing, [], `encode-docs dropped symbols: ${missing.join(' ')}`);
  });
});

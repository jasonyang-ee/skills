import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { collapse, loadSkills } from './helpers.mjs';

// Limits are fixed by the Agent Skills specification.
// https://agentskills.io/specification.md
const NAME_MAX = 64;
const DESCRIPTION_MAX = 1024;
const BODY_MAX_LINES = 500;
const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const skills = loadSkills();

/**
 * One case per rule, looping over every skill inside and reporting all
 * offenders at once, rather than one case per skill per rule. A per-skill
 * describe multiplies the suite by the roster and stops on the first failing
 * skill; this shape names every violation in a single run and keeps the
 * count flat as skills are added.
 */
describe('every skill satisfies the Agent Skills contract', () => {
  const offenders = (predicate) => skills.filter(predicate).map((s) => s.dirName);

  it('ships at least one skill with parseable frontmatter', () => {
    assert.ok(skills.length > 0, 'no skills found under skills/');
    // V1
    const unparseable = offenders((s) => s.parsed === null || typeof s.parsed.data !== 'object');
    assert.deepEqual(unparseable, [], `frontmatter missing or malformed: ${unparseable.join(', ')}`);
  });

  // V1 — the skills CLI silently drops a skill whose name or description
  // is absent or not a string, so these two failures are invisible without it.
  it('declares name and description as non-empty strings', () => {
    const bad = offenders(({ parsed }) => {
      const { name, description } = parsed.data;
      return typeof name !== 'string' || collapse(name).length === 0
        || typeof description !== 'string' || collapse(description).length === 0;
    });
    assert.deepEqual(bad, [], `name or description missing/empty: ${bad.join(', ')}`);
  });

  // V2
  it('names every skill legally, uniquely, and after its directory', () => {
    const mismatched = offenders((s) => s.parsed.data.name !== s.dirName);
    assert.deepEqual(mismatched, [], `name does not match directory: ${mismatched.join(', ')}`);

    const illegal = offenders((s) => {
      const { name } = s.parsed.data;
      return name.length > NAME_MAX || !NAME_PATTERN.test(name);
    });
    assert.deepEqual(illegal, [], `name is over ${NAME_MAX} chars or not spec-legal: ${illegal.join(', ')}`);

    const names = skills.map((s) => s.parsed.data.name);
    assert.equal(new Set(names).size, names.length, `duplicate skill names: ${names.join(', ')}`);
  });

  // V3 — name and description are the only metadata loaded at startup, so
  // this limit is what keeps the roster affordable to have in context.
  it('keeps every description within the spec limit', () => {
    const over = skills
      .map((s) => [s.dirName, collapse(s.parsed.data.description).length])
      .filter(([, length]) => length > DESCRIPTION_MAX)
      .map(([name, length]) => `${name} (${length})`);
    assert.deepEqual(over, [], `description over ${DESCRIPTION_MAX} chars: ${over.join(', ')}`);
  });

  // V4 — progressive disclosure: the body loads in full on activation.
  it('keeps every body under the recommended length', () => {
    const over = skills
      .map((s) => [s.dirName, s.parsed.body.split('\n').length])
      .filter(([, lines]) => lines > BODY_MAX_LINES)
      .map(([name, lines]) => `${name} (${lines})`);
    assert.deepEqual(over, [], `body over ${BODY_MAX_LINES} lines: ${over.join(', ')}`);
  });
});

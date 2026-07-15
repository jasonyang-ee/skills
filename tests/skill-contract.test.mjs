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

describe('skills/ contains discoverable skills', () => {
  it('finds at least one skill', () => {
    assert.ok(skills.length > 0, 'no skills found under skills/');
  });

  // V7
  it('gives every skill a unique name', () => {
    const names = skills.map((s) => s.parsed?.data?.name);
    assert.equal(new Set(names).size, names.length, `duplicate skill names: ${names.join(', ')}`);
  });
});

for (const skill of skills) {
  describe(`skills/${skill.dirName}/SKILL.md`, () => {
    // V1
    it('has parseable YAML frontmatter', () => {
      assert.notEqual(skill.parsed, null, 'missing or malformed --- frontmatter block');
      assert.equal(typeof skill.parsed.data, 'object', 'frontmatter did not parse to a mapping');
    });

    // V2 — the skills CLI drops any skill whose name is absent or non-string.
    it('declares name as a non-empty string', () => {
      const { name } = skill.parsed.data;
      assert.equal(typeof name, 'string', 'name must be a string');
      assert.ok(collapse(name).length > 0, 'name must not be empty');
    });

    // V3 — same contract as name; without it the skill is invisible to the CLI.
    it('declares description as a non-empty string', () => {
      const { description } = skill.parsed.data;
      assert.equal(typeof description, 'string', 'description must be a string');
      assert.ok(collapse(description).length > 0, 'description must not be empty');
    });

    // V4
    it('matches name to its parent directory', () => {
      assert.equal(skill.parsed.data.name, skill.dirName);
    });

    // V5
    it('uses a spec-legal name', () => {
      const name = skill.parsed.data.name;
      assert.ok(name.length <= NAME_MAX, `name is ${name.length} chars, max ${NAME_MAX}`);
      assert.match(name, NAME_PATTERN);
    });

    // V6
    it('keeps description within the spec limit', () => {
      const length = collapse(skill.parsed.data.description).length;
      assert.ok(length <= DESCRIPTION_MAX, `description is ${length} chars, max ${DESCRIPTION_MAX}`);
    });

    // V14 — progressive disclosure: the body loads in full on activation.
    it('keeps the body under the recommended length', () => {
      const lines = skill.parsed.body.split('\n').length;
      assert.ok(lines <= BODY_MAX_LINES, `body is ${lines} lines, recommended max ${BODY_MAX_LINES}`);
    });
  });
}

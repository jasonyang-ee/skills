# Evaluator-only checks and references

Do not supply this file, its assertions, references, validation logs, or other submissions to subjects. These are new benchmark checks stored as Markdown, not additions to the repository test suite. Each assertion tests the exact visible case prompt; error messages, implementation style, test names, and document wording are not acceptance criteria.

Each case section has a `reviewer.test.mjs` block and minimal reference module blocks. Extract by case heading and exact `### file: PATH` label. Run checks in a fresh evaluator directory containing the submitted modules and `reviewer.test.mjs`, without the subject's tests or package scripts: `node --test reviewer.test.mjs`. For reference validation, strip `reference/` from module paths. Test the visible files in a separate seed copy. No audit directory needs more than three source/test files.

Record every named group as pass, fail, or unavailable, including failure output. Before any scored run, verify visible tests pass on every seed, these checks fail on the intended defects, and both visible tests and these checks pass on the references. Freeze this file and all case files with the protocol. Static inspection separately checks preserved exports and duration's use of the existing helper; do not assert exact source text or prescribe the reference implementation.

## limit

### file: reviewer.test.mjs

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseLimit } from './limit.mjs';

test('limit: defaults and blank strings', () => {
  for (const value of [undefined, '', ' ', '\t\n']) {
    assert.equal(parseLimit(value), 20);
  }
});

test('limit: bounds, trimming, and leading zeros', () => {
  for (const [value, expected] of [
    ['1', 1], ['100', 100], [' 42\t', 42], ['0001', 1], ['0100', 100],
  ]) assert.equal(parseLimit(value), expected);
});

test('limit: reject out-of-range and non-digit strings', () => {
  for (const value of [
    '0', '000', '101', '999999999999999999999', '-1', '+1',
    '1.5', '1.0', '1x', '1e2', '0x10', '1 0', 'NaN', 'Infinity',
  ]) assert.throws(() => parseLimit(value), RangeError, JSON.stringify(value));
});

test('limit: reject invalid types', () => {
  for (const value of [null, 1, 100, NaN, true, false, [], ['2'], {}, 2n, Symbol('2')]) {
    assert.throws(() => parseLimit(value), RangeError, String(value));
  }
});
```

### file: reference/limit.mjs

```js
export function parseLimit(text) {
  if (text === undefined) return 20;
  if (typeof text !== 'string') throw new RangeError('Invalid limit');
  const trimmed = text.trim();
  if (trimmed === '') return 20;
  if (!/^[0-9]+$/.test(trimmed)) throw new RangeError('Invalid limit');
  const value = Number(trimmed);
  if (value < 1 || value > 100) throw new RangeError('Invalid limit');
  return value;
}
```

## ids

### file: reviewer.test.mjs

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { uniqueIds } from './ids.mjs';

test('ids: first occurrences keep input order', () => {
  assert.deepEqual(uniqueIds(['b', 'a', 'b', 'c', 'a']), ['b', 'a', 'c']);
  assert.deepEqual(uniqueIds(['10', '2', '10', '1']), ['10', '2', '1']);
});

test('ids: empty, case-sensitive, and property-like IDs', () => {
  assert.deepEqual(uniqueIds([]), []);
  const ids = ['', 'A', 'a', '__proto__', 'constructor', 'toString', '', 'A'];
  assert.deepEqual(uniqueIds(ids), ['', 'A', 'a', '__proto__', 'constructor', 'toString']);
});

test('ids: reject non-array containers', () => {
  for (const value of [undefined, null, 'ab', 1, {}, new Set(['a'])]) {
    assert.throws(() => uniqueIds(value), TypeError);
  }
});

test('ids: reject every non-string element', () => {
  for (const value of [undefined, null, 1, NaN, true, {}, [], 1n, Symbol('a')]) {
    assert.throws(() => uniqueIds(['a', value, 'a']), TypeError);
  }
});

test('ids: input remains unchanged', () => {
  const input = Object.freeze(['b', '', 'b', 'a']);
  const before = [...input];
  uniqueIds(input);
  assert.deepEqual(input, before);
  const invalid = Object.freeze(['b', 1, 'a']);
  assert.throws(() => uniqueIds(invalid), TypeError);
  assert.deepEqual(invalid, ['b', 1, 'a']);
});
```

### file: reference/ids.mjs

```js
export function uniqueIds(ids) {
  if (!Array.isArray(ids)) throw new TypeError('Invalid IDs');
  for (const id of ids) {
    if (typeof id !== 'string') throw new TypeError('Invalid ID');
  }
  return [...new Set(ids)];
}
```

## duration

### file: reviewer.test.mjs

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { totalDuration } from './duration.mjs';
import { toMilliseconds } from './milliseconds.mjs';

test('duration: empty input, zero, and ordinary fractions', () => {
  assert.equal(totalDuration([]), 0);
  assert.equal(totalDuration([0]), 0);
  assert.equal(totalDuration([0.25, 1.5]), 1750);
});

test('duration: round each value before summing', () => {
  assert.equal(totalDuration([0.0006, 0.0006]), 2);
  assert.equal(totalDuration([0.0004, 0.0004]), 0);
  assert.equal(totalDuration([1.2344, 2.3454]), 3579);
});

test('duration: reject invalid containers', () => {
  for (const value of [undefined, null, '12', 1, {}, new Set([1])]) {
    assert.throws(() => totalDuration(value), RangeError);
  }
});

test('duration: reject invalid elements', () => {
  for (const value of [-0.1, NaN, Infinity, -Infinity, '1', null, undefined, true, {}, [], 1n, Symbol('1')]) {
    assert.throws(() => totalDuration([0, value, 1]), RangeError);
  }
});

test('duration: direct helper conversion and validation', () => {
  for (const [value, expected] of [[0, 0], [0.0004, 0], [0.0006, 1], [1.2346, 1235]]) {
    assert.equal(toMilliseconds(value), expected);
  }
  for (const value of [-0.1, NaN, Infinity, -Infinity, '1', null, undefined, true, {}, [], 1n, Symbol('1')]) {
    assert.throws(() => toMilliseconds(value), RangeError);
  }
});

test('duration: input remains unchanged', () => {
  const input = Object.freeze([0.0006, 1.25, 0]);
  const before = [...input];
  totalDuration(input);
  assert.deepEqual(input, before);
  const invalid = Object.freeze([1, -1, 2]);
  assert.throws(() => totalDuration(invalid), RangeError);
  assert.deepEqual(invalid, [1, -1, 2]);
});
```

### file: reference/milliseconds.mjs

```js
export function toMilliseconds(seconds) {
  if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) {
    throw new RangeError('Invalid seconds');
  }
  return Math.round(seconds * 1000);
}
```

### file: reference/duration.mjs

```js
import { toMilliseconds } from './milliseconds.mjs';

export function totalDuration(seconds) {
  if (!Array.isArray(seconds)) throw new RangeError('Invalid durations');
  let total = 0;
  for (const value of seconds) total += toMilliseconds(value);
  return total;
}
```

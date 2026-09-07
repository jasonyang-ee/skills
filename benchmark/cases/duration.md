# duration

Executor: `cater`. Starting fixture: two modules and one visible test file. Test command: `npm test` (`npm.cmd test` in Windows PowerShell).

## Exact task prompt

Fix totalDuration(seconds) to accept an array of finite non-negative second values, round each value to the nearest millisecond, and sum them. Empty input returns 0; invalid containers or elements throw RangeError. Preserve both exports and make direct toMilliseconds calls follow the same element rules. Reuse the existing helper. Do not mutate the input.

## Starting files

### file: milliseconds.mjs

```js
export function toMilliseconds(seconds) {
  return Math.round(seconds * 1000);
}
```

### file: duration.mjs

```js
import { toMilliseconds } from './milliseconds.mjs';

export function totalDuration(seconds) {
  return toMilliseconds(seconds.reduce((sum, value) => sum + value, 0));
}
```

### file: visible.test.mjs

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { totalDuration } from './duration.mjs';
import { toMilliseconds } from './milliseconds.mjs';

test('empty and whole-second durations', () => {
  assert.equal(totalDuration([]), 0);
  assert.equal(totalDuration([1, 2]), 3000);
});

test('ordinary helper conversion', () => {
  assert.equal(toMilliseconds(0.25), 250);
});
```

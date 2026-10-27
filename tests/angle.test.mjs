import assert from 'node:assert/strict';
import {generateAngle, parseAngle, accuracy, point, arcPath} from '../assets/js/portfolio/angle-core.mjs';

assert.equal(generateAngle(() => 0), 1);
assert.equal(generateAngle(() => 1 - Number.EPSILON), 359);
for (const previous of [1, 180, 359]) {
  const seen = new Set();
  for (let i = 0; i < 358; i++) {
    const angle = generateAngle(() => (i + .5) / 358, previous);
    assert.ok(angle >= 1 && angle <= 359 && angle !== previous);
    seen.add(angle);
  }
  assert.equal(seen.size, 358);
}
for (const bad of [-1, 1, Infinity, NaN]) assert.throws(() => generateAngle(() => bad));
for (const bad of ['', '0', '360', '-1', '1.5', '1e2', '90°', 'Infinity']) assert.equal(parseAngle(bad), null);
for (const value of [1, 90, 180, 270, 359]) assert.equal(parseAngle(String(value)), value);
assert.deepEqual(accuracy(90, 90), {error:0, points:100});
assert.deepEqual(accuracy(1, 359), {error:358, points:0});
assert.deepEqual(accuracy(90, 270), {error:180, points:0});
assert.equal(accuracy(100, 90).points, accuracy(80, 90).points);
for (let error = 0; error < 358; error++) assert.ok(accuracy(1, 1 + error).points >= accuracy(1, 2 + error).points);
for (const start of [0, 90, 179, 359]) for (const angle of [1, 90, 180, 181, 270, 359]) {
  const end = point(start + angle);
  assert.ok(end.x >= 68 && end.x <= 252 && end.y >= 23 && end.y <= 207);
  assert.ok(!arcPath(start, angle).includes('NaN'));
  assert.ok(arcPath(start, angle).includes(`0 ${angle > 180 ? 1 : 0} 1`));
}
console.log('Angle checks passed: full generation range, no immediate repeats, scoring boundaries, validation, rotated and reflex arc geometry.');

/** Integer angles from 1–359. Excluding the previous answer keeps rounds distinct. */
export function generateAngle(random = Math.random, previous = null) {
  const sample = random();
  if (!Number.isFinite(sample) || sample < 0 || sample >= 1) throw new RangeError('Random source must return a value in [0, 1).');
  if (!Number.isInteger(previous) || previous < 1 || previous > 359) return 1 + Math.floor(sample * 359);
  const candidate = 1 + Math.floor(sample * 358);
  return candidate >= previous ? candidate + 1 : candidate;
}
export function parseAngle(text) {
  const input = text.trim();
  if (!/^\d{1,3}$/.test(input)) return null;
  const value = Number(input);
  return value >= 1 && value <= 359 ? value : null;
}
export function accuracy(guess, answer) {
  if (![guess, answer].every(n => Number.isInteger(n) && n >= 1 && n <= 359)) throw new RangeError('Angles must be whole degrees from 1 to 359.');
  const error = Math.abs(guess - answer);
  return { error, points: Math.max(0, Math.round(100 * (1 - error / 180))) };
}
export function point(degrees, radius = 92) {
  const radians = degrees * Math.PI / 180;
  return { x: 160 + radius * Math.cos(radians), y: 115 + radius * Math.sin(radians) };
}
export function arcPath(start, angle, radius = 40) {
  const a = point(start, radius), b = point(start + angle, radius);
  return `M ${a.x} ${a.y} A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${b.x} ${b.y}`;
}

import { generateAngle, parseAngle, accuracy, point, arcPath } from './angle-core.mjs';

const byId = id => document.getElementById(id);
let answer = null;
let rotation = 0;
let complete = false;
let played = 0;
let total = 0;

function newRound() {
  answer = generateAngle(Math.random, answer);
  rotation = Math.floor(Math.random() * 360);
  complete = false;
  const first = point(rotation), second = point(rotation + answer);
  byId('angle-rays').setAttribute('d', `M ${first.x} ${first.y} L 160 115 L ${second.x} ${second.y}`);
  const arc = arcPath(rotation, answer);
  byId('angle-arc').setAttribute('d', arc);
  byId('angle-sector').setAttribute('d', `${arc} L 160 115 Z`);
  const label = point(rotation + answer / 2, 63);
  byId('angle-label').setAttribute('x', label.x);
  byId('angle-label').setAttribute('y', label.y);
  byId('angle-label').textContent = '?';
  byId('guess-ray').setAttribute('hidden', '');
  byId('angle-description').textContent = 'Two rays meet at a vertex. Estimate the angle traced clockwise by the marked arc, which may be greater than 180 degrees.';
  byId('guess-form').hidden = false;
  byId('guess').value = '';
  byId('game-error').textContent = '';
  byId('result').hidden = true;
  byId('result').replaceChildren();
  byId('next-angle').hidden = true;
  byId('round-label').textContent = `ROUND ${played + 1}`;
}

byId('guess-form').addEventListener('submit', event => {
  event.preventDefault();
  if (complete) return;
  const guess = parseAngle(byId('guess').value);
  if (guess === null) {
    byId('game-error').textContent = 'Enter a whole number from 1 to 359.';
    byId('guess').setAttribute('aria-invalid', 'true');
    byId('guess').focus();
    return;
  }
  byId('guess').removeAttribute('aria-invalid');
  complete = true;
  const { error, points } = accuracy(guess, answer);
  played += 1;
  total += points;
  const guessed = point(rotation + guess);
  byId('guess-ray').setAttribute('d', `M 160 115 L ${guessed.x} ${guessed.y}`);
  byId('guess-ray').removeAttribute('hidden');
  byId('angle-label').textContent = `${answer}°`;
  byId('angle-description').textContent = `The marked angle is ${answer} degrees. Your dashed estimate is ${guess} degrees, ${error} degrees off.`;
  byId('guess-form').hidden = true;
  const result = byId('result');
  const heading = document.createElement('p');
  heading.className = 'angle-answer';
  heading.textContent = error === 0 ? `Exactly ${answer}°.` : `${answer}°`;
  const detail = document.createElement('p');
  detail.textContent = `You guessed ${guess}° · ${error}° off · ${points}/100 points`;
  const legend = document.createElement('p');
  legend.className = 'angle-legend';
  legend.textContent = 'Solid rays: actual angle · Dashed ray: your estimate';
  result.replaceChildren(heading, detail, legend);
  result.hidden = false;
  byId('session-score').textContent = `${total} points · ${played} played`;
  byId('next-angle').hidden = false;
  result.focus();
});
byId('next-angle').addEventListener('click', () => {
  newRound();
  byId('guess').removeAttribute('aria-invalid');
  byId('guess').focus();
});
newRound();

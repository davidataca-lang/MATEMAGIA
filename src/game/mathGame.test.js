import test from 'node:test';
import assert from 'node:assert/strict';
import { createQuestion, evaluateResult } from './mathGame.js';

test('creates exact division questions', () => {
  const question = createQuestion(1, { operation: 'division', difficulty: 'medium', totalQuestions: 10 });
  assert.equal(question.left / question.right, question.answer);
  assert.equal(Number.isInteger(question.answer), true);
});

test('keeps subtraction answers non-negative for young players', () => {
  const question = createQuestion(1, { operation: 'subtraction', difficulty: 'easy', totalQuestions: 10 });
  assert.equal(question.answer >= 0, true);
});

test('evaluates results with stars and a percentage', () => {
  assert.deepEqual({ accuracy: evaluateResult(9, 10).accuracy, stars: evaluateResult(9, 10).stars }, { accuracy: 90, stars: 3 });
  assert.deepEqual({ accuracy: evaluateResult(6, 10).accuracy, stars: evaluateResult(6, 10).stars }, { accuracy: 60, stars: 2 });
  assert.deepEqual({ accuracy: evaluateResult(0, 10).accuracy, stars: evaluateResult(0, 10).stars }, { accuracy: 0, stars: 0 });
});

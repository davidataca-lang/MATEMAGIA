import { createQuestion, difficultyLabels, evaluateResult, operationLabels } from './game/mathGame.js';

let settings = { operation: 'mixed', difficulty: 'easy', totalQuestions: 10 };
let questionNumber = 1;
let question = createQuestion(1, settings);
let score = 0;
let streak = 0;

const $ = (id) => document.getElementById(id);
const elements = {
  operation: $('operation'),
  difficulty: $('difficulty'),
  totalQuestions: $('totalQuestions'),
  score: $('score'),
  questionCount: $('question-count'),
  streak: $('streak'),
  progress: $('progress'),
  feedback: $('feedback'),
  form: $('question-form'),
  question: $('question'),
  answer: $('answer'),
  playView: $('play-view'),
  resultView: $('result-view'),
  resultMessage: $('result-message'),
  stars: $('stars'),
  resultScore: $('result-score'),
  restart: $('restart')
};

const fillSelect = (select, labels) => {
  select.innerHTML = Object.entries(labels)
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join('');
};

const render = () => {
  elements.score.textContent = String(score);
  elements.questionCount.textContent = `Pregunta ${questionNumber} de ${settings.totalQuestions}`;
  elements.streak.textContent = `Racha: ${streak}`;
  elements.progress.style.width = `${Math.round(((questionNumber - 1) / settings.totalQuestions) * 100)}%`;
  elements.question.textContent = `${question.prompt} = ?`;
};

const startGame = (nextSettings = settings) => {
  settings = nextSettings;
  questionNumber = 1;
  question = createQuestion(1, settings);
  score = 0;
  streak = 0;
  elements.feedback.textContent = 'Nuevo portal abierto. ¡Resuelve el primer conjuro!';
  elements.answer.value = '';
  elements.playView.classList.remove('hidden');
  elements.resultView.classList.add('hidden');
  render();
  elements.answer.focus();
};

const finishGame = () => {
  const result = evaluateResult(score, settings.totalQuestions);
  elements.playView.classList.add('hidden');
  elements.resultView.classList.remove('hidden');
  elements.resultMessage.textContent = result.message;
  elements.stars.innerHTML = [1, 2, 3].map((star) => (star <= result.stars ? '★' : '☆')).join('');
  elements.stars.setAttribute('aria-label', `${result.stars} de 3 estrellas`);
  elements.resultScore.innerHTML = `Lograste <strong>${result.score}</strong> de <strong>${result.totalQuestions}</strong> respuestas correctas (${result.accuracy}%).`;
};

const submitAnswer = (event) => {
  event.preventDefault();
  const numericAnswer = Number(elements.answer.value);

  if (elements.answer.value.trim() === '' || Number.isNaN(numericAnswer)) {
    elements.feedback.textContent = 'Escribe un número para activar tu hechizo.';
    return;
  }

  const correct = numericAnswer === question.answer;
  score += correct ? 1 : 0;
  streak = correct ? streak + 1 : 0;
  elements.feedback.textContent = correct
    ? `¡Correcto! Racha mágica de ${streak}.`
    : `Casi. La respuesta correcta era ${question.answer}.`;

  if (questionNumber >= settings.totalQuestions) {
    finishGame();
    return;
  }

  questionNumber += 1;
  question = createQuestion(questionNumber, settings);
  elements.answer.value = '';
  render();
};

fillSelect(elements.operation, operationLabels);
fillSelect(elements.difficulty, difficultyLabels);
elements.totalQuestions.innerHTML = [5, 10, 15]
  .map((amount) => `<option value="${amount}">${amount}</option>`)
  .join('');
elements.operation.value = settings.operation;
elements.difficulty.value = settings.difficulty;
elements.totalQuestions.value = String(settings.totalQuestions);

elements.operation.addEventListener('change', () => startGame({ ...settings, operation: elements.operation.value }));
elements.difficulty.addEventListener('change', () => startGame({ ...settings, difficulty: elements.difficulty.value }));
elements.totalQuestions.addEventListener('change', () =>
  startGame({ ...settings, totalQuestions: Number(elements.totalQuestions.value) })
);
elements.form.addEventListener('submit', submitAnswer);
elements.restart.addEventListener('click', () => startGame());

render();

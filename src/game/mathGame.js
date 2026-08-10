export const operationLabels = {
  addition: 'Suma',
  subtraction: 'Resta',
  multiplication: 'Multiplicación',
  division: 'División exacta',
  mixed: 'Reto mixto'
};

export const difficultyLabels = {
  easy: 'Aprendiz',
  medium: 'Hechicero',
  hard: 'Archimago'
};

const operationSymbols = {
  addition: '+',
  subtraction: '−',
  multiplication: '×',
  division: '÷'
};

const ranges = {
  easy: { min: 1, max: 10, multiplierMax: 5 },
  medium: { min: 5, max: 30, multiplierMax: 10 },
  hard: { min: 10, max: 99, multiplierMax: 12 }
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const pickOperation = (operation) => {
  if (operation !== 'mixed') return operation;
  const options = ['addition', 'subtraction', 'multiplication', 'division'];
  return options[randomInt(0, options.length - 1)];
};

export const createQuestion = (id, settings) => {
  const selectedOperation = pickOperation(settings.operation);
  const range = ranges[settings.difficulty];
  let left = randomInt(range.min, range.max);
  let right = randomInt(range.min, range.max);
  let answer = 0;

  if (selectedOperation === 'addition') answer = left + right;

  if (selectedOperation === 'subtraction') {
    if (right > left) [left, right] = [right, left];
    answer = left - right;
  }

  if (selectedOperation === 'multiplication') {
    right = randomInt(1, range.multiplierMax);
    answer = left * right;
  }

  if (selectedOperation === 'division') {
    right = randomInt(1, range.multiplierMax);
    answer = randomInt(range.min, range.max);
    left = answer * right;
  }

  const symbol = operationSymbols[selectedOperation];
  return { id, left, right, symbol, answer, prompt: `${left} ${symbol} ${right}` };
};

export const evaluateResult = (score, totalQuestions) => {
  const accuracy = totalQuestions === 0 ? 0 : Math.round((score / totalQuestions) * 100);
  const stars = accuracy >= 90 ? 3 : accuracy >= 60 ? 2 : accuracy >= 30 ? 1 : 0;
  const message =
    accuracy >= 90
      ? '¡Magia suprema! Dominaste el reto.'
      : accuracy >= 60
        ? '¡Buen conjuro! Sigue practicando.'
        : accuracy >= 30
          ? 'Tu varita está despertando. Inténtalo otra vez.'
          : 'Todo mago empieza aprendiendo. ¡No te rindas!';

  return { score, totalQuestions, accuracy, stars, message };
};

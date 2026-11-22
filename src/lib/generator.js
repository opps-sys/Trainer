function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Генератор индивидуального варианта задачи по тригонометрии (из ЛР № 9).
 */
export function makeTrigTask(id = Date.now()) {
  const a = randInt(2, 15);
  const b = randInt(1, 12);
  const c = randInt(1, 10);
  const val = a + b - c;

  return {
    id,
    subject: "math",
    topic: "Основное тригонометрическое тождество",
    level: 2,
    title: "Индивидуальный вариант (преобразование выражения)",
    statement: `Вычислите значение выражения: ${a} · sin² α + ${a} · cos² α + ${b} · tg 45° - ${c}.`,
    answer: { value: val, unit: "ед.", tolerance: 0.01 },
    hint: "Используйте основное тригонометрическое тождество sin² α + cos² α = 1 и табличное значение tg 45° = 1.",
    solution: `${a} · (sin² α + cos² α) + ${b} · 1 - ${c} = ${a} + ${b} - ${c} = ${val}`,
  };
}

/** Перевод процента выполнения в 10-балльную отметку. */
export function gradeFromPercent(percent) {
  if (percent >= 95) return 10;
  if (percent >= 85) return 9;
  if (percent >= 75) return 8;
  if (percent >= 65) return 7;
  if (percent >= 55) return 6;
  if (percent >= 45) return 5;
  if (percent >= 35) return 4;
  if (percent >= 25) return 3;
  if (percent >= 15) return 2;
  return 1;
}

/** Возвращает случайную подвыборку из n задач без повторений. */
export function sampleTasks(tasks, count = 5) {
  const copy = [...tasks];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

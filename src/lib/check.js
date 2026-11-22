/**
 * Приводит ввод ученика к числу: убирает пробелы,
 * понимает запятую как десятичный разделитель.
 */
export function parseAnswer(input) {
  if (input === null || input === undefined) return NaN;
  const normalized = String(input)
    .trim()
    .replace(/\s+/g, "")
    .replace(",", ".");
  if (normalized === "") return NaN;
  return Number(normalized);
}

/** Проверка числового ответа с относительным допуском. */
export function checkNumeric(input, expected, tolerance = 0.01) {
  const value = parseAnswer(input);
  if (Number.isNaN(value)) return { ok: false, reason: "not-a-number" };
  const limit = expected === 0 ? tolerance : Math.abs(expected) * tolerance;
  const ok = Math.abs(value - expected) <= limit;
  return { ok, reason: ok ? "correct" : "wrong", value };
}

/** Проверка текстового ответа: регистр и лишние пробелы не важны. */
export function checkText(input, expected) {
  const norm = (s) => String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  const ok = norm(input) === norm(expected);
  return { ok, reason: ok ? "correct" : "wrong" };
}

/** Универсальная проверка ответа задачи (число или текст). */
export function checkTaskAnswer(input, answerConfig) {
  if (!answerConfig) return { ok: false, reason: "wrong" };
  return answerConfig.type === "text"
    ? checkText(input, answerConfig.value)
    : checkNumeric(input, answerConfig.value, answerConfig.tolerance);
}

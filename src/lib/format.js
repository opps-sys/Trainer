/** Форматирует секунды в строку мм:сс. */
export function formatTime(totalSeconds = 0) {
  const safe = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const mm = String(Math.floor(safe / 60)).padStart(2, "0");
  const ss = String(safe % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

/** Форматирует долю в процентах. */
export function formatPercent(value = 0) {
  const num = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
  return `${num}%`;
}

/** Формирует содержимое CSV-файла (с UTF-8 BOM) для журнала учителя. */
export function buildResultsCSV(tasks, attempts, solvedSet) {
  const header = ["ID задачи", "Название", "Тема", "Уровень", "Статус", "Попыток", "Последняя попытка"];
  const rows = [header];

  for (const task of tasks) {
    const taskAttempts = attempts.filter((a) => a.taskId === task.id);
    const lastAt = taskAttempts.length > 0 ? taskAttempts[taskAttempts.length - 1].at : "";
    const status = solvedSet.has(task.id) ? "Решена" : "Не решена";
    rows.push([task.id, task.title, task.topic, task.level, status, taskAttempts.length, lastAt]);
  }

  return (
    "\uFEFF" +
    rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";"))
      .join("\r\n")
  );
}

/** Отбор задач по предмету, теме, уровню и строке поиска. */
export function filterTasks(tasks, { subject = "", topic = "", level = 0, search = "" } = {}) {
  const query = String(search ?? "").trim().toLowerCase();
  return tasks.filter(({ subject: s, topic: t, level: l, statement = "", title = "" }) => {
    const matchSubject = !subject || s === subject;
    const matchTopic = !topic || t === topic;
    const matchLevel = !level || l === Number(level);
    const matchSearch =
      !query ||
      statement.toLowerCase().includes(query) ||
      title.toLowerCase().includes(query);
    return matchSubject && matchTopic && matchLevel && matchSearch;
  });
}

/** Отсортированный список уникальных тем банка задач. */
export function topicsOf(tasks) {
  const uniqueTopics = new Set(tasks.map(({ topic }) => topic).filter(Boolean));
  return [...uniqueTopics].sort((a, b) => a.localeCompare(b, "ru"));
}

/** Сводная статистика по попыткам и темам (чистая функция). */
export function computeStats(tasks, attempts) {
  const solved = new Set();
  let correctCount = 0;

  for (const a of attempts) {
    if (a.ok) {
      solved.add(a.taskId);
      correctCount++;
    }
  }

  const totalTasks = tasks.length;
  const totalAttempts = attempts.length;
  const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;
  const solvedPct = totalTasks > 0 ? Math.round((solved.size / totalTasks) * 100) : 0;

  const byTopic = topicsOf(tasks).map((topic) => {
    const topicTasks = tasks.filter((t) => t.topic === topic);
    const topicSolved = topicTasks.filter((t) => solved.has(t.id)).length;
    const pct = topicTasks.length > 0 ? Math.round((topicSolved / topicTasks.length) * 100) : 0;
    return { topic, solved: topicSolved, total: topicTasks.length, pct };
  });

  return { solved, solvedCount: solved.size, totalTasks, totalAttempts, accuracy, solvedPct, byTopic };
}

/** Отбор задач по предмету, теме, уровню и строке поиска. */
export function filterTasks(tasks, { subject = "", topic = "", level = 0, search = "" } = {}) {
  const query = String(search ?? "").trim().toLowerCase();
  return tasks.filter(({ subject: s, topic: t, level: l, statement, title }) => {
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
  const uniqueTopics = new Set(tasks.map(({ topic }) => topic));
  return [...uniqueTopics].sort((a, b) => a.localeCompare(b, "ru"));
}

/** Подсчёт количества задач по темам. */
export function countByTopic(tasks) {
  return tasks.reduce((acc, { topic }) => {
    acc[topic] = (acc[topic] ?? 0) + 1;
    return acc;
  }, {});
}

/** Средний уровень сложности задач. */
export function averageLevel(tasks) {
  if (tasks.length === 0) return 0;
  const sum = tasks.reduce((acc, { level }) => acc + level, 0);
  return Number((sum / tasks.length).toFixed(1));
}

/** Сортировка задач по уровню и номеру без изменения исходного массива. */
export function sortedTasks(tasks) {
  return [...tasks].sort((a, b) => a.level - b.level || a.id - b.id);
}

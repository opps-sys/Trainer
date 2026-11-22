import { useEffect, useState } from "react";

const DEFAULT_URL = `${import.meta.env.BASE_URL}data/tasks.json`;

/** Загрузка банка задач: состояние загрузки, ошибки и данных в одном месте. */
export function useTasks(url = DEFAULT_URL) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!data || !Array.isArray(data.tasks)) {
          throw new Error("Некорректная структура JSON");
        }
        if (!cancelled) setTasks(data.tasks);
      } catch {
        if (!cancelled) setError("Не удалось загрузить банк задач (data/tasks.json).");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return { tasks, loading, error };
}

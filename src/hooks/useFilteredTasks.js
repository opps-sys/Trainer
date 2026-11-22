import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { filterTasks, topicsOf } from "../lib/tasks.js";

/**
 * Хук фильтрации задач с хранением состояния фильтров в URL (?level=2&topic=...&search=...).
 * Позволяет учителю отправлять ссылку на конкретную подборку задач.
 */
export function useFilteredTasks(tasks) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      subject: searchParams.get("subject") || "",
      topic: searchParams.get("topic") || "",
      level: Number(searchParams.get("level") || 0),
      search: searchParams.get("search") || "",
    }),
    [searchParams]
  );

  const filteredTasks = useMemo(
    () => filterTasks(tasks, filters),
    [tasks, filters]
  );

  const topics = useMemo(() => topicsOf(tasks), [tasks]);

  const updateFilter = useCallback(
    (field, value) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (!value || value === 0 || value === "0") {
            next.delete(field);
          } else {
            next.set(field, String(value));
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return {
    filters,
    filteredTasks,
    topics,
    updateFilter,
    resetFilters,
  };
}

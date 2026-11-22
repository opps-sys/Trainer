import { useEffect, useState } from "react";

/** Хук общего назначения для синхронизации состояния с localStorage. */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        return typeof initialValue === "function" ? initialValue() : initialValue;
      }
      return JSON.parse(raw);
    } catch {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Хранилище недоступно
    }
  }, [key, value]);

  return [value, setValue];
}

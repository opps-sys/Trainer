import { useCallback, useEffect, useState } from "react";

const KEY = "trainer:progress";

/** Хук для хранения и автоматического сохранения попыток в localStorage. */
export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY));
      return parsed && Array.isArray(parsed.attempts) ? parsed : { attempts: [] };
    } catch {
      return { attempts: [] };
    }
  });
  const [resetEpoch, setResetEpoch] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      // Хранилище недоступно
    }
  }, [progress]);

  const addAttempt = useCallback((taskId, ok) => {
    setProgress((p) => ({
      ...p,
      attempts: [...p.attempts, { taskId, ok, at: new Date().toISOString() }],
    }));
  }, []);

  const reset = useCallback(() => {
    setProgress({ attempts: [] });
    setResetEpoch((n) => n + 1);
  }, []);

  return { progress, addAttempt, reset, resetEpoch };
}

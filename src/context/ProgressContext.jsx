import { createContext, useContext } from "react";
import { useProgress } from "../hooks/useProgress.js";

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const value = useProgress(); // { progress, addAttempt, reset, resetEpoch }
  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgressContext вызван вне ProgressProvider");
  }
  return ctx;
}

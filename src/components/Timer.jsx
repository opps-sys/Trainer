import { useEffect, useState } from "react";
import { formatTime } from "../lib/format.js";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="timer" aria-label="Время занятия">
      Время занятия: <strong>{formatTime(seconds)}</strong>
    </span>
  );
}

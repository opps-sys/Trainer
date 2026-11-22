import { formatPercent } from "../lib/format.js";

export default function ProgressBar({ value = 0, max = 100, label = "Общий прогресс" }) {
  const safeMax = max > 0 ? max : 1;
  const pct = Math.round((value / safeMax) * 100);

  return (
    <div className="progress-wrap">
      <label htmlFor="progress-bar">
        {label}: {formatPercent(pct)}
      </label>
      <progress id="progress-bar" max={safeMax} value={value}>
        {formatPercent(pct)}
      </progress>
    </div>
  );
}

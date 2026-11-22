import { useMemo } from "react";
import { computeStats } from "../lib/tasks.js";
import { buildResultsCSV, formatPercent } from "../lib/format.js";
import { useProgressContext } from "../context/ProgressContext.jsx";
import ProgressBar from "./ProgressBar.jsx";

export default function StatsPanel({ tasks = [] }) {
  const { progress, reset } = useProgressContext();

  const stats = useMemo(
    () => computeStats(tasks, progress.attempts),
    [tasks, progress.attempts]
  );

  function handleResetClick() {
    if (window.confirm("Вы действительно хотите сбросить все результаты и попытки?")) {
      reset();
    }
  }

  function handleExportCSV() {
    const csv = buildResultsCSV(tasks, progress.attempts, stats.solved);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "trigonometry_results.csv";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <p className="stats-summary" role="status" aria-live="polite">
        Решено задач: <strong>{stats.solvedCount}</strong> из <strong>{stats.totalTasks}</strong> ({formatPercent(stats.solvedPct)}) ·{" "}
        Попыток: <strong>{stats.totalAttempts}</strong> ·{" "}
        Доля верных: <strong>{formatPercent(stats.accuracy)}</strong>
      </p>

      <ProgressBar value={stats.solvedCount} max={stats.totalTasks} label="Общий прогресс" />

      {stats.byTopic.length > 0 && (
        <div className="table-wrap">
          <table>
            <caption>Прогресс по темам</caption>
            <thead>
              <tr>
                <th scope="col">Тема</th>
                <th scope="col">Решено</th>
                <th scope="col">Всего</th>
                <th scope="col">Доля</th>
              </tr>
            </thead>
            <tbody>
              {stats.byTopic.map((row) => (
                <tr key={row.topic}>
                  <th scope="row">{row.topic}</th>
                  <td>{row.solved}</td>
                  <td>{row.total}</td>
                  <td>{formatPercent(row.pct)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Итого</th>
                <td colSpan={3}>{stats.solvedCount} из {stats.totalTasks} ({formatPercent(stats.solvedPct)})</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <div className="stats-actions">
        <button type="button" onClick={handleExportCSV} disabled={stats.totalTasks === 0}>
          Экспорт в CSV
        </button>
        <button type="button" className="btn-danger" onClick={handleResetClick}>
          Сбросить результаты
        </button>
      </div>
    </>
  );
}

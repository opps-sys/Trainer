import { useEffect, useState } from "react";
import Panel from "../components/Panel.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { useTasks } from "../hooks/useTasks.js";
import { checkTaskAnswer } from "../lib/check.js";
import { formatPercent, formatTime } from "../lib/format.js";
import { gradeFromPercent, sampleTasks } from "../lib/generator.js";

const EXAM_SIZE = 5;

export default function ExamPage() {
  const { tasks, loading, error } = useTasks();
  const [examTasks, setExamTasks] = useState([]);
  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!started || finished) return undefined;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [started, finished]);

  function startExam() {
    const picked = sampleTasks(tasks, EXAM_SIZE);
    setExamTasks(picked);
    setAnswers({});
    setResults([]);
    setSeconds(0);
    setFinished(false);
    setStarted(true);
  }

  function handleAnswerChange(taskId, val) {
    setAnswers((prev) => ({ ...prev, [taskId]: val }));
  }

  function handleFinish(event) {
    event.preventDefault();
    const evaluated = examTasks.map((task) => {
      const userValue = answers[task.id] ?? "";
      const check = checkTaskAnswer(userValue, task.answer);
      return { task, userValue, ok: check.ok };
    });
    setResults(evaluated);
    setFinished(true);
  }

  const correctCount = results.filter((r) => r.ok).length;
  const percent = examTasks.length > 0 ? Math.round((correctCount / examTasks.length) * 100) : 0;
  const mark = gradeFromPercent(percent);

  return (
    <Panel title="Режим «Контрольная»">
      <p>
        Случайная выборка из {EXAM_SIZE} задач с общим таймером. В этом режиме подсказки и разбор скрыты до завершения работы.
      </p>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && !started && (
        <button type="button" onClick={startExam} disabled={tasks.length === 0}>
          Начать контрольную ({Math.min(EXAM_SIZE, tasks.length)} задач)
        </button>
      )}

      {started && (
        <>
          <div className="toolbar">
            <span className="timer">
              Общее время: <strong>{formatTime(seconds)}</strong>
            </span>
            <button type="button" onClick={startExam}>
              Сформировать новый билет
            </button>
          </div>

          {!finished ? (
            <form onSubmit={handleFinish}>
              <div className="cards">
                {examTasks.map((task, idx) => (
                  <article key={task.id} className="card">
                    <span className={`badge badge-level-${task.level}`}>Уровень {task.level}</span>
                    <h3>Задание {idx + 1}. {task.title}</h3>
                    <p className="statement">{task.statement}</p>
                    <label htmlFor={`exam-${task.id}`}>
                      Ответ{task.answer.unit ? `, ${task.answer.unit}` : ""}:
                    </label>
                    <input
                      id={`exam-${task.id}`}
                      type="text"
                      inputMode="decimal"
                      value={answers[task.id] ?? ""}
                      onChange={(e) => handleAnswerChange(task.id, e.target.value)}
                      required
                    />
                  </article>
                ))}
              </div>
              <div className="stats-actions">
                <button type="submit">Завершить контрольную и проверить</button>
              </div>
            </form>
          ) : (
            <div className="exam-summary">
              <h3>Итоги контрольной работы</h3>
              <p className="stats-summary">
                Верно решено: <strong>{correctCount}</strong> из <strong>{examTasks.length}</strong> ({formatPercent(percent)}) ·{" "}
                Затраченное время: <strong>{formatTime(seconds)}</strong> ·{" "}
                Ориентировочная отметка: <strong>{mark} / 10</strong>
              </p>
              <ProgressBar value={correctCount} max={examTasks.length} label="Результат контрольной" />

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">№</th>
                      <th scope="col">Задача</th>
                      <th scope="col">Ваш ответ</th>
                      <th scope="col">Эталон</th>
                      <th scope="col">Итог</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={r.task.id}>
                        <td>{i + 1}</td>
                        <td>{r.task.title}</td>
                        <td>{r.userValue || "—"}</td>
                        <td>{r.task.answer.value}</td>
                        <td className={r.ok ? "result correct" : "result wrong"}>
                          {r.ok ? "Верно" : "Неверно"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </Panel>
  );
}

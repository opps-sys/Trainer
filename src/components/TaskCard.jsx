import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { checkTaskAnswer } from "../lib/check.js";
import { useProgressContext } from "../context/ProgressContext.jsx";
import TaskHeader from "./TaskHeader.jsx";
import HintBlock from "./HintBlock.jsx";

const MAX_ATTEMPTS = 3;

const TaskCard = memo(function TaskCard({ task, showLink = true, hideHints = false }) {
  const { progress, addAttempt } = useProgressContext();
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  if (!task || !task.answer) {
    return (
      <article className="card wrong" role="alert">
        <p>Некорректные данные задачи: отсутствует условие или эталонный ответ.</p>
      </article>
    );
  }

  const taskAttempts = progress.attempts.filter((a) => a.taskId === task.id);
  const savedCount = taskAttempts.length;
  const savedSolved = taskAttempts.some((a) => a.ok);

  const isSolved = savedSolved || Boolean(result && result.ok);
  const outOfTries = savedCount >= MAX_ATTEMPTS && !isSolved;
  const isLocked = isSolved || outOfTries;

  const stateClass = isSolved
    ? "correct"
    : result
      ? result.ok
        ? "correct"
        : "wrong"
      : outOfTries
        ? "wrong"
        : "";

  const inputId = `ans-${task.id}`;
  const unitLabel = task.answer.unit ? `, ${task.answer.unit}` : "";
  const imgSrc = task.image
    ? `${import.meta.env.BASE_URL}${task.image.replace(/^\//, "")}`
    : "";

  function handleSubmit(event) {
    event.preventDefault();
    if (isLocked) return;

    const res = checkTaskAnswer(answer, task.answer);
    setResult(res);

    if (res.reason !== "not-a-number") {
      addAttempt(task.id, res.ok);
      if (res.ok) setAnswer("");
    }
  }

  return (
    <article
      className={`card ${stateClass} ${isSolved ? "solved" : ""}`.trim()}
      id={`task-${task.id}`}
      data-task-id={task.id}
      data-level={task.level}
      data-topic={task.topic}
    >
      <TaskHeader id={task.id} title={task.title} level={task.level} />
      <p className="statement">{task.statement}</p>

      {imgSrc && (
        <figure className="illustration">
          <img src={imgSrc} alt={`Иллюстрация к задаче: ${task.title}`} loading="lazy" />
        </figure>
      )}

      <form className="answer-form" onSubmit={handleSubmit}>
        <div className="answer-row">
          <div className="field-grow">
            <label htmlFor={inputId}>Ответ{unitLabel}</label>
            <input
              id={inputId}
              name="answer"
              type="text"
              inputMode="decimal"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setResult(null);
              }}
              disabled={isLocked}
              required
            />
          </div>
          <button type="submit" disabled={isLocked}>Проверить</button>
        </div>
      </form>

      {(result || isSolved || outOfTries) && (
        <p className={`result ${stateClass}`} role="status" aria-live="polite">
          {result?.reason === "not-a-number"
            ? "Введите число (например, 0,48)"
            : isSolved
              ? "Верно!"
              : outOfTries
                ? `Неверно. Попытки исчерпаны (${MAX_ATTEMPTS} из ${MAX_ATTEMPTS}). Посмотрите разбор.`
                : `Неверно. Осталось попыток: ${Math.max(0, MAX_ATTEMPTS - savedCount)}.`}
        </p>
      )}

      {!hideHints && (
        <HintBlock hint={task.hint} solution={task.solution} showSolution={outOfTries || isSolved} />
      )}

      {showLink && typeof task.id === "number" && task.id < 1000 && (
        <p className="card-link-wrap">
          <Link to={`/task/${task.id}`}>Открыть задачу отдельно →</Link>
        </p>
      )}
    </article>
  );
});

export default TaskCard;

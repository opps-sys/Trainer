import { useState } from "react";
import Panel from "../components/Panel.jsx";
import Filters from "../components/Filters.jsx";
import TaskList from "../components/TaskList.jsx";
import TaskCard from "../components/TaskCard.jsx";
import Timer from "../components/Timer.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useTasks } from "../hooks/useTasks.js";
import { useFilteredTasks } from "../hooks/useFilteredTasks.js";
import { makeTrigTask } from "../lib/generator.js";

export default function TasksPage() {
  const { tasks, loading, error } = useTasks();
  const { filters, filteredTasks, topics, updateFilter, resetFilters } = useFilteredTasks(tasks);
  const [showTimer, setShowTimer] = useState(true);
  const [variantTask, setVariantTask] = useState(null);

  function handleGenerateVariant() {
    setVariantTask(makeTrigTask(1000 + Math.floor(Math.random() * 9000)));
  }

  return (
    <>
      <Panel title="Задачи тренажёра" id="tasks">
        <div className="toolbar">
          <div className="timer-box">
            {showTimer && <Timer />}
            <button type="button" onClick={() => setShowTimer((v) => !v)}>
              {showTimer ? "Скрыть таймер" : "Показать таймер"}
            </button>
          </div>
          <button type="button" onClick={handleGenerateVariant}>
            Новый вариант
          </button>
        </div>

        {variantTask && (
          <div className="variant-box">
            <h3>Сгенерированный индивидуальный вариант</h3>
            <TaskCard key={variantTask.id} task={variantTask} showLink={false} />
          </div>
        )}

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <>
            <Filters
              filters={filters}
              topics={topics}
              onUpdate={updateFilter}
              onReset={resetFilters}
            />
            <TaskList tasks={filteredTasks} />
          </>
        )}
      </Panel>
    </>
  );
}

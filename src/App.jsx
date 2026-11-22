import { useState } from "react";
import Header from "./components/Header.jsx";
import Panel from "./components/Panel.jsx";
import Filters from "./components/Filters.jsx";
import TaskList from "./components/TaskList.jsx";
import StatsPanel from "./components/StatsPanel.jsx";
import Timer from "./components/Timer.jsx";
import Loader from "./components/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import { useTasks } from "./hooks/useTasks.js";
import { useFilteredTasks } from "./hooks/useFilteredTasks.js";

export default function App() {
  const { tasks, loading, error } = useTasks();
  const { filters, filteredTasks, topics, updateFilter, resetFilters } = useFilteredTasks(tasks);
  const [showTimer, setShowTimer] = useState(true);

  return (
    <>
      <a href="#tasks" className="skip-link">Перейти к содержанию</a>

      <div className="layout">
        <Header
          title="Тренажёр по теме «Тригонометрия: значения и тождества»"
          subtitle="Тренажёр для учащихся 10 класса (архитектура React)."
        />

        <nav className="sidebar-nav" aria-label="Оглавление по темам">
          <h2>Темы</h2>
          <ul>
            <li><a href="#tasks" onClick={() => updateFilter("topic", "")}>Все задачи ({tasks.length})</a></li>
            {topics.map((topic) => (
              <li key={topic}>
                <a href="#tasks" onClick={() => updateFilter("topic", topic)}>{topic}</a>
              </li>
            ))}
            <li><a href="#stats">Мои результаты</a></li>
          </ul>
        </nav>

        <main>
          <Panel title="Задачи" id="tasks">
            <div className="toolbar">
              <div className="timer-box">
                {showTimer && <Timer />}
                <button type="button" onClick={() => setShowTimer((v) => !v)}>
                  {showTimer ? "Скрыть таймер" : "Показать таймер"}
                </button>
              </div>
            </div>

            {loading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && (
              <>
                <Filters filters={filters} topics={topics} onUpdate={updateFilter} onReset={resetFilters} />
                <TaskList tasks={filteredTasks} />
              </>
            )}
          </Panel>

          <Panel title="Мои результаты" id="stats">
            <StatsPanel tasks={tasks} />
          </Panel>
        </main>

        <footer>
          <p><small>Автор: Маньков А.В., группа 5117241 (МиИ), 2026</small></p>
        </footer>
      </div>

      <a href="#top" className="to-top" aria-label="Наверх">↑ Наверх</a>
    </>
  );
}

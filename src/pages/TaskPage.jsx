import { Link, useParams } from "react-router-dom";
import Panel from "../components/Panel.jsx";
import TaskCard from "../components/TaskCard.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useTasks } from "../hooks/useTasks.js";

export default function TaskPage() {
  const { id } = useParams();
  const { tasks, loading, error } = useTasks();
  const taskId = Number(id);
  const task = tasks.find((t) => t.id === taskId);

  return (
    <Panel title={`Задача № ${id}`}>
      <p>
        <Link to="/">← Вернуться ко всем задачам</Link>
      </p>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && !task && (
        <ErrorMessage message={`Задача с номером «${id}» не найдена в банке задач.`} />
      )}

      {!loading && !error && task && (
        <div className="single-task-wrap">
          <TaskCard task={task} showLink={false} />
        </div>
      )}
    </Panel>
  );
}

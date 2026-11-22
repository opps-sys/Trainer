import { useProgressContext } from "../context/ProgressContext.jsx";
import TaskCard from "./TaskCard.jsx";

export default function TaskList({ tasks = [] }) {
  const { resetEpoch } = useProgressContext();

  if (tasks.length === 0) {
    return <p id="empty">По заданным условиям задач нет.</p>;
  }

  return (
    <div className="cards">
      {tasks.map((task) => (
        <TaskCard key={`${task.id}-${resetEpoch}`} task={task} />
      ))}
    </div>
  );
}

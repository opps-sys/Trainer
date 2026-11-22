import Panel from "../components/Panel.jsx";
import StatsPanel from "../components/StatsPanel.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useTasks } from "../hooks/useTasks.js";

export default function StatsPage() {
  const { tasks, loading, error } = useTasks();

  return (
    <Panel title="Мои результаты" id="stats">
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <StatsPanel tasks={tasks} />}
    </Panel>
  );
}

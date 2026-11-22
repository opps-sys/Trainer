import { Link } from "react-router-dom";
import Panel from "../components/Panel.jsx";

export default function NotFoundPage() {
  return (
    <Panel title="Страница не найдена (404)">
      <p>Запрошенный адрес не существует в приложении.</p>
      <p>
        <Link to="/">Перейти на главную страницу тренажёра →</Link>
      </p>
    </Panel>
  );
}

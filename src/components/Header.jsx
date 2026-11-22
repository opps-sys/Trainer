import { NavLink } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext.jsx";

export default function Header({
  title = "Тренажёр: Тригонометрия",
  subtitle = "Учебный тренажёр для 10 класса (SPA на React)",
}) {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <header>
      <div className="brand">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <nav aria-label="Основная навигация">
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-active" : "")}>
              Задачи
            </NavLink>
          </li>
          <li>
            <NavLink to="/exam" className={({ isActive }) => (isActive ? "nav-active" : "")}>
              Контрольная
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats" className={({ isActive }) => (isActive ? "nav-active" : "")}>
              Результаты
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-active" : "")}>
              О проекте
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              className="theme-btn"
              onClick={toggleTheme}
              aria-pressed={isDark}
            >
              {isDark ? "Светлая тема" : "Тёмная тема"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

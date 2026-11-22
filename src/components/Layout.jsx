import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">Перейти к содержанию</a>

      <div className="spa-layout">
        <Header
          title="Тренажёр по теме «Тригонометрия: значения и тождества»"
          subtitle="Тренажёр для учащихся 10 класса."
        />

        <main id="main-content" className="spa-main">
          <Outlet />
        </main>

        <footer>
          <p><small>Автор: Маньков Андрей Викторович, группа 5117241 (МиИ), 2026</small></p>
        </footer>
      </div>

      <a href="#top" className="to-top" aria-label="Наверх">↑ Наверх</a>
    </>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Layout from "./components/Layout.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import ExamPage from "./pages/ExamPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ProgressProvider } from "./context/ProgressContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ThemeProvider>
          <ProgressProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<TasksPage />} />
                <Route path="task/:id" element={<TaskPage />} />
                <Route path="exam" element={<ExamPage />} />
                <Route path="stats" element={<StatsPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </ProgressProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);

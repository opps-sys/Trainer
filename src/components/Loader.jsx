export default function Loader({ text = "Загрузка задач…" }) {
  return (
    <p className="loader" role="status" aria-live="polite">
      {text}
    </p>
  );
}

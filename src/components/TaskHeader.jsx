export default function TaskHeader({ id, title = "Без названия", level = 1 }) {
  return (
    <>
      <span className={`badge badge-level-${level}`}>Уровень {level}</span>
      <h3>{id}. {title}</h3>
    </>
  );
}

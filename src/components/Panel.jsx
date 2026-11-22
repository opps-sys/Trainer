/** Универсальный компонент-контейнер (композиция через children). */
export default function Panel({ title, id, children }) {
  return (
    <section className="panel" id={id}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

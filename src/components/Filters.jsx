export default function Filters({ filters, topics = [], onUpdate, onReset }) {
  return (
    <form className="filters" aria-label="Фильтр задач" onSubmit={(e) => e.preventDefault()}>
      <div className="filter-item">
        <label htmlFor="f-subject">Предмет:</label>
        <select
          id="f-subject"
          value={filters.subject}
          onChange={(e) => onUpdate("subject", e.target.value)}
        >
          <option value="">Все предметы</option>
          <option value="math">Математика (Тригонометрия)</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="f-topic">Тема:</label>
        <select
          id="f-topic"
          value={filters.topic}
          onChange={(e) => onUpdate("topic", e.target.value)}
        >
          <option value="">Все темы</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="f-level">Уровень:</label>
        <select
          id="f-level"
          value={filters.level}
          onChange={(e) => onUpdate("level", Number(e.target.value))}
        >
          <option value={0}>Любой</option>
          <option value={1}>Уровень 1 (базовый)</option>
          <option value={2}>Уровень 2 (средний)</option>
          <option value={3}>Уровень 3 (повышенный)</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="f-search">Поиск по условию:</label>
        <input
          id="f-search"
          type="search"
          value={filters.search}
          onChange={(e) => onUpdate("search", e.target.value)}
          placeholder="Например, sin или tg"
        />
      </div>

      <button type="button" className="btn-reset" onClick={onReset}>Сбросить</button>
    </form>
  );
}

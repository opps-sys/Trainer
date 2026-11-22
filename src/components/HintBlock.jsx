export default function HintBlock({ hint = "Подсказки нет", solution = "", showSolution = false }) {
  return (
    <>
      <details className="hint">
        <summary>Подсказка</summary>
        <p>{hint}</p>
      </details>
      {showSolution && solution && (
        <details className="solution" open>
          <summary>Разбор</summary>
          <p>{solution}</p>
        </details>
      )}
    </>
  );
}

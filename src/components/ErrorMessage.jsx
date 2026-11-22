export default function ErrorMessage({ message = "Произошла ошибка" }) {
  if (!message) return null;
  return (
    <p className="load-error" role="alert">
      {message}
    </p>
  );
}

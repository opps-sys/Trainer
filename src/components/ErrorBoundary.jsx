import { Component } from "react";

/** Классовый компонент-предохранитель, перехватывающий ошибки рендера. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || "Непредвиденная ошибка интерфейса",
    };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary перехватил ошибку:", error, info.componentStack);
  }

  handleReload = () => {
    this.setState({ hasError: false, message: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="load-error" role="alert">
          <h2>Что-то пошло не так</h2>
          <p>{this.state.message}</p>
          <button type="button" onClick={this.handleReload}>
            Попробовать снова
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}

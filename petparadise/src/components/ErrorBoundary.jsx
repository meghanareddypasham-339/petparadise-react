import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI message={this.state.error?.message} onReset={() => this.setState({ hasError: false, error: null })} />;
    }
    return this.props.children;
  }
}

// Fallback presenter component
function FallbackUI({ message, onReset }) {
  return (
    <div style={{
      minHeight: "60vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "40px",
      textAlign: "center"
    }}>
      <h2 style={{ color: "#2d6a4f", marginBottom: "12px", fontFamily: "Lora, serif" }}>
        Something went wrong
      </h2>
      <p style={{ color: "#666", marginBottom: "24px", fontSize: "0.9rem" }}>
        {message || "An unexpected error occurred."}
      </p>
      <button onClick={onReset} style={{
        background: "#2d6a4f", color: "#fff", border: "none",
        borderRadius: "8px", padding: "10px 24px", cursor: "pointer",
        fontSize: "0.9rem"
      }}>
        Try Again
      </button>
    </div>
  );
}

export default ErrorBoundary;

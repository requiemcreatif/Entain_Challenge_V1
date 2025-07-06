import React, { Component, ReactNode } from "react";
import { Box, Typography, Button, Alert } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            padding: 3,
            textAlign: "center",
          }}
        >
          <ErrorOutline sx={{ fontSize: 64, color: "error.main", mb: 2 }} />

          <Typography variant="h5" gutterBottom>
            Oops! Something went wrong
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We're sorry, but something unexpected happened. Please try
            refreshing the page.
          </Typography>

          <Button variant="contained" onClick={this.handleReset} sx={{ mb: 2 }}>
            Try Again
          </Button>

          <Button variant="outlined" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <Alert
              severity="error"
              sx={{ mt: 3, textAlign: "left", width: "100%" }}
            >
              <Typography
                variant="body2"
                component="pre"
                sx={{ whiteSpace: "pre-wrap" }}
              >
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </Typography>
            </Alert>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

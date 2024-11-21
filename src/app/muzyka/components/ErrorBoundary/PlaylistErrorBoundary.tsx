import React, { Component, ErrorInfo, ReactNode } from "react";
import { errorLogger } from "../../utils/errorLogger";
import { ErrorLogBuffer } from "../../utils/ErrorLogBuffer";

interface Props {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  fallback?: ReactNode;
  maxRetries?: number;
}

interface ErrorHistoryEntry {
  timestamp: number;
  errorType: "youtube" | "playback" | "general";
  code?: number;
  retryCount: number;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorType: "youtube" | "playback" | "general";
  retryCount: number;
  lastErrorTimestamp: number;
  errorHistory: ErrorHistoryEntry[];
}

export class PlaylistErrorBoundary extends Component<Props, State> {
  private static errorBuffer = ErrorLogBuffer.getInstance();
  private readonly DEFAULT_MAX_RETRIES = 3;
  private readonly ERROR_RESET_TIME = 5 * 60 * 1000;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorType: "general",
      retryCount: 0,
      lastErrorTimestamp: Date.now(),
      errorHistory: []
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorEntry = {
      timestamp: Date.now(),
      errorType: this.state.errorType,
      retryCount: this.state.retryCount
    };

    errorLogger.logError({
      type: "general",
      severity: "error",
      message: error.message || "Nieznany błąd",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      details: {
      
        stack: error.stack || undefined,
        retryCount: this.state.retryCount,
        errorHistory: this.state.errorHistory,

      }
    });

    this.setState(prevState => ({
      hasError: true,
      error,
      errorHistory: [...prevState.errorHistory, errorEntry]
    }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 rounded-lg">
          <h2 className="text-red-700 font-semibold mb-2">
            Wystąpił problem podczas ładowania playlist
          </h2>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Spróbuj ponownie
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
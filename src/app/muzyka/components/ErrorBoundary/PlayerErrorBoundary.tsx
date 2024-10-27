// src/app/muzyka/components/ErrorBoundary/PlayerErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";
import { YouTubeError, YouTubeErrorCode } from "../../utils/youtube";
import { errorLogger } from "../../utils/errorLogger";

interface Props {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  fallback?: ReactNode;
  retryCount?: number;
  maxRetries?: number;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorType: "youtube" | "playback" | "general";
  retryCount: number;
  lastErrorTimestamp: number;
}

export class PlayerErrorBoundary extends Component<Props, State> {
  private readonly DEFAULT_MAX_RETRIES = 3;
  private readonly ERROR_RESET_TIME = 5 * 60 * 1000; // 5 minut

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorType: "general",
      retryCount: 0,
      lastErrorTimestamp: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorType = error instanceof YouTubeError ? "youtube" : "playback";
    return {
      hasError: true,
      error,
      errorType,
      lastErrorTimestamp: Date.now()
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { retryCount, lastErrorTimestamp } = this.state;
    const maxRetries = this.props.maxRetries || this.DEFAULT_MAX_RETRIES;
    
    // Resetuj licznik prób po określonym czasie
    if (Date.now() - lastErrorTimestamp > this.ERROR_RESET_TIME) {
      this.setState({ retryCount: 0 });
    }

    errorLogger.logError({
      type: error instanceof YouTubeError ? "youtube" : "playback",
      severity: this.determineErrorSeverity(error),
      message: error.message,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      details: {
        code: error instanceof YouTubeError ? error.code : undefined,
        stack: error.stack || undefined, // Konwertujemy null na undefined
        componentStack: errorInfo.componentStack || undefined,
        retryCount,
        maxRetries,
        additionalInfo: {
          lastErrorTimestamp: this.state.lastErrorTimestamp,
          errorType: this.state.errorType
        }
      }
    });

    this.props.onError?.(error, errorInfo);
  }

  private determineErrorSeverity(error: Error): "error" | "warning" | "critical" {
    if (error instanceof YouTubeError) {
      switch (error.code) {
        case YouTubeErrorCode.VIDEO_NOT_FOUND:
        case YouTubeErrorCode.EMBED_NOT_ALLOWED:
          return "warning";
        case YouTubeErrorCode.HTML5_ERROR:
          return "critical";
        default:
          return "error";
      }
    }
    return "error";
  }

  private handleRetry = () => {
    const { retryCount } = this.state;
    const maxRetries = this.props.maxRetries || this.DEFAULT_MAX_RETRIES;

    if (retryCount < maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        retryCount: prevState.retryCount + 1
      }));
    } else {
      window.location.reload();
    }
  };

  private getFallbackUI() {
    if (this.props.fallback) {
      return this.props.fallback;
    }

    const { errorType, retryCount } = this.state;
    const maxRetries = this.props.maxRetries || this.DEFAULT_MAX_RETRIES;
    const canRetry = retryCount < maxRetries;

    const errorMessages = {
      youtube: "Wystąpił problem z odtwarzaczem YouTube. Spróbuj odświeżyć stronę.",
      playback: "Wystąpił problem z odtwarzaniem. Spróbuj ponownie za chwilę.",
      general: "Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę."
    };

    return (
      <div className="p-4 bg-red-50 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <svg
            className="w-6 h-6 text-red-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-red-800">
            {errorMessages[errorType]}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={this.handleRetry}
            className={`px-4 py-2 rounded transition-colors ${
              canRetry
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-gray-100 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!canRetry}
          >
            {canRetry ? "Spróbuj ponownie" : "Odśwież stronę"}
          </button>
          {retryCount > 0 && (
            <span className="text-sm text-gray-500 self-center">
              Próba {retryCount} z {maxRetries}
            </span>
          )}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.getFallbackUI();
    }

    return this.props.children;
  }
}

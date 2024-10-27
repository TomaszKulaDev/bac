// src/app/muzyka/utils/errorLogger.ts
export interface BaseErrorLog {
  type: "youtube" | "playback" | "general";
  severity: "error" | "warning" | "critical";
  message: string;
  timestamp: string;
  environment: string;
  details?: {
    code?: number;
    stack?: string;
    componentStack?: string;
    retryCount?: number;
    maxRetries?: number;
    additionalInfo?: Record<string, unknown>;
    errorHistory?: Array<{
      timestamp: number;
      errorType: "youtube" | "playback" | "general";
      code?: number;
      retryCount: number;
    }>;
  };
}

export interface SystemInfo {
  userAgent: string;
  platform: string;
  language: string;
  screenResolution: string;
  timeZone: string;
  deviceMemory?: number;
  connectionType?: string;
}

export interface ErrorDetails {
  code?: number;
  stack?: string;
  componentStack?: string;
  context?: string;
  additionalData?: Record<string, unknown>;
}

export interface FullErrorLog extends BaseErrorLog {
  systemInfo: SystemInfo;
  details: ErrorDetails;
  sessionId: string;
  userId?: string;
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private readonly API_ENDPOINT = "/api/logs/error";
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000;

  private constructor() {}

  static getInstance(): ErrorLogger {
    if (!this.instance) {
      this.instance = new ErrorLogger();
    }
    return this.instance;
  }

  private getSystemInfo(): SystemInfo {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      deviceMemory: (navigator as any).deviceMemory,
      connectionType: (navigator as any).connection?.type
    };
  }

  private async retryWithBackoff(
    fn: () => Promise<Response>, 
    retries: number
  ): Promise<Response> {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
        return this.retryWithBackoff(fn, retries - 1);
      }
      throw error;
    }
  }

  private enrichError(errorLog: BaseErrorLog): FullErrorLog {
    const userId = localStorage.getItem('userId');
    return {
      ...errorLog,
      systemInfo: this.getSystemInfo(),
      details: {},
      sessionId: sessionStorage.getItem('sessionId') || crypto.randomUUID(),
      userId: userId || undefined, // Konwertujemy null na undefined
      environment: process.env.NODE_ENV || 'development'
    };
  }

  async logError(errorLog: BaseErrorLog & Partial<ErrorDetails>): Promise<void> {
    try {
      const enrichedLog = this.enrichError(errorLog);
      
      const response = await this.retryWithBackoff(
        () => fetch(this.API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Error-Type": errorLog.type,
            "X-Error-Severity": errorLog.severity
          },
          body: JSON.stringify(enrichedLog),
        }),
        this.MAX_RETRIES
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Lokalne logowanie dla środowiska deweloperskiego
      if (process.env.NODE_ENV === 'development') {
        console.group('Error Log');
        console.error(enrichedLog);
        console.groupEnd();
      }
    } catch (error) {
      console.error("Failed to log error:", {
        originalError: errorLog,
        loggingError: error
      });

      // Zapisz do localStorage jako fallback
      this.saveToLocalStorage(errorLog);
    }
  }

  private saveToLocalStorage(errorLog: BaseErrorLog): void {
    try {
      const key = `error_log_${Date.now()}`;
      const existingLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
      existingLogs.push({ ...errorLog, key });
      localStorage.setItem('errorLogs', JSON.stringify(existingLogs.slice(-10)));
    } catch (error) {
      console.error('Failed to save error to localStorage:', error);
    }
  }
}

export const errorLogger = ErrorLogger.getInstance();

import { BaseErrorLog } from './errorLogger';
import { errorLogger } from './errorLogger';

export class ErrorLogBuffer {
  private buffer: BaseErrorLog[] = [];
  private readonly maxSize = 10;
  private readonly flushInterval = 5000;
  private flushTimer: NodeJS.Timeout | null = null;
  private static instance: ErrorLogBuffer;
  private readonly MAX_RETRY_ATTEMPTS = 3;
  private retryCount = 0;

  private constructor() {
    this.startFlushTimer();
  }

  static getInstance(): ErrorLogBuffer {
    if (!this.instance) {
      this.instance = new ErrorLogBuffer();
    }
    return this.instance;
  }

  private startFlushTimer() {
    this.flushTimer = setInterval(() => {
      if (this.buffer.length > 0) {
        this.flush();
      }
    }, this.flushInterval);
  }

  add(log: BaseErrorLog) {
    this.buffer.push(log);
    if (this.buffer.length >= this.maxSize) {
      this.flush();
    }
  }

  private async flush() {
    if (this.buffer.length === 0) return;

    const logsToSend = [...this.buffer];
    this.buffer = [];

    try {
      await Promise.all(
        logsToSend.map(log => 
          this.retryWithBackoff(() => errorLogger.logError(log))
        )
      );
      this.retryCount = 0; // Reset po sukcesie
    } catch (error) {
      this.retryCount++;
      if (this.retryCount < this.MAX_RETRY_ATTEMPTS) {
        this.buffer = [...this.buffer, ...logsToSend];
        console.error('Błąd podczas wysyłania logów, próba:', this.retryCount);
      } else {
        console.error('Przekroczono limit prób wysyłania logów');
        // Zapisz do localStorage jako fallback
        this.saveToLocalStorage(logsToSend);
      }
    }
  }

  private async retryWithBackoff(fn: () => Promise<void>): Promise<void> {
    for (let i = 0; i < this.MAX_RETRY_ATTEMPTS; i++) {
      try {
        await fn();
        return;
      } catch (error) {
        if (i === this.MAX_RETRY_ATTEMPTS - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }

  private saveToLocalStorage(logs: BaseErrorLog[]): void {
    try {
      const key = `error_logs_${Date.now()}`;
      localStorage.setItem(key, JSON.stringify(logs));
    } catch (error) {
      console.error('Błąd podczas zapisywania do localStorage:', error);
    }
  }

  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flush();
    }
  }
}

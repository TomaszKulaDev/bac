import { BaseErrorLog } from './errorLogger';
import { errorLogger } from './errorLogger';

export class ErrorLogBuffer {
  private buffer: BaseErrorLog[] = [];
  private readonly maxSize = 10;
  private readonly flushInterval = 5000;
  private flushTimer: NodeJS.Timeout | null = null;
  private static instance: ErrorLogBuffer;

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
      await Promise.all(logsToSend.map(log => errorLogger.logError(log)));
    } catch (error) {
      this.buffer = [...this.buffer, ...logsToSend];
      console.error('Błąd podczas wysyłania logów:', error);
    }
  }

  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flush();
    }
  }
}

export interface BrowserInfo {
    userAgent: string;
    platform: string;
    language: string;
    screenResolution: string;
    timeZone: string;
  }
  
  export interface ErrorDetails {
    code: number;
    message: string;
    details?: string;
    timestamp: string;
  browserInfo: BrowserInfo;
}

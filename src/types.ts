export enum LogLevel {
  VERBOSE,
  INFO,
  WARNING,
  ERROR,
  DEBUG,
}

export interface LoggerConfig {
  logLevel?: LogLevel;
  logFormat?: string;
  logFilePath?: string;
}

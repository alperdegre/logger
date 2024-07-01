export enum LogLevel {
  VERBOSE,
  INFO,
  WARNING,
  ERROR,
  DEBUG,
}

export enum LogColor {
  VERBOSE = "\x1b[34m",
  INFO = "\x1b[36m",
  WARNING = "\x1b[33m",
  ERROR = "\x1b[31m",
  DEBUG = "\x1b[35m",
}

export interface LoggerConfig {
  level?: LogLevel;
  format?: string;
  filePath?: string;
  colorized?: boolean;
}

export type LogMessage = {
  level: LogLevel;
  message: string;
  extra?: any;
};

export type SerializedLog = string;

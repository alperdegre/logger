import { LogLevel } from "./types";

export default class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private logFormat: string;
  private logFilePath: string;

  private constructor() {
    this.logLevel = LogLevel.INFO;
    this.logFormat = "";
    this.logFilePath = "/logs";
  }

  // Function to make it a singleton
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public static log(level: LogLevel, message: string, extra?: any): void {
    // This will send a log message
  }

  public static async logAsync(
    level: LogLevel,
    message: string,
    extra?: any
  ): Promise<void> {
    // This will be used for async logging
  }

  public static config() {
    // This will be used to configure logger
  }

  private formatMessage(level: LogLevel, message: string, extra?: any): string {
    // This will format the message according to logFormat
    return "";
  }

  private writeToFile(message: string): void {
    // This will append the latest log to the end of the file
  }
}

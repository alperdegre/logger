import { DEFAULT_LOG_FILE_PATH, DEFAULT_LOG_FORMAT } from "./constants";
import { LogLevel, LoggerConfig } from "./types";

export default class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private logFormat: string;
  private logFilePath: string;

  /**
   * Private constructor to prevent instantiation.
   */
  private constructor() {
    this.logLevel = LogLevel.INFO;
    this.logFormat = DEFAULT_LOG_FORMAT;
    this.logFilePath = DEFAULT_LOG_FILE_PATH;
  }

  /**
   * Gets the singleton instance of the Logger.
   * @returns {Logger} The singleton instance of the Logger.
   */
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

  /**
   * Configures the logger.
   * @param {LoggerConfig} configuration - The configuration object. Updates only the given configuration values.
   */
  public static configure(configuration: LoggerConfig) {
    const { logLevel, logFormat, logFilePath } = configuration;
    const logger = Logger.getInstance();

    if (logLevel) {
      logger.logLevel = logLevel;
    }

    if (logFormat) {
      logger.logFormat = logFormat;
    }

    if (logFilePath) {
      logger.logFilePath = logFilePath;
    }
  }

  private formatMessage(level: LogLevel, message: string, extra?: any): string {
    // This will format the message according to logFormat
    return "";
  }

  private writeToFile(message: string): void {
    // This will append the latest log to the end of the file
  }
}

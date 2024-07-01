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

  /**
   * Synchronously logs a message with a specified log level.
   * @param {string} message - The message to log
   * @param {LogLevel} [level] - The level of the log (e.g., INFO, WARNING, ERROR). If not set, defaults to configured log level for the Logger instance.
   * @param {any} [extra] - Any extra message to be appended to the end of the log
   */
  public static log(message: string, level?: LogLevel, extra?: any): void {
    const logger = Logger.getInstance();

    const currentLogLevel = level ?? logger.logLevel;
    const formattedMessage = logger.formatMessage(
      currentLogLevel,
      message,
      extra
    );
    console.log(formattedMessage);
    // Maybe append to file here?
  }

  /**
   * Synchronously logs a message in VERBOSE level.
   * @param {string} message - The message to log
   * @param {any} [extra] - Any extra message to be appended to the end of the log
   */
  public static verbose(message: string, extra?: any): void {
    Logger.log(message, LogLevel.VERBOSE, extra);
  }

  /**
   * Synchronously logs a message in INFO level.
   * @param {string} message - The message to log
   * @param {any} [extra] - Any extra message to be appended to the end of the log
   */
  public static info(message: string, extra?: any): void {
    Logger.log(message, LogLevel.INFO, extra);
  }

  /**
   * Synchronously logs a message in WARNING level.
   * @param {string} message - The message to log
   * @param {any} [extra] - Any extra message to be appended to the end of the log
   */
  public static warning(message: string, extra?: any): void {
    Logger.log(message, LogLevel.WARNING, extra);
  }

  /**
   * Synchronously logs a message in ERROR level.
   * @param {string} message - The message to log
   * @param {any} [extra] - Any extra message to be appended to the end of the log
   */
  public static error(message: string, extra?: any): void {
    Logger.log(message, LogLevel.ERROR, extra);
  }

  /**
   * Synchronously logs a message in DEBUG level.
   * @param {string} message - The message to log
   * @param {any} [extra] - Any extra message to be appended to the end of the log
   */
  public static debug(message: string, extra?: any): void {
    Logger.log(message, LogLevel.DEBUG, extra);
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

  /**
   * Formats the message according to settings
   * @param {LogLevel} level - The level of logging (e.g., TRACE, DEBUG, INFO, WARNING, ERROR).
   * @param {string} message - The message to log
   * @param {any} [extra] - Any extra message to be appended to the end of the log
   */
  private formatMessage(level: LogLevel, message: string, extra?: any): string {
    const timestamp = new Date().toISOString();
    const logLevel = LogLevel[level];
    let formattedMessage = this.logFormat
      .replace("{{timestamp}}", timestamp)
      .replace("{{level}}", logLevel)
      .replace("{{message}}", message);

    if (extra) {
      formattedMessage += ` | Extra : ${JSON.stringify(extra, null, 2)}`;
    }

    return formattedMessage;
  }

  private writeToFile(message: string): void {
    // This will append the latest log to the end of the file
  }
}

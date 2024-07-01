import {
  DEFAULT_COLORIZED,
  DEFAULT_LOG_FILE_PATH,
  DEFAULT_LOG_FORMAT,
} from "./constants";
import { appendToFile, appendToFileAsync, colorizeMessage } from "./helpers";
import { LogLevel, LogMessage, LoggerConfig } from "./types";

export default class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private logFormat: string;
  private logFilePath: string;
  private logQueue: LogMessage[] = [];
  private processingQueue: boolean = false;
  private isColorized: boolean;

  /**
   * Private constructor to prevent instantiation.
   */
  private constructor() {
    this.logLevel = LogLevel.INFO;
    this.logFormat = DEFAULT_LOG_FORMAT;
    this.logFilePath = DEFAULT_LOG_FILE_PATH;
    this.isColorized = DEFAULT_COLORIZED;
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
    let formattedMessage = logger.formatMessage(
      currentLogLevel,
      message,
      extra
    );

    appendToFile(logger.logFilePath, formattedMessage);

    if (logger.isColorized)
      formattedMessage = colorizeMessage(formattedMessage, currentLogLevel);

    console.log(formattedMessage);
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

  /**
   * Asynchronously logs a message with a specified log level.
   * @param {string} message - The message to log
   * @param {LogLevel} [level] - The level of the log (e.g., INFO, WARNING, ERROR). If not set, defaults to configured log level for the Logger instance.
   * @param {any} [extra] - Any extra message to be appended to the end of the log
   * @returns {Promise<void>} A promise that resolves after message gets logged
   */
  public static async logAsync(
    message: string,
    level?: LogLevel,
    extra?: any
  ): Promise<void> {
    const logger = Logger.getInstance();
    const currentLogLevel = level ?? logger.logLevel;

    logger.logQueue.push({ level: currentLogLevel, message, extra });
    if (!logger.processingQueue) {
      logger.processLogQueue();
    }
  }

  /**
   * Asynchronously processes the log queue.
   * @private
   * @returns {Promise<void>} A promise that resolves after the queue is processed
   */
  private async processLogQueue(): Promise<void> {
    this.processingQueue = true;
    while (this.logQueue.length > 0) {
      const logMessage = this.logQueue.shift();
      if (!logMessage) break;

      const currentLogLevel = logMessage.level ?? this.logLevel;
      let formattedMessage = this.formatMessage(
        currentLogLevel,
        logMessage.message,
        logMessage.extra
      );

      appendToFileAsync(this.logFilePath, formattedMessage);

      if (this.isColorized)
        formattedMessage = colorizeMessage(formattedMessage, currentLogLevel);

      console.log(formattedMessage);
    }
    this.processingQueue = false;
  }

  /**
   * Configures the logger.
   * @param {LoggerConfig} configuration - The configuration object. Updates only the given configuration values.
   */
  public static configure(configuration: LoggerConfig) {
    const { level, format, filePath, colorized } = configuration;
    const logger = Logger.getInstance();

    if (level) logger.logLevel = level;
    if (format) logger.logFormat = format;
    if (filePath) logger.logFilePath = filePath;
    if (colorized) logger.isColorized = colorized;
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

    if (extra)
      formattedMessage += ` | Extra : ${JSON.stringify(extra, null, 2)}`;

    return formattedMessage;
  }
}

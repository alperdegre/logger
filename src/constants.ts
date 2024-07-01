import { LogColor, LogLevel } from "./types";

export const DEFAULT_LOG_FORMAT = "[{{level}}] [{{timestamp}}] {{message}}";
export const DEFAULT_LOG_FILE_PATH = "/logs";
export const DEFAULT_COLORIZED = false;

export const LOG_COLORS: Record<LogLevel, LogColor> = {
  [LogLevel.INFO]: LogColor.INFO,
  [LogLevel.DEBUG]: LogColor.DEBUG,
  [LogLevel.WARNING]: LogColor.WARNING,
  [LogLevel.ERROR]: LogColor.ERROR,
  [LogLevel.VERBOSE]: LogColor.VERBOSE,
};

export const RESET_COLOR = "\x1b[0m";

export const BATCH_TRESHOLD = 100;
export const BATCH_INTERVAL = 1000;
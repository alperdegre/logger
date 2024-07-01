import { LOG_COLORS, RESET_COLOR } from "./constants";
import { LogLevel } from "./types";
import { appendFile } from "node:fs/promises";
import { appendFileSync, mkdirSync } from "node:fs";
import { join } from "path";

export function colorizeMessage(message: string, level: LogLevel): string {
  return LOG_COLORS[level] + message + RESET_COLOR;
}

export function appendToFile(filePath: string, message: string) {
  const logPath = getLogFilePath(filePath);
  appendFileSync(logPath, message + "\n");
}

export async function appendToFileAsync(filePath: string, message: string) {
  const logPath = getLogFilePath(filePath);
  try {
    await appendFile(logPath, message + "\n");
  } catch (err: any) {
    console.error(`Error appending to ${filePath}: ${err.message}`);
  }
}

function createDirIfNotExists(filePath: string) {
  const directory = join(process.cwd(), filePath);
  mkdirSync(directory, { recursive: true });

  return directory;
}

function getLogFilePath(filePath: string) {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear().toString();

  const fileName = `${day}-${month}-${year}-logs`;

  const directory = createDirIfNotExists(filePath);
  const logPath = directory + `/${fileName}.txt`;

  return logPath;
}

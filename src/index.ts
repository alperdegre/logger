import Logger from "./logger";
import { LogLevel } from "./types";

function main() {
  console.log("Initial setup");
  Logger.log("Application started");
  Logger.log(LogLevel.INFO, "Application started");
}

main();

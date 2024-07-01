import Logger from "./logger";
import { LogLevel } from "./types";

function main() {
  console.log("Initial setup");
  Logger.log("Application started", LogLevel.DEBUG);
  Logger.error("This is an error")
}

main();

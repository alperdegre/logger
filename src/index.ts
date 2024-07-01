import Logger from "./logger";
import { LogLevel } from "./types";

const TEST_OBJECT = {
  name: "Test",
  surname: "Surname",
  address: "Address",
};

async function main() {
  console.log("Sync Logging");
  Logger.log("Application started", LogLevel.DEBUG);
  Logger.error("This is an error");
  Logger.debug("Test With Extra", TEST_OBJECT);
  Logger.debug(JSON.stringify(TEST_OBJECT, null, 2));
  console.log("Async Logging");

  // Time intensive work returs an error message to be logged
  setTimeout(() => {
    Logger.logAsync("An error occurred", LogLevel.ERROR);
  }, 1000);

  // Non blocking test that logs an object after it is done
  setTimeout(() => {
    Logger.logAsync("Test With Extra", LogLevel.DEBUG, TEST_OBJECT);
  }, 1500);

  Logger.warning("Sync log while waiting for async logs");
}

main();

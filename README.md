# Logger

The `Logger` class provides a flexible and configurable logging mechanism in TypeScript.

## Features

- Supports logging messages with different log levels (INFO, WARNING, ERROR, DEBUG, VERBOSE).
- Configurable log formatting, including timestamp and log level.
- Does batch writes while writing to files so it doesnt run file write operations on every log.
- Optional asynchronous logging to handle logging operations without blocking the main thread.
- Optionally colorizes output log messages based on log levels.

## Usage

### Installation

The `Logger` class can be used directly in your TypeScript projects. This project can be easily converted into a package to be downloaded from npm registry.
For now it is required to copy the files and import `Logger` class to use it.

You can run `npm build` to build the project or just type `npm start` and it will execute the logging operations that can be found in `src/index.ts`

### Example Usage

```typescript
import Logger from "./logger";
import { LogLevel } from "./types";

// Configure logger (optional)
Logger.configure({
  logLevel: LogLevel.DEBUG,
  filePath: "/path/to/logs",
  colorized: true,
});

// Log messages
Logger.info("This is an informational message.");
Logger.warn("This is a warning message.");
Logger.error("This is an error message.");
Logger.debug("This is a debug message.");

// Asynchronous logging example
Logger.logAsync("Asynchronous log message", LogLevel.INFO);

// Example with an extra object
const TEST_OBJECT = {
  name: "Test",
  surname: "Surname",
  address: "Address",
};
Logger.log("Test With Extra", LogLevel.INFO, TEST_OBJECT);
```

### Configuration

The `Logger` class can be configured using the `Logger.configure()` method to set default log level, log file path, log format, and enable/disable log colorization.

#### Log Level

Log level for the `Logger` class can be one of the following.

- `VERBOSE`
- `INFO`
- `WARNING`
- `ERROR`
- `DEBUG`

#### Log Format

Log format is a string that contains special keywords which will be used to format every row of the log messages. Default is `"[{{level}}] [{{timestamp}}] {{message}}"`
Can be updated by changing it into another string containing the special keywords `{{level}}`, `{{timestamp}}`, `{{message}}`.

#### File Path

File path is the default file path relative to the current folder for the logger to save it's logs into. Defaults to `/logs` folder of the current directory.
It will automatically create the directory if it does not exist when logging for the first time.

#### Colorized

A boolean value to indicate whether or not the logs should be colorized in console. Uses ANSI escape codes to colorize every row. Can be customized by changing the default values in the constants folder.

### Methods

#### `Logger.log(message: string, level?: LogLevel, extra?: any): void`

Synchronously logs a message with the specified log level.

- `message` (string): The message to log.
- `level` (LogLevel, optional): The log level (e.g., INFO, WARNING, ERROR). Defaults to configured log level.
- `extra` (any, optional): Additional data to append to the log message.

There are also shorter functions that automatically set their log level for easier use. These are

- `Logger.verbose(message:string, extra?:any):void`
- `Logger.info(message:string, extra?:any):void`
- `Logger.warning(message:string, extra?:any):void`
- `Logger.error(message:string, extra?:any):void`
- `Logger.debug(message:string, extra?:any):void`

#### `Logger.logAsync(message: string, level?: LogLevel, extra?: any): Promise<void>`

Asynchronously logs a message with the specified log level.

- `message` (string): The message to log.
- `level` (LogLevel, optional): The log level (e.g., INFO, WARNING, ERROR). Defaults to configured log level.
- `extra` (any, optional): Additional data to append to the log message.
- Returns: Promise<void> - A promise that resolves when the message is logged.

#### `Logger.configure(configuration: LoggerConfig): void`

Configures the logger with given settings.

- `logLevel` (LogLevel, optional): Default log level for the logger.
- `format` (string, optional): Format string for log messages.
- `filePath` (string, optional): File path for logging.
- `colorized` (boolean, optional): Whether log messages should be colorized.

### Design Process and Further Improvements

I will provide some insight on my thought process on how I wanted to design the `Logger` class. 

I used static functions for public functions so it imitates behavior similar to console.log(). It is a singleton class that instantiates itself upon trying to log so no unnecessary instances of it will be created. Logging can be done instantly while writing to file is done via batched writes. This is because write operations take longer so it doesn't constantly try to open and write to a file. It also writes every day's logs to its own file so logs can be archived and searched easier when needed.

#### Write Queue

Writing to file logic can be further improved by implementing a queue logic that processes write operations with some time between them. Because in current implementation we batch logs together until they reach a treshold. If the amount of logs reach the treshold we write them instantly, if they dont we set a timeout so write operation occurs after a second passes. But in high load scenarios where millions of logs need to be logged in a second, we may need to implement a queue logic so batched writes get put into a queue and processed with time between them to reduce the load.

#### Configurable Timestamps

In current implementation timestamp format cannot be configured and it is just;

```typescript
const timestamp = new Date().toISOString()
```

This can be further improved by adding a configurable timestamp string and parsing it to how user wants it. Or we can use a package like moment.js to format the timestamp according to the given user string.

#### Configurable Logging to Console According to Log Level

In current implementation any log of any kind gets printed to the console as well as written to a file. This can be changed so `Logger` writes logs to console depending on their log level while writing every log into file. For example this would allow developer to configure the `Logger` to only show logs in the console that are Error or above in their priority level. This can be easily implemented as current log level is already an enum so number equivalent of the enum can be used to filter logs on `log` and `logAsync` functions
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

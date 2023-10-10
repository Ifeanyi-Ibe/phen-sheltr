const { format, createLogger, transports } = require("winston");

const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "User service logs";

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

module.exports = logger;

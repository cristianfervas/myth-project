const winston = require('winston');
const { combine, timestamp, printf, colorize } = winston.format;
const DailyRotateFile = require('winston-daily-rotate-file');

const transport = new DailyRotateFile({
  filename: 'app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  dirname: 'logs',
  zippedArchive: true,
});

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(colorize(), timestamp(), logFormat),
  transports: [transport, new winston.transports.Console()],
});

module.exports = logger;

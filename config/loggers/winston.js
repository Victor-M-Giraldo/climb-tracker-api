import winston from 'winston';
const { combine, timestamp, printf, colorize, align, errors } = winston.format;

const logger = winston.createLogger({
  level: 'http',
  format: combine(
    colorize({ level: true }),
    errors({ stack: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

export default logger;

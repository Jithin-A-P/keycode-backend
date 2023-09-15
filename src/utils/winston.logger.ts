import winston from 'winston'
import { format } from 'winston'
const { timestamp, combine, printf } = format

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`
})

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), logFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
})

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green'
})

if (process.env.NODE_ENV !== 'production') {
  winston.format.colorize()
  logger.add(
    new winston.transports.Console({
      format: winston.format.colorize(),
    })
  )
}

export default logger

import { NextFunction, Request, Response } from 'express'
import logger from '../utils/winston.logger'
import { randomUUID } from 'crypto'

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.locals.traceId = randomUUID()
  res.locals.startTime = new Date().getTime()

  logger.log({
    level: 'info',
    traceId: res.locals.traceId,
    message: `${res.locals.traceId} : ${req.url} : ${req.method}`,
  })
  next()
}

export default loggerMiddleware

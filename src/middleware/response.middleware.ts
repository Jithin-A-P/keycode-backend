import { NextFunction, Request, Response } from 'express'
import HttpStatusMessages from '../utils/http-status-messages'
import logger from '../utils/winston.logger'
import { isArray } from 'class-validator'

const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.statusMessage = HttpStatusMessages[`CODE_${res.statusCode}`]
    const data = res.locals.data
    const total = res.locals.total
    const length = isArray(data) ? data.length : 0
    const responseBody = {
      data: data,
      message: res.statusMessage,
      errors: res.locals.errors,
      meta: {
        length: length,
        took: new Date().getTime() - res.locals.startTime,
        total: total || length,
      },
    }
    logger.log({
      level: 'info',
      timeStamp: new Date(),
      traceId: res.locals.traceId,
      message: `${res.locals.traceId} : ${req.url} : ${req.method} : ${res.statusCode}`,
    })
    res.send(responseBody)
    next()
  } catch (error) {
    if (res.locals.errors.length > 0) res.locals.push(error)
    else res.locals.errors = [error]
    next(error)
  }
}

export default responseMiddleware

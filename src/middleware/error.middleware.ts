import { NextFunction, Request, Response } from 'express'
import HttpException from '../exception/http.exception'
import ValidationException from '../exception/validation.exception'
import logger from '../utils/winston.logger'
import HttpStatusMessages from '../utils/http-status-messages'
import { QueryFailedError } from 'typeorm'

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.log({
      level: 'error',
      message: `${res.locals.traceId} : ${error.message}`,
    })

    res.status(500)
    res.statusMessage = HttpStatusMessages['CODE_500']

    if (error instanceof ValidationException) {
      res.statusMessage = HttpStatusMessages[`CODE_${error.status}`]
      res.status(error.status).send(error.errorPayload)
      
    }

    if (error instanceof HttpException) {
      res.status(error.status)
      res.statusMessage = HttpStatusMessages[`CODE_${error.status}`]
      res.locals.errors = error.message
      
    }

    if (error instanceof QueryFailedError) {
      const emailAlreadyExists = /(email)[\s\S]+(already exists)/.test(
        (error as any).detail
      )

      if (emailAlreadyExists) {
        res.status(400)
        res.statusMessage = HttpStatusMessages[`CODE_400`]
        res.locals.errors = 'Account with this email already exists'
      }
    }

    res.send({ 
      data: null,
      error: res.statusMessage,
      message: res.locals.errors || error.message,
      meta: {
        took: new Date().getTime() - res.locals.startTime
      }
    })
  } catch (error) {
    next(error)
  }
}

export default errorMiddleware

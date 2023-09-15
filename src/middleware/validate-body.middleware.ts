import { NextFunction, Response } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import ValidationException from '../exception/validation.exception'
import RequestWithUser from '../utils/request-with-user.interface'

const validateBody = (DtoClass) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const dto = plainToInstance(DtoClass, req.body)
      const errors = await validate(dto)
      if (errors.length > 0) throw new ValidationException(errors)
      
      req.body = dto
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default validateBody
import { NextFunction, Response } from 'express'
import RequestWithUser from '../utils/request-with-user.interface'
import BadRequestException from '../exception/bad-request.exception'

const validateQuery = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const rowsPerPage = Number(req.query.rowsPerPage)
    const pageNumber = Number(req.query.pageNumber)

    if (req.query.rowsPerPage) {
      if (isNaN(rowsPerPage))
        throw new BadRequestException('Invalid query parameter: rowsPerPage')
    }

    if (req.query.pageNumber) {
      if (isNaN(pageNumber))
        throw new BadRequestException('Invalid query parameter: pageNumber')
    }

    next()
  } catch (error) {
    next(error)
  }
}

export default validateQuery

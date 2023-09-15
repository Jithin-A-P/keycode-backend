import { NextFunction, Request, Response } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import JwtPayload from '../utils/jwt-payload.type'
import RequestWithUser from '../utils/request-with-user.interface'
import HttpException from '../exception/http.exception'

const authenticate = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFromRequestHeader(req)
    const payload: JwtPayload = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRETE_KEY
    ) as JwtPayload
    req.name = payload.name
    req.email = payload.email
    next()
  } catch (error) {
    // if(error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError')
    //   next(new HttpException(401, 'You are not unauthorized to perform this action'))
    next(error)
  }
}

const getTokenFromRequestHeader = (req: Request) => {
  const bearerToken = req.header('Authorization')
  const token = bearerToken ? bearerToken.replace('Bearer ', '') : ''
  return token
}

export default authenticate

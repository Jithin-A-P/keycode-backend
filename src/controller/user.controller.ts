import { Router, Request, Response, NextFunction } from 'express'
import authenticate from '../middleware/authenticate.middleware'
import validateBody from '../middleware/validate-body.middleware'
import LoginDto from '../dto/login.dto'
import { isUUID } from 'class-validator'
import BadRequestException from '../exception/bad-request.exception'
import validateQuery from '../middleware/validate-query.middleware'
import UserService from '../service/user.service'
import UserDto from '../dto/user.dto'

class UserController {
  public router: Router
  constructor(private userService: UserService) {
    this.router = Router()
    this.router.get('/', authenticate, validateQuery, this.getAllUsers)
    this.router.post('/', authenticate, validateBody(UserDto), this.addUser)
    this.router.get('/:id', authenticate, this.getUserById)
    this.router.put(
      '/:id',
      authenticate,
      validateBody(UserDto),
      this.updateUserById
    )
    this.router.delete('/:id', authenticate, this.removeUserById)
    this.router.post('/login', validateBody(LoginDto), this.loginUser)
  }

  private addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addedUser = await this.userService.addUser(req.body)

      res.locals.data = addedUser
      res.status(201)
      next()
    } catch (error) {
      next(error)
    }
  }

  private getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const rowsPerPage = Number(req.query.rowsPerPage)
      const pageNumber = Number(req.query.pageNumber)

      const users = await this.userService.getAllUsers(rowsPerPage, pageNumber)

      res.locals.total = users.pop()
      res.locals.data = users.pop()
      res.status(200)
      next()
    } catch (error) {
      next(error)
    }
  }

  private getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id
      if (!isUUID(userId)) throw new BadRequestException('Invalid user id')

      const user = await this.userService.getUserById(userId)
      res.status(200)
      res.locals.data = user
      next()
    } catch (error) {
      next(error)
    }
  }

  private updateUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id
      if (!isUUID(userId)) throw new BadRequestException('Invalid user id')

      const updatedUser = await this.userService.updateUser(userId, req.body)

      res.status(200)
      res.locals.data = updatedUser
      next()
    } catch (error) {
      next(error)
    }
  }

  private removeUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id
      if (!isUUID(userId)) throw new BadRequestException('Invalid user id')

      await this.userService.removeUserById(userId)

      res.status(204)
      next()
    } catch (error) {
      next(error)
    }
  }

  private loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = await this.userService.loginUser(req.body)

      res.status(200)
      res.locals.data = token
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default UserController

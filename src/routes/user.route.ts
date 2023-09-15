import UserController from '../controller/user.controller'
import dataSource from '../db/postgres.db'
import User from '../entity/user.entity'
import UserRepository from '../repository/user.repository'
import UserService from '../service/user.service'

const userRepository = new UserRepository(
  dataSource.getRepository(User)
)
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const userRoute = userController.router

export default userRoute

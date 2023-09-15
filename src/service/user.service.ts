import bcrypt, { hash } from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import User from '../entity/user.entity'
import HttpException from '../exception/http.exception'
import UserRepository from '../repository/user.repository'
import LoginDto from '../dto/login.dto'
import NotFoundException from '../exception/not-found.exception'
import UserDto from '../dto/user.dto'

class UserService {
  constructor(private userRepository: UserRepository) {}

  public getAllUsers = (
    rowsPerPage: number,
    pageNumber: number
  ): Promise<[User[], number]> => {
    const defaultRowsPerPage = 15
    const take = rowsPerPage || defaultRowsPerPage

    const rowsToSkip = (pageNumber - 1) * take
    const skip = rowsToSkip > 0 ? rowsToSkip : 0
    return this.userRepository.findAll(skip, take)
  }

  public getUserById = async (id: string): Promise<User> => {
    const user = await this.userRepository.findById(id)
    if (!user)
      throw new NotFoundException(`User not found with id: ${id}`)
    
    return user
  }

  public removeUserById = async (id: string): Promise<User> => {
    const user = await this.userRepository.findById(id)
    return this.userRepository.remove(user)
  }

  public addUser = async (userDto: UserDto): Promise<User> => {
    const user = {
      ...userDto,
      password: await hash(userDto.password, 10),
    }

    const newUser = this.userRepository.add(user)

    return newUser
  }

  public updateUser = async (
    id: string,
    userDto: UserDto
  ): Promise<User> => {
    const user = await this.getUserById(id)

    if (!user)
      throw new NotFoundException(`User not found with id: ${id}`)

    const updatedUser = this.userRepository.update({
      ...user,
      ...userDto,
      password: await hash(userDto.password, 10),
    })

    return updatedUser
  }

  public loginUser = async (loginDto: LoginDto) => {
    const user = await this.userRepository.findByEmail(loginDto.email)
    if (!user)
      throw new HttpException(401, 'Incorrect username or password')

    const loginStatus = await bcrypt.compare(
      loginDto.password,
      user.password
    )

    if (!loginStatus)
      throw new HttpException(401, 'Incorrect username or password')

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRETE_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    })

    return { token: token }
  }
}

export default UserService

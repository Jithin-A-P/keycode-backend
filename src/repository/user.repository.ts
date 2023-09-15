import { Repository } from 'typeorm'
import User from '../entity/user.entity'

class UserRepository {
  constructor(private userRepository: Repository<User>) {}

  public findAll = (skip: number, take: number): Promise<[User[], number]> => {
    return this.userRepository.findAndCount({
      skip: skip,
      take: take,
    })
  }

  public findById = (id: string): Promise<User> => {
    return this.userRepository.findOne({
      where: { id: id },
    })
  }

  public findByEmail = (email: string): Promise<User> => {
    return this.userRepository.findOne({
      where: { email: email },
    })
  }

  public remove = (user: User): Promise<User> => {
    return this.userRepository.softRemove(user)
  }

  public add = (user: User): Promise<User> => {
    return this.userRepository.save(user)
  }

  public update = (user: User): Promise<User> => {
    return this.userRepository.save(user)
  }
}

export default UserRepository

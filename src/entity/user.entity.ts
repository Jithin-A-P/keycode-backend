import { Column, Entity } from 'typeorm'
import AbstractEntity from './absract.entity'

@Entity('user')
class User extends AbstractEntity {
  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string
}

export default User

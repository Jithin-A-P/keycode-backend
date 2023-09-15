import { Request } from 'express'

interface RequestWithUser extends Request {
  name: string
  email: string
}

export default RequestWithUser

import { ValidationError } from 'class-validator'
import HttpException from './http.exception'

class ValidationException extends HttpException {
  public errorPayload = {}
  constructor(validationErrors: ValidationError[]) {
    super(400, 'Validation Error')
    this.errorPayload['message'] = this.message
    this.errorPayload['errors'] = this.generateErrors(validationErrors)
  }

  private getErrorConstraints = (validationError: ValidationError) => {
    if (validationError.constraints)
      return Object.values(validationError.constraints)
  }

  private generateErrors = (validationErrors: ValidationError[]) => {
    const validationErrorObject = {}
    validationErrors.forEach((validationError) => {
      if (validationError.children.length > 0)
        validationErrorObject[validationError.property] = this.generateErrors(
          validationError.children
        )
      else
        validationErrorObject[validationError.property] =
          this.getErrorConstraints(validationError)
    })
    return validationErrorObject
  }
}

export default ValidationException

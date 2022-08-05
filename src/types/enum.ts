export enum Method {
  get = `get`,
  post = `post`,
  put = `put`,
  delete = `delete`,
}
export enum GenderEnum {
  male = `male`,
  female = `female`,
  other = `other`,
}
export enum CodeStatus {
  Success = 200,
  Created = 201,
  BadRequestException = 400,
  UnauthorizedException = 401,
  ForbiddenException = 403,
  NotFountException = 404,
  NotAcceptable = 406,
  Conflict = 409,
  InternalServerError = 500,
}
export type IError = {
    code: number,
    message: string
}

// todo: rewrite to enum

export const BadRequestError: IError = {
    code: 400,
    message: 'Bad request'
}

export const NotAuthorizedError: IError = {
    code: 401,
    message: 'Not authorized'
}

export const NotFoundError: IError = {
    code: 404,
    message: 'Not found'
}

export const NotAcceptableError: IError = {
    code: 406,
    message: 'Not acceptable'
}

export const ServerError: IError = {
    code: 500,
    message: 'Server error'
}

export const ForbiddenError: IError = {
    code: 403,
    message: 'Forbidden'
}

export type IError = {
    code: number,
    message: string
}

export const NotAuthorizedError: IError = {
    code: 401,
    message: 'Not authorized'
}

export const NotFoundError: IError = {
    code: 404,
    message: 'Not found'
}

export const ServerError: IError = {
    code: 500,
    message: 'Server error'
}

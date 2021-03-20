export interface Team {
    id: number,
    name: string,
    about: string | null,
    location: string | null,
    ownerId: number
}

export interface User {
    id: number,
    name: string,
    surname: string,
    nickname: string,
    email: string | null,
    about: string | null
}

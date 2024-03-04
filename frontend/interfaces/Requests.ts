export interface LoginParam {
    email: string
    password: string
}

export interface RegisterParam {
    email: string
    name: string
    password: string
}

export interface ProductGetParam {
    limit: number
    skip: number
    search?: string
    category?: string
}
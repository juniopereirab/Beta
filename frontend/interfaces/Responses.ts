import { IProduct } from "./Product"
import { IUser } from "./User"

export interface LoginReturn {
    token: string
    user: IUser
}

export interface ProductsReturn {
    limit: number
    skip: number
    total: number
    products: IProduct[]
}
import { IUser } from "./User"

export interface LoginReturn {
    token: string
    user: IUser
}
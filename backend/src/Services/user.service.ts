import { IUser, User } from "../Models/user";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { secret } from "../Config/auth.json"

class UserService {
    async login(email: string, password: string) {
        try {
            const user = await User.findOne({ email }).select('+password')
            
            if (!user) {
                return null
            }

            const isMatch: boolean = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const token: string = jwt.sign({ _id: user._id, email: user.email }, secret)
                user.password = ""
                return { token, user }
            }

            return null
        } catch (error) {
            throw error
        }
    }

    async register(data: IUser) {
        try {
            const user = await User.create(data)
            return user
        } catch (error) {
            throw error
        }
    }
}

export const userService = new UserService()
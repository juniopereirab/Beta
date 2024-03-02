import { User } from "../Models/user";
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
            console.log(error)
        }
    }
}

export const userService = new UserService()
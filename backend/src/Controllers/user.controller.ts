import { Request, Response } from 'express'
// import { UserSchemaValidate } from '../Models/user'
import { userService } from '../Services/user.service';
import { UserSchemaValidate } from '../Models/user';

class UserController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body
        try {
            if(!email){
                return res.status(400).json({error: "Email not provided"});
            }
            if(!password){
                return res.status(400).json({error: "Password not provided"});
            }

            const user = await userService.login(email, password)
            if(!user){
                return res.status(403).json({error: "Email or Password is wrong"});
            }

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({error: "Internal server error"});
        }
    }

    async register(req: Request, res: Response) {
        const { email, name, password } = req.body
        try {

            const data = { email, name, password }
            const { error } = UserSchemaValidate.validate(data)

            if (error) {
                return res.status(400).json({error: error.message})
            }

            const user = await userService.register(data)

            if(!user) {
                return res.status(400).json({ error: "Error to create user" })
            }

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}

export const userController = new UserController()
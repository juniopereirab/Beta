import { Request, Response } from 'express'
// import { UserSchemaValidate } from '../Models/user'
import { userService } from '../Services/user.service';

class UserController {
    async Login (req: Request, res: Response) {
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
        } catch (error) {
            return res.status(500).json({error: "Internal server error"});
        }
    }
}

export const userController = new UserController()
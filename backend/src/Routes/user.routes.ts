import express from "express"
import { userController } from "../Controllers/user.controller"

export const userRouter = express.Router()

userRouter.post('/login', userController.login)
userRouter.post('/register', userController.register)
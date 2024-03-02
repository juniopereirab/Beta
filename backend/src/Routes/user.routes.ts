import express from "express"
import { userController } from "../Controllers/user.controller"

export const router = express.Router()

router.post('/login', userController.Login)
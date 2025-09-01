import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { getCurrentUser } from '../controllers/user.controller.js'

export const userRouter = express.Router()

userRouter.get('/getcurrentuser',isAuth ,getCurrentUser)


import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { getCurrentUser, updateUser } from '../controllers/user.controller.js'
import upload from '../middlewares/multer.js'

export const userRouter = express.Router()

userRouter.get('/getcurrentuser',isAuth ,getCurrentUser)
userRouter.post('/profile',isAuth,upload.single("imageUrl") ,updateUser)

    
import express from 'express';
import { registerController, loginController, logoutController } from '../controllers/auth.controller';

export const authRouter = express.Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.get('/logout', logoutController);

 
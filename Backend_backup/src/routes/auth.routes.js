import express from 'express';
import { registerController, loginController, logoutController, sendOTPController, verifyOTPController, resetPasswordController, googleAuthController } from '../controllers/auth.controller.js';

export const authRouter = express.Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.get('/logout', logoutController);
authRouter.post('/send-otp', sendOTPController);
authRouter.post('/verify-otp', verifyOTPController);
authRouter.post('/reset-password', resetPasswordController); 
authRouter.post('/google-auth', googleAuthController); 
 
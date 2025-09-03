import { userModel } from "../models/user.model.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import genToken from "../utils/generateToken.js";
import { sendMail } from "../utils/sendEmail.js";

export const registerController = async(req, res) =>{
     try {
        let {name, email, password, role} = req.body;

    let isEmailExist = await userModel.findOne({email});
    if(isEmailExist) return res.status(400).json({message:'Email Already Registered!'})

    if(!validator.isEmail(email)) return res.status(400).json({message:'Enter Valid Email!'});

    if(password.length<8) return res.status(400).json({message:'Enter Strong Password!'});
    
    let hashedPassword = await bcrypt.hash(password, 10);

    let user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        role
    })
     
     let token = genToken(user);
     res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        // secure: process.env.NODE_ENV === "production", // prod mein true, dev mein false,
        sameSite: 'lax', 
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
     });
     return res.status(201).json({
        message: 'User Registered Successfully!',
        user})

     } catch (error) {
        return res.status(500).json({message: 'Error in Registering User!', error})
     }
}


export const loginController = async(req, res) =>{
    try {
        let {email, password} = req.body;

        let user = await userModel.findOne({email});
        
        if(!user) return res.status(400).json({message:'User Not Found!'})
    
        let isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched) return res.status(400).json({message:'Invalid Credentials!'});

        let token = genToken(user);
        res.cookie('token', token, {
           httpOnly: true,
           secure: false,
           // secure: process.env.NODE_ENV === "production", // prod mein true, dev mein false,
           sameSite: 'lax', 
           maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
           message: 'User Logged In Successfully!',
           user
        })
    }
    catch (error) {
        return res.status(500).json({message: 'Error in Logging In!', error})
    }


} 


export const logoutController = (req, res) =>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            // secure: process.env.NODE_ENV === "production", // prod mein true, dev mein false,
            sameSite: 'lax', 
         });
         return res.status(200).json({message: 'Logged Out Successfully!'})
    } catch (error) {
        return res.status(500).json({message: 'Error in Logging Out!', error})
    }
}


export const sendOTPController = async(req, res) =>{
    try {
        let {email} = req.body;
        let user = await userModel.findOne({email});
        if(!user) return res.status(400).json({message:'User Not Found!'})  

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        user.resetOTP = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;   // 5 minutes from now   
        user.otpVerified = false;
        await user.save();

        await sendMail(email, otp);
        return res.status(200).json({message: 'OTP Sent to Email!', email})
}
catch (error) {
        return res.status(500).json({message: 'Error in Sending OTP!', error})
    }

}


export const verifyOTPController = async (req, res) => {
    try {
       let { email, otp } = req.body;
       console.log(email, otp);
       
        let user = await userModel.findOne({email});
        console.log(user);
        
        if(!user) return res.status(400).json({message:'User Not Found!'});

        if(user.resetOTP !== otp || user.otpExpires < Date.now()){
            return res.status(400).json({message:'Invalid or Expired OTP!'});
        }
        user.otpVerified = true;
        user.resetOTP = undefined;
        user.otpExpires = undefined;
        await user.save();
        return res.status(200).json({message: 'OTP Verified Successfully!'});
   } catch (error) {
        return res.status(500).json({message: 'Error in Verifying OTP!', error})
   }   
}


export const resetPasswordController = async (req, res) => {
    try {
    let { email, newPassword } = req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.status(400).json({message:'User Not Found!'});
    if(!user.otpVerified) return res.status(400).json({message:'OTP Not Verified!'});
    if(newPassword.length<8) return res.status(400).json({message:'Enter Strong Password!'});

    let hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otpVerified = false;
    await user.save();
    return res.status(200).json({message: 'Password Reset Successfully!'});
    } catch (error) {
        return res.status(500).json({message: 'Error in Resetting Password!', error})
    }
}


export const googleAuthController = async(req, res) => {
    try {
        const {name, email, role} = req.body;
        let user = await userModel.findOne({email});

        if(!user){
            user = await userModel.create({
                name,
                email,
                role
            })
        }

// for both cases generate token : register or login case
         let token = genToken(user);
     res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        // secure: process.env.NODE_ENV === "production", // prod mein true, dev mein false,
        sameSite: 'lax', 
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
     });

     return res.status(200).json(user)

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Google Auth Error', error})
    }
}
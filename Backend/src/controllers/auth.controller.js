import { userModel } from "../models/user.model";
import validator from "validator"
import bcrypt from "bcryptjs"
import genToken from "../utils/generateToken";

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
     res.cookie('token', token);

     } catch (error) {
        console.log(error);
        
     }
}
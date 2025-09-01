import { userModel } from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
    // console.log(req.user);
    const user = await userModel.findById(req.user._id).select('-password');   // password hata ke bhejna
    if(!user) return res.status(404).json({message: 'User Not Found!'});
    return res.status(200).json(user);
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Getting User Error!', error})
        
    }
}
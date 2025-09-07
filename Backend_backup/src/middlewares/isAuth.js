import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

export const isAuth = async (req, res, next) => {
  try {
    // 1️⃣ Cookie me token check karo
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User, Please Login First!"
      });
    }

    // 2️⃣ Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3️⃣ User find karo DB se
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      });
    }

    // 4️⃣ req.user me user attach karo aur next() call karo
    req.user = user;
    next();

  } catch (error) {
    console.log("Token verification error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid Token, Please Login Again!"
    });
  }
};

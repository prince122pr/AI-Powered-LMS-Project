import { userModel } from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../utils/generateToken.js";
import { sendMail } from "../utils/sendEmail.js";

const isProd = process.env.NODE_ENV === "production";

// 🔑 Cookie options ek jagah define kar liye
const cookieOptions = {
  httpOnly: true,
  secure: isProd,                       // prod me HTTPS required
  sameSite: "None",                     // cross-site ke liye always None
  domain: "edgine.onrender.com",        // ✅ frontend domain (not backend)
  path: "/",                            // sab routes ke liye
  maxAge: 7 * 24 * 60 * 60 * 1000,      // 7 din
};

// ================= Register =================
export const registerController = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    let isEmailExist = await userModel.findOne({ email });
    if (isEmailExist)
      return res.status(400).json({ message: "Email Already Registered!" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Enter Valid Email!" });

    if (password.length < 8)
      return res.status(400).json({ message: "Enter Strong Password!" });

    let hashedPassword = await bcrypt.hash(password, 10);

    let user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    let token = genToken(user);
    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      message: "User Registered Successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in Registering User!", error });
  }
};

// ================= Login =================
export const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User Not Found!" });

    let isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      return res.status(400).json({ message: "Invalid Credentials!" });

    let token = genToken(user);
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "User Logged In Successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error in Logging In!", error });
  }
};

// ================= Logout =================
export const logoutController = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
    });
    return res.status(200).json({ message: "Logged Out Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error in Logging Out!", error });
  }
};

// ================= Google Auth =================
export const googleAuthController = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({ name, email, role });
    }

    let token = genToken(user);
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "Google Auth Success!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Google Auth Error", error });
  }
};

// ================= Logout =================
export const logoutController = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,              // production me true
      sameSite: isProd ? "None" : "Lax",
    });

    return res.status(200).json({ message: "Logged Out Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error in Logging Out!", error });
  }
};


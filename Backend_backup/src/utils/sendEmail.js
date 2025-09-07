import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});


export const sendMail = async (to, otp) => {
  const info = await transporter.sendMail({
    from: process.env.USER_EMAIL, // sender address
    to: to, // list of receivers
    subject: "Reset Your Password", // Subject line
    html: `<p>Your OTP for Password Reset is <b>${otp}</b>. It expires in 5 minutes. </p>`, // HTML body
  });

  console.log("Message sent:", info.messageId);
};


export const verifyOTP = async (req, res) => {
   try {
      const { email, otp } = req.body;
   } catch (error) {
    
   }
}
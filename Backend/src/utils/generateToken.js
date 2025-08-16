import jwt from "jsonwebtoken";

export default function genToken(user) {
   try {
      return jwt.sign({ id: user._id },process.env.JWT_SECRET_KEY, { expiresIn: "7d" } // Token will expire in 7 days
  );
   } catch (error) {
      console.log(error);
   }
  
}

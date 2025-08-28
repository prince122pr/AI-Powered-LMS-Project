import jwt from 'jsonwebtoken';

export const isAuth = async(req, res, next) => {

    let token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized User, Please Login First!"
        });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findOne({_id: decoded.id});
        
        req.user = user

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token, Please Login Again!"
        })
    }

}
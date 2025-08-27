const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

async function authMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({
            message:"Unauthorized access, please login first"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)   // if all good then this will give decoded...otherwise it will throw error...that's why we use try and catch
        const user = await userModel.findOne({_id:decoded.id})
        req.user = user;  // new property created in req
        next();  // isse request aage jati hai
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid token, please login again"
        })
    }
}

module.exports = authMiddleware
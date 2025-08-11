const express = require('express')
const userModel = require('../models/user.models')
const jwt = require('jsonwebtoken')


const router = express.Router()

router.post('/register',async (req,res)=>{
    const {username,password}= req.body

    const user = await userModel.create({
        username,
        password
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user
    })
})

router.post('/login',async(req,res)=>{
    const {username,password}= req.body
    const user = await userModel.findOne({   // user m username aur password dono aayenge
        username:username
    })
    if(!user){
        return res.status(401).json({
            message:"user not found"
        })
    }

    const isPasswordValid = password == user.password
    //await userModel.findOne({
       // password:password

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }
    res.status(200).json({
        message:"login successfully"
    })
})

router.get('/user',async(req,res)=>{
    const {token}= req.cookies  // although req.body is not the correct place... that's why now we are using cookies
    if(!token){
        return res.status(401).json({
            message: "unauthorized access token is required"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)  
        // this demands 2 things token and jwt secret   // return data which we used to create token
        const user = await userModel.findOne({
            _id:decoded.id
        }).select("-password -__v").lean()   // by this password will not come from database
        // .lean() use for server ram optimisation

        res.status(200).json({
            message: "user data fetched successfully",
            user
        })
    }catch(err){
        return res.status(401).json({
            message: "Unauthorized-Invalid token"
        })
    }
})





module.exports = router
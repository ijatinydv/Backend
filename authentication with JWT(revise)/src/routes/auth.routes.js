const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const router = express.Router()

// POST /register  req.body = {username, password }

router.post('/register',async (req,res)=>{        // both validation and verification 
    const {username, password} = req.body;
    const isUserAlreadyExist = await userModel.findOne({
        username
    })  // if no username exist it return null that is a false value
    if(isUserAlreadyExist){
        return res.status(409).json({
            message: "username is already in use"
        })
    }

    const user = await userModel.create({username,password})

    const token = jwt.sign({id : user._id},process.env.JWT_SECRET)  // to create token

    res.cookie("token",token);

    res.status(201).json({
        message:"user registered successfully",
        user
    })

})


router.get('/user',async(req,res)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "unauthorized token not found"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)  // data which we stored in token 
        const user = await userModel.findOne({
            _id:decoded.id
        })
        res.status(201).json({
        message:"user data fetched successfully",
        user
    })
    }catch(err){
        res.status(401).json({
            message:"unauthorized invalid token "
        })
    }
})

router.post('/login',async(req,res)=>{
    const {username,password} = req.body

    const user = await userModel.findOne({username})
    if(!user){
        return res.status(404).json({
            message:"user account not found"
        })
    }

    const isPasswordValid = user.password === password

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({id : user._id},process.env.JWT_SECRET)

    res.cookie("token",token,{
        expires:new Date(Date.now() + 1000*60*60*24*7)  // expires after 7 days
    })

    res.status(201).json({
        message:"user logged in successfully",
        user
    })

})

router.get('/logout',async(req,res)=>{
    res.clearCookie("token")

    res.status(200).json({
        message:"user logged out successfully"
    })
})

module.exports = router
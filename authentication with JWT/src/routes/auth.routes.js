const express = require('express')
const userModel = require('../models/user.models')


const router = express.Router()

router.post('/register',async (req,res)=>{
    const {username,password}= req.body

    const user1 = await userModel.create({
        username,
        password
    })
    res.status(201).json({
        message:"user registered successfully",
        user1
    })
})

router.post('/login',async(req,res)=>{
    const {username,password}= req.body
    const user = await userModel.findOne({
        username:username,
    })
    if(!user){
        return res.status(401).json({
            message:"user not found"
        })
    }
    const isPasswordValid = await userModel.findOne({
        password:password
    })
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }
})





module.exports = router
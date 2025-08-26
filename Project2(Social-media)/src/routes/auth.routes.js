const express = require('express');
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const router = express.Router()

/* 
   POST /register
   POST /login
   GET /user [protected]
 */

router.post('/register',async(req,res)=>{
    const {username, password} = req.body;

    const existingUser = await userModel.findOne({username})

    if(existingUser){
        return res.status(409).json({
            message : "username already exists"
        })
    }

    const user = await userModel.create({
        username,password
    })

    const token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message:"user registered successfully",
        user
    })
})

module.exports = router
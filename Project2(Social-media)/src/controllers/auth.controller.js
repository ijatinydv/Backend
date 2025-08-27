// api callbacks are the controller

// if we put all the controller in auth routes file and we have lot of api's then it reduces code readibility

const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerController(req,res){
    const {username , password} = req.body;

    const existingUser = await userModel.findOne({username})

    if(existingUser){
        return res.status(409).json({
            message:"user already exist"
        })
    }

    const user = await userModel.create({
        username,
        password:await bcrypt.hash(password,10)
    })

    const token = jwt.sign('token',process.env.JWT_SECRET);

    res.cookie('token',token)

    res.status(201).json({
        message:"user created successfully",
        user
    })
}

async function loginController(req,res) {
    const {username,password} = req.body;
    const user = await userModel.findOne({username})

    if(!user){
        return res.status(400).json({
            message:"user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)   // this help to compare the password in database and the one user entered for login

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.cookie("token",token);
    res.status(201).json({
        message:"user logged in successfully",
        user:{
            username:user.username,
            id: user._id
        }
    })
}




module.exports = {            // exported in object form because we have to export other functions also 
    registerController,
    loginController
}
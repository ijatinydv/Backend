// here we define only routes kaun kaunse hai

const express = require('express');
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const {registerController, loginController} = require('../controllers/auth.controller')
const router = express.Router()

/* 
   POST /register
   POST /login
   GET /user [protected]
 */

router.post('/register',registerController);
router.post('/login',loginController);

module.exports = router
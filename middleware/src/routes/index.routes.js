const express = require('express')

const router = express.Router()

router.use((req,res,next)=>{
    console.log("this middleware is between router and api")
})

router.get('/',(req,res)=>{
    res.json('api is running bhai log')
})


module.exports = router
const express = require('express')

const app = express()
// 7296819765 - rohit

//  /home => Welcome to home page
app.get('/home',(req,res)=>{
    res.send('Welcome to home page')
})

//  /about => Welcome to about page
app.get('/about',(req,res)=>{
    res.send('Welcome to about page')
})

app.listen(3000,()=>{
    console.log('express sever is running');
    
})
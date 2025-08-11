const express = require('express')

const app = express()

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
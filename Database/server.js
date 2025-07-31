const express = require('express')
const connectToDB = require('./src/db/db.js')

// server database se connect server.js file m
connectToDB()
const app = express()
app.use(express.json()) //middleware

app.get('/',(req,res)=>{
    res.send('Ram Ram bhai saara ne')
})

app.post('/notes',(req,res)=>{
    const {title,content} = req.body
})


app.listen(3000,()=>{
    console.log('server is running on port 3000');
    
})
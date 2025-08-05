const express = require('express')
const authRoutes = require('./routes/auth.routes')



const app = express();
app.use(express.json())   // middleware

// on applying /auth here the api names modifies by /auth/register and /auth/login etc

app.use('/auth',authRoutes)

module.exports = app
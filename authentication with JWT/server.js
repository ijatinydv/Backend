const app = require('./src/app')
require('dotenv').config()
const connectToDB = require('./src/db/db')


connectToDB()
app.listen(3000,()=>{
    console.log("server is running on the port 3000")
})
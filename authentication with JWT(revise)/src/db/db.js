const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Connected to DB")
    })
    .catch((error)=>{
        console.error("MongoDB connection failed : ",error)
    })
}

module.exports = connectToDB
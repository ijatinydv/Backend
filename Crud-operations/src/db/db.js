const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.Mongodb_url).then(()=>{
        console.log('connected to DB');
    })
}

module.exports = connectToDB
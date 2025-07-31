const mongoose = require('mongoose')
require('dotenv').config()

//server database se kaise connect hoga ye tum db.js file m likhoge

function connectToDB(){

    mongoose.connect(process.env.Mongodb_url).then(()=>{
        console.log('connected to DB');
    })
}

module.exports = connectToDB
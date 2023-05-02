const mongoose=require("mongoose")
require('dotenv').config()
const connection =mongoose.connect(process.env.mongoURL)

module.exports={connection}


// {
//     "name":"Vishal",
//     "email":"vishal@gmail.com",
//     "pass":"vishal@123",
//     "gender":"Male"
//   }

// {
//     "email":"vishal@gmail.com",
//     "pass":"vishal@123"
//   }

// 6450de9bdd7fb7c69d88c97d

// 6450d8773c2afd1ddb5dd349
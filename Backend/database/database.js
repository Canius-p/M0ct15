const mongoose = require("mongoose")


exports.connectDatabase = async()=>{
    // connecting to database 
 await mongoose.connect("mongodb://localhost:27017/cms")
 console.log("Database connected successfully")
}
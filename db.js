const mongoose = require("mongoose");

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connection Successful")
      } 
    catch (error) {
        console.log(`DB Connection failed - ${error}`);
      }
}

module.exports =  connectDB;




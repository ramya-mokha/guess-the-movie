require("dotenv").config();
const mongoose=require("mongoose");
console.log("MONGO_URL:", process.env.MONGO_URL);

const connectDb=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected")
     }
    catch(err){
        console.error("Db conncection failed:",err.message);
        process.exit(1);
    }
 }
module.exports=connectDb;



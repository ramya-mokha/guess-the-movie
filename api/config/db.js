const mongoose=require("mongoose");

const connectDb=async ()=>{
    try{
        const conn=await mongoose.connect("mongodb://localhost:27017/guessTheMovie")
        console.log("MongoDB connected")
     }
    catch(err){
        console.error("Db conncection failed:",err.message);
        process.exit(1);
    }
 }
module.exports=connectDb;



const mongoose=require("mongoose");

const movieSchema=mongoose.Schema({
    image:String,
    options:[String],
    correctIndex:Number,
    hints:[String]
})

const movieModel=mongoose.model("Movie",movieSchema);
module.exports=movieModel;


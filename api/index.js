const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connectDb = require("./config/db");
const userModel = require("./models/User");
const cors = require("cors");
const movieModel=require("./models/Movie");
const cookieParser = require("cookie-parser");


connectDb();


const app = express();
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());

app.use("/uploads",express.static("./public/uploads"))
app.get("/", (req, res) => {
  res.send("Everything working fine");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await userModel.findOne({ email: email });
  if (!userDoc) {
    return res.status(404).json({ message: "No user found" });
  }
  const isMatch=await bcrypt.compare(password,userDoc.password);
  if(!isMatch){
    return res.status(404).json({message:"Credentials mismatch"})
  }
  
  const token = jwt.sign(
    { id: userDoc._id, email: userDoc.email },
    "SECRETKEY",
  );
  const isProduction = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax"
});
  res.json({ message: "Login successful" });
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashPassword=await bcrypt.hash(password,10);
  try {
    const userDoc = await userModel.create({
      email,
      password:hashPassword,
    });
      const token = jwt.sign(
    { id: userDoc._id, email: userDoc.email },
    "SECRETKEY",
  );
 const isProduction = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax"
});
  res.json({ message: "Login successful" });
  } catch (err) {
    if(err.code===11000){
        return res.status(400).json({
            message:"Email already exists"
        })
    }
  }

});

app.post("/logout",(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"Logout Successful"
    })

})

app.get("/movies",async (req,res)=>{
      const data=await movieModel.find();
      res.json(data);
})
const verifyTokenMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, "SECRETKEY");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
app.get("/profile",verifyTokenMiddleware,(req,res)=>{
  res.json({user:req.user});
})

app.listen(5000, () => {
  console.log("Listening on port 3000");
});

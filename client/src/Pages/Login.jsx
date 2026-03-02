import React from "react";
import { MdOutlineMovieCreation } from "react-icons/md";
import { TbMovie } from "react-icons/tb";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

const Login = () => {
  const navigate=useNavigate();
  const [login, setLogin] = useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

    const handleSubmit=async (e)=>{
    e.preventDefault();
    const patha=(login)? "login":"register";
    const response=await fetch(`http://localhost:3000/${patha}`,{
      credentials:"include",
      method:"POST",
      body:JSON.stringify({email,password}),
      headers: {
  "Content-Type": "application/json"
},})
 const data= await response.json();
 if(response.ok){
  navigate("/main")
 }
 else{
  alert(data.message)
 }

  }

  return (
    <div className="text-white flex flex-col items-center relative z-10 pb-10">
      <div className="flex flex-col items-center p-10 gap-2">
        <div className="primary-gradient px-6 py-4 rounded-lg">
          <MdOutlineMovieCreation color="black" size={100} />
        </div>
        <p className="font-bold md:text-4xl text-2xl text-center">
          Guess The{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-300">
            Movie
          </span>
        </p>
        <p className="text-center text-xs md:text-base">✨Can you identify movies from blurred scenes?✨</p>
      </div>
      <div className="bg-[#161923] p-10  rounded-3xl">
        <div className="flex w-full mb-3 bg-[#20232e] rounded-2xl relative">
          <div
    className={`absolute top-0 h-full w-1/2 bg-yellow-500 rounded-2xl transition-all duration-300 ease-in-out
      ${login ? "left-0" : "left-1/2"}
    `}
  />
          <button className={`w-1/2 py-2 transition-all duration-300 ease-in-out relative
             ${login ? "text-black":"text-[#73778c]"}
              `} onClick={()=>{setLogin(true)}}>
            Login
          </button>
          <button className={`w-1/2 text-center transition-all duration-300 ease-in-out text-[#73778C] relative  ${!login ?  "text-black":""}
              `} onClick={()=>{setLogin(false)}}>
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <div>
            <label
              htmlFor="email"
              className="text-[#73778C] text-sm font-semibold "
            >
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email id"
              className="px-3 py-2 bg-[#20232E] w-full mt-2" value={email} onChange={(e)=>{
                setEmail(e.target.value)
              }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-[#73778C] text-sm font-semibold"
            >
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="px-3 py-2 bg-[#20232E] w-full mt-2"
              name="password"
              id="password"
              autoComplete="current-password"
              value={password} onChange={(e)=>{
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="primary-gradient rounded-xl flex py-2 items-center justify-center gap-2 font-bold md:text-xl text-xs text-black cursor-pointer">
            <TbMovie color="black" size="20" />
            <button type="submit">Start Playing</button>
          </div>
        </form>
        <p className="text-center text-[#73778C] mt-2 text-xs md:text-base">
          5 rounds - Reveal clues - Score points{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;

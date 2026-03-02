import React from 'react'
import FloatingBackground from './FloatingBackground'
import { useLocation, useNavigate } from 'react-router-dom'

const Score = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const finalScore=location.state?.score;
  return (
    
        <div className=" flex flex-col items-center  gap-2">
             <h1 className="md:text-7xl text-xl font-bold text-white font-google text-center">✨Keep Watching✨</h1>
             <p className="text-[#425364] font-semibold text-xs md:text-md">Time to bing some classics!</p>
             <p className="text-white font-bold text-xl">Score: {}{finalScore}</p>
             <button className="bg-amber-500 md:py-3 py-1 md:px-20 px-5 rounded-3xl font-bold md:text-xl mt-2 text-sm cursor-pointer" onClick={()=>navigate("/main")}>Play again</button>
        </div>
   
  )
}

export default Score

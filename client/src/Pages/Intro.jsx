import React from "react";
import FloatingBackground from "./FloatingBackground";
import { MdOutlineMovieCreation } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import {Link} from "react-router-dom"



const Intro = () => {
  return (
   
      <div className=" flex items-center flex-col ">
      <div className="primary-gradient px-6 py-4 rounded-lg w-fit my-5">
       <MdOutlineMovieCreation color="black" size={60} />
      </div>
      <div className="flex flex-col justify-center md:gap-5 gap-2">
        <h1 className="md:text-8xl text-2xl font-extrabold font-google text-gray-100 text-center">Every frame tells <p className="text-transparent bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-300 bg-clip-text">a story.</p></h1>
        <p className="text-[#73778c] md:text-2xl text-xs font-semibold text-center">We blur the scene. You name the movie. <br/>Think you've watched enough?</p>
        <Link to={'/login'}> 
        <div className="primary-gradient w-fit md:py-4 md:px-10 py-2 px-4 rounded-2xl mx-auto font-bold text-black mt-5 shadow-sm shadow-amber-100 flex items-center gap-2 hover:brightness-110 transition-all cursor-pointer">
           <p>Prove it</p> <FaChevronRight />
        </div>
        </Link>
      </div>
      </div>
  );
};

export default Intro;

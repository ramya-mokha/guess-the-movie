import React, { useEffect, useState } from "react";
import FloatingBackground from "./FloatingBackground";
import { BsTrophy } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";

import { IoEyeOutline } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";

const Main = () => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [clue, setClue] = useState(0);
  const [mdata, setmdata] = useState(null);
  const [currMovie, setcurrMovie] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [selectOption, setSelectOption] = useState(null);
  const [currIdx,setcurrIdx]=useState(1);
  const handleNextMovie = () => {
    if(round>=5){
     navigate("/score",{state:{score}})
     return
    }
    const nextIndex = currIdx + 1;

    setRound((prev) => prev + 1);
    setAnswered(false);
    setSelectOption(null);
    setClue(0);
    setcurrIdx(nextIndex);
    setcurrMovie(mdata[nextIndex]);
  };
  const navigate = useNavigate();
  const shuffleArray=(array)=>{
    const arr=[...array];
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }
  useEffect(() => {
    const fe = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/movies`);
      const data = await response.json();
      const shuffled=shuffleArray(data);
      setmdata(shuffled);
      setClue(0);
      setcurrMovie(shuffled[0]);
    };
    fe();
  }, []);
  const handleSelectOption = (n) => {
    if (answered) return;
    setAnswered(true);
    setSelectOption(n);
    if (n == currMovie.correctIndex) {
      setScore((prev) => prev + 3 - clue);
    } else {
      setScore((prev) => prev - 1);
    }
    setTimeout(()=>handleNextMovie(),1500);
  };
  const handleLogout = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      navigate("/");
    }
  };

  return (
   
      <div className=" p-2">
        <div className="nav flex  justify-between border-b-5 pb-3 border-[#1D1F29] text-amber-400">
          <div className="flex gap-1 items-center font-bold text-2xl bg-[#0f0e0e] px-4 py-2 rounded-xl shadow-[0_0_12px_rgba(245,158,11,0.5)]">
            <BsTrophy size={20} color="#EAB308" /> <span>{score}</span>
          </div>
          <div className="flex gap-1 items-center">
            <div className="flex gap-1 items-center font-bold text-xl bg-[#0f0e0e] px-4 py-2 rounded-xl shadow-[0_0_12px_rgba(245,158,11,0.5)]">
              <AiOutlineThunderbolt size={27} color="#EAB308" />
              <span>{round}/5</span>
            </div>
            <IoIosLogOut size={27} onClick={handleLogout} />
          </div>
        </div>
        <div className="content text-white mt-5 flex flex-col gap-3">
          <div className="flex flex-col items-center gap-1 font-semibold">
            <span className="text-yellow-500">ROUND {round}</span>
            <span className="font-extrabold text-3xl">Guess the Movie! 🎬</span>
          </div>
          <div className="h-64 sm:h-72 md:h-80 
          w-80
          md:w-100
          border-3 rounded-lg border-[#2e3135] overflow-hidden relative bg-black">

            <img
              src={`${import.meta.env.VITE_API_URL}uploads/${currMovie?.image}`}
              alt=""
              className={`object-cover w-full h-full object-center   ${
                clue === 0
                  ? "blur-xl"
                  : clue === 1
                    ? "blur-md"
                    : clue === 2
                      ? "blur-sm"
                      : "blur-none"
              }`}
            />

            {clue > 0 && clue < 3 && (
              <div className="bg-[#1A1C25] w-[95%] h-18 rounded-xl text-white absolute bottom-3 mx-auto px-2 flex flex-col left-2">
                <p className="text-amber-500 text-xs mt-1 font-sans tracking-wider font-semibold">
                  HINT
                </p>
                <p className="outline  border-[#2D2924] border outline-amber-400 rounded-3xl px-3 py-1 mt-1 w-fit bg-[#2D2924]">
                  {currMovie?.hints[clue]}
                </p>
              </div>
            )}
          </div>
          <div className="justify-between flex items-center ">
            <div className="rounded-xl text-[#6F7286] bg-[#1C1E28] px-4 py-3 font-bold text-sm flex items-center gap-2">
              POINTS <span className="text-amber-500 text-lg">{score}</span>
            </div>
            <div
              className="rounded-xl text-amber-400 border bg-[#1C1E28] px-4 py-2 flex items-center gap-2 border-amber-300 cursor-pointer"
              onClick={(prev) => setClue(Math.min(clue+1,3))}
            >
              <IoEyeOutline />
              Reveal Clue ({clue})
            </div>
          </div>
          <div className="grid grid-cols-2 grid-row-1 gap-3">
            <div
              className={`text-center rounded-2xl py-3 bg-[#1B1E28]  cursor-pointer ${answered && 0 === currMovie?.correctIndex ? "bg-[#1f2d26] border border-green-400" : "bg-[#1B1E28] "} ${selectOption == 0 && selectOption != currMovie?.correctIndex && "bg-[#301c1c] border border-red-500"}`}
              onClick={() => handleSelectOption(0)}
            >
              {currMovie?.options[0]}
            </div>
            <div
              className={`text-center rounded-2xl py-3 bg-[#1B1E28]  cursor-pointer ${answered && 1 === currMovie?.correctIndex ? "bg-[#1f2d26] border border-green-400" : "bg-[#1B1E28] "} ${selectOption == 1 && selectOption != currMovie?.correctIndex && "bg-[#301c1c] border border-red-500"}`}
              onClick={() => handleSelectOption(1)}
            >
              {currMovie?.options[1]}
            </div>
            <div
              className={`text-center rounded-2xl py-3 bg-[#1B1E28]  cursor-pointer ${answered && 2 === currMovie?.correctIndex ? "bg-[#1f2d26] border border-green-400" : "bg-[#1B1E28] "} ${selectOption == 2 && selectOption != currMovie?.correctIndex && "bg-[#301c1c] border border-red-500"}`}
              onClick={() => handleSelectOption(2)}
            >
              {currMovie?.options[2]}
            </div>
            <div
              className={`text-center rounded-2xl py-3 bg-[#1B1E28]  cursor-pointer ${answered && 3 === currMovie?.correctIndex ? "bg-[#1f2d26] border border-green-400" : "bg-[#1B1E28] "} ${selectOption == 3 && selectOption != currMovie?.correctIndex && "bg-[#301c1c] border border-red-500"}`}
              onClick={() => handleSelectOption(3)}
            >
              {currMovie?.options[3]}
            </div>
          </div>
          {/* <div
            className="bg-amber-500 text-center py-2 font-semibold rounded-2xl"
            onClick={handleNextMovie}
          >
            Next
          </div> */}
        </div>
      </div>
  );
};

export default Main;

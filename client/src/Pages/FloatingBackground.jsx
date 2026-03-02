import React from 'react'

const FloatingBackground = () => {
    const bubbles=Array.from({length:25});
    
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 ">
      {
        bubbles.map((_,i)=>{
            const size=Math.random()*5+1;
            const left=Math.random()*100;
            const duration=Math.random()*30+10;
            return(
                <span key={i} className='absolute bottom-[-100px] rounded-full bg-yellow-500 backdrop-blur-md animate-float' style={{width:`${size}px`,height:`${size}px`,left:`${left}%`,animationDuration:`${duration}s`}} />
            )
        })
      }
    </div>
  )
}

export default FloatingBackground

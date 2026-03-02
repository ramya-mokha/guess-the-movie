import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const [isAuth,setIsauth]=useState(null);
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/profile`,{
            credentials:"include"
        }).then( async (res)=>{
            if(res.ok) setIsauth(true);
            else setIsauth(false);
        })
    },[]);
    if(isAuth===null) return <div className="text-black font-bold text-2xl">Loading...</div>
    if(!isAuth) return <Navigate to="/"/>
  return children;
}

export default ProtectedRoute

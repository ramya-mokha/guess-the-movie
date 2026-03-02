import React from 'react'
import FloatingBackground from './FloatingBackground'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='bg-black min-h-screen w-full relative flex items-center justify-center'>
      <FloatingBackground/>
      <div className="relative z-10">
     <Outlet/>
      </div>
     
    </div>
  )
}

export default Layout

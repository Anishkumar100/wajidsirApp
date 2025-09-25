import React, { useEffect } from 'react'
import { assets } from "../assets/assets"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../context/AppProvider'

export const NavBar = () => {

  const { navigate, token, setDarkMode, darkMode } = useAppContext()



  return (
    <div className='flex justify-between items-center py-2 px-2 bg-white text-gray-800 dark:bg-gray-900 dark:text-white'>
      {/* Title instead of logo */}
      <h1
        onClick={() => navigate('/')}
        className='text-lg sm:text-2xl font-semibold cursor-pointer'
      >
        Dr. Mohammed Wajid Khan
      </h1>



      <div className='flex items-center gap-4'>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md border 
              ${darkMode ? 'bg-yellow-400 text-white' : 'bg-gray-800 text-white'}
              hover:scale-105 transition-transform duration-300`}
          title="Toggle Theme"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>


      </div>
    </div >
  )
}

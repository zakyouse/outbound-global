import { BiLogOut, BiSolidHome } from 'react-icons/bi'
import {  BsGear, BsImage, BsMessenger, BsQuote } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/shaykes studios logo 2.png"
import { IoMdMenu } from 'react-icons/io'
import { useState } from 'react'
import PropTypes from 'prop-types'


function Sidebar({setUserId}) {
    const navigate=useNavigate()
    const [menuOpen,setMenuOpen]=useState(false)
  return (
    <nav onClick={()=>setMenuOpen(!menuOpen)} className={`${menuOpen?"w-64 flex-shrink-0 p-4":"w-0 px-0"} relative lg:w-72 h-[100vh] flex flex-col bg-[#007fd530] justify-evenly lg:px-4 text-gray-800 font-bold transition-all duration-500`}>
        <span className='text-2xl lg:hidden absolute top-0 grid place-content-around p-1 -right-8 rounded-br-md text-white bg-[#007fd5] cursor-pointer' onClick={()=>setMenuOpen(!menuOpen)}>
        <IoMdMenu/>
        </span>
        <div className="logo flex justify-center">
            <img src={logo} alt="logo" />
        </div>
        <div className='flex flex-col gap-2 pb-8 overflow-hidden'>
            <Link className='hover:bg-transparent hover:text-[#d13800] transition-all duration-500 flex gap-2 items-center rounded-md p-2' to="/"><span className='w-8 h-8 rounded-full bg-[#009340] grid place-content-center'><BiSolidHome className=''/></span> Home</Link>
            <Link className='hover:bg-transparent hover:text-[#d13800] transition-all duration-500  flex gap-2 items-center rounded-md p-2' to="/messages"><span className='w-8 h-8 rounded-full bg-[#009340] grid place-content-center'><BsMessenger className=''/></span>Messages</Link>
            <Link className='hover:bg-transparent hover:text-[#d13800] transition-all duration-500  flex gap-2 items-center rounded-md p-2' to="/consultations"><span className='w-8 h-8 rounded-full bg-[#009340] grid place-content-center'><BsQuote className=''/></span>Consultations</Link>
            <Link className='hover:bg-transparent hover:text-[#d13800] transition-all duration-500  flex gap-2 items-center rounded-md p-2' to="/resources"><span className='w-8 h-8 rounded-full bg-[#009340] grid place-content-center'><BsImage className=''/></span>Resourses</Link>
        </div>
        <div className="flex flex-col gap-2 overflow-hidden">
            <button onClick={()=>navigate("/settings")} className='flex gap-2 items-center justify-center border-2 transition-all duration-500 border-[#007fd5] hover:bg-[#007fd5] hover:text-white p-2 w-full rounded-full text-[#007fd5]'><BsGear/>Settings</button>
            <button onClick={()=>{setUserId(null);sessionStorage.removeItem("userId")}} className='flex gap-2 items-center justify-center border-2 transition-all duration-500 border-[#007fd5] hover:bg-[#007fd5] hover:text-white p-2 w-full rounded-full text-[#007fd5]'><BiLogOut/>Logout</button>
        </div>
    </nav>)
}

Sidebar.propTypes = {
  setUserId: PropTypes.func.isRequired
}

export default Sidebar
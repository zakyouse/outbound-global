import { useState,useEffect } from 'react'
import './App.css'
import {HashRouter,Route,Routes} from "react-router-dom"
import Home from './pages/Home'
import Sidebar from './components/Sidebar'
import Bookings from './pages/Bookings'
import Messages from './pages/Messages'
import Consultations from './pages/Consultations'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Blog from './pages/Blog'
import Resources from './pages/Resources'

function App() {
  const [userId,setUserId]=useState(null)
  useEffect(()=>{
    setUserId(sessionStorage.getItem("userId"))
  },[])
  if(!userId) return <Login setUserId={setUserId}/>
  return (
    <HashRouter>
      <Sidebar setUserId={setUserId}/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="bookings" element={<Bookings/>}/>
      <Route path="messages" element={<Messages/>}/>
      <Route path="/consultations" element={<Consultations/>}/>
      <Route path="/resources" element={<Resources/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/settings" element={<Settings userId={userId}/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App

import { BsBookFill, BsMessenger, BsQuote } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import bg from '../assets/yty1-aOFl5efY.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
  const [messages,setMessages]=useState([])
  const [consultations,setconsultations]=useState([])
  // functions to fetch data
  async function fetch_messages() {
    try {
      const response=await axios.get("http://localhost:3000/messages.php")
      setMessages(response.data)
    } catch (error) {
      console.error(error)
      setMessages([])
    }
    
  }
   async function fetch_consultations() {
    try {
      const response=await axios.get("http://localhost:3000/consultation.php")
      console.log(response)
      if (response.status==200) {
        setconsultations(response.data)
      }
    } catch (error) {
      console.error(error)
      setconsultations([])
    }
    
  }
 
 
  // useEffect to fetch all the data
  useEffect(()=>{
    fetch_messages();
    fetch_consultations()
    // fetch_testimonials()
  },[])
  
  return (
    <div className='py-6 px-4 lg:w-[calc(100vw-18rem)] h-[100vh] overflow-y-scroll w-full bg-cover bg-no-repeat' style={{backgroundImage:`url(${bg})`}}>
      <h1 className='text-3xl text-gray-900 mb-4'>Dashboard</h1>
      <div className='w-full flex flex-col lg:flex-row gap-2 '>
        <div className='flex gap-4 items-center text-white bg-[#007fd5] h-28 lg:w-1/3 rounded-3xl px-3 py-6'>
          <span className='grid place-content-center w-20 h-20 rounded-full bg-white text-gray-900 text-4xl'>
            <BsMessenger/>
          </span>
            <Link to="/messages" className='text-sm flex gap-2 flex-col border-l-2 pl-4 border-gray-200'><span className='text-4xl font-bold'>{messages && messages.filter((mess)=>mess.is_read===0).length}</span>Unread Messages</Link>
        </div>
        <div className='flex gap-4 items-center text-white bg-[#007fd5] h-28 lg:w-1/3 rounded-3xl px-3 py-6'>
          <span className='grid place-content-center w-20 h-20 rounded-full bg-white text-gray-900 text-4xl'>
            <BsBookFill/>
          </span>
            <Link to="/consultations" className='text-sm flex gap-2 flex-col border-l-2 pl-4 border-gray-200'><span className='text-4xl font-bold'>{consultations && consultations.filter((book)=>book.is_viewed==0).length}</span>New Consultations</Link>
        </div>
      </div>
    </div>
  )
}
export default Home

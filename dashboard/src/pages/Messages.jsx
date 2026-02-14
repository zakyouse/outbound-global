import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { MdMarkEmailRead, MdDelete } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const Messages = () => {
   async function fetch_messages() {
      try {
        const response=await axios.get("http://localhost:3000/messages.php")
        setMessages(response.data)
      } catch (error) {
        console.error(error)
        setMessages([])
      }
      
    }
    useEffect(()=>{
      fetch_messages()
    },[])
  const [messages, setMessages] = useState([]);

  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const markAsRead =async (id) => {  
    try {
      const response=await axios.post("http://localhost:3000/messages.php",{action:"toggle_read",id:id})
      if (response.status==200) {
        fetch_messages()
        toast.success("Changes saved successfully")
      }else{
        toast.error("Sorry, an error occurred")
      }   
    } catch (error) {
      console.error(error)
      toast.error(error)
    }
  };

  const deleteMessage =async (id) => {
    try {
      const response=await axios.post("http://localhost:3000/messages.php",{action:"delete",id:id})
      if (response.status==200) {
        fetch_messages()
        toast.success("1 Message deleted successfully")
      }else{
        toast.error("Sorry, an error occurred")
      }   
    } catch (error) {
      console.error(error)
      toast.error(error)
    }
  };

  const sortedMessages = [...messages].sort((a, b) => a.read - b.read);

  return (
    <div className="lg:w-[calc(100vw-18rem)] h-[100vh] overflow-y-scroll w-full mx-auto p-6">
      <ToastContainer/>
      <h2 className="text-2xl font-semibold mb-4 text-[#007fd5]">Messages</h2>
      <div className="space-y-4">
        {sortedMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex justify-between items-center p-4 rounded-lg shadow-md transition-all ${
              msg.is_read
                ? "bg-gray-100 text-gray-700"
                : "bg-white border-l-4 border-[#007fd5]"
            }`}
          >
            <div>
              <p className="font-medium">{msg.fullname}</p>
              <p className="text-gray-500 text-sm">{msg.email}</p>
              <p className="mt-1 text-gray-700">{msg.subject}</p>
            </div>

            <div className="relative">
              <button
                onClick={() => toggleMenu(msg.id)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FiMoreVertical size={20} />
              </button>

              {menuOpen === msg.id && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-40 z-20">
                  {!msg.is_read && (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      className="flex items-center px-3 py-2 w-full hover:bg-gray-100 rounded-md text-sm text-gray-700"
                    >
                      <MdMarkEmailRead size={18} className="mr-2 text-green-600" />
                      Mark as Read
                    </button>
                  )}
                  <a
                    href="mailto:contact@shaykesstudios.co.ke"
                    className="flex items-center px-3 py-2 w-full hover:bg-gray-100 rounded-md text-sm text-gray-700"
                  >
                    <IoMailOutline size={18} className="mr-2 text-blue-600" />
                    Reply
                  </a>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="flex items-center px-3 py-2 w-full hover:bg-gray-100 rounded-md text-sm text-gray-700"
                  >
                    <MdDelete size={18} className="mr-2 text-red-600" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;

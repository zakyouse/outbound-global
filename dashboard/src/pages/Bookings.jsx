import { useState,useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { MdDelete, MdVisibility } from "react-icons/md";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const Bookings = () => {
   async function fetch_bookings() {
          try {
            const response=await axios.get("http://local:3000/api/bookings.php")
            setBookings(response.data)
          } catch (error) {
            console.error(error)
            setBookings([])
          }
          
        }
        useEffect(()=>{
          fetch_bookings()
        },[])
  const [bookings, setBookings] = useState([]);

  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const deleteBooking = async (id) => {
    try {
          const response=await axios.post("http://local:3000/api/bookings.php",{action:"delete",id:id})
          if (response.data.success) {
            fetch_bookings()
            toast.success("1 Booking deleted successfully")
          }else{
            toast.error("Sorry, an error occurred")
          }   
        } catch (error) {
          console.error(error)
          toast.error(error)
        }
  };

  const markAsViewed = async (id) => {
    try {
      const response=await axios.post("http://local:3000/api/bookings.php",{action:"toggle_view",id:id})
      if (response.data.success) {
        fetch_bookings()
        toast.success("Changes saved successfully")
      }else{
        toast.error("Sorry, an error occurred")
      }   
    } catch (error) {
      console.error(error)
      toast.error(error)
    }
  };

  return (
    <div className="lg:w-[calc(100vw-18rem)] h-[100vh] overflow-y-scroll w-full mx-auto p-6">
      <ToastContainer/>
      <h2 className="text-2xl font-semibold mb-4 text-[#007fd5]">Bookings</h2>

      <div className="bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-[#007fd5] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Full Name</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Preferred Date</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Other service</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className={`border-b ${
                  booking.is_viewed ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-50 transition`}
              >
                <td className="py-3 px-4">{booking.full_name}</td>
                <td className="py-3 px-4">{booking.phone}</td>
                <td className="py-3 px-4">{booking.email}</td>
                <td className="py-3 px-4">{booking.service}</td>
                <td className="py-3 px-4">{booking.preferred_date}</td>
                <td className="py-3 px-4">{booking.location}</td>
                <td className="py-3 px-4">{booking.description}</td>
                <td className="py-3 px-4">{booking.other_service}</td>
                <td className="py-3 px-4 relative">
                  {/* Meatball Menu Button */}
                  <button
                    onClick={() => toggleMenu(booking.id)}
                    className="text-gray-600 hover:text-gray-800 p-1 rounded-full"
                  >
                    <FiMoreVertical size={20} />
                  </button>

                  {/* Menu Dropdown */}
                  {menuOpen === booking.id && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-48 z-20">
                      {!booking.is_viewed && (
                        <button
                          onClick={() => markAsViewed(booking.id)}
                          className="flex items-center px-3 py-2 w-full hover:bg-gray-100 rounded-md text-sm text-gray-700"
                        >
                          <MdVisibility size={18} className="mr-2 text-blue-600" />
                          Mark as Viewed
                        </button>
                      )}
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="flex items-center px-3 py-2 w-full hover:bg-gray-100 rounded-md text-sm text-gray-700"
                      >
                        <MdDelete size={18} className="mr-2 text-red-600" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;

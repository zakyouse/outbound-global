import { useState ,useEffect} from "react";
import { FiMoreVertical } from "react-icons/fi";
import { MdPublish, MdUnpublished, MdDelete, MdAdd } from "react-icons/md";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const Testimonials = () => {
   async function fetch_testimonials() {
        try {
          const response=await axios.get("http://local:3000/api/testimonials.php")
          setTestimonials(response.data.testimonials)
        } catch (error) {
          console.error(error)
          setTestimonials([])
        }
        
      }
      useEffect(()=>{
        fetch_testimonials()
      },[])
  const [testimonials, setTestimonials] = useState([]);

  const [menuOpen, setMenuOpen] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTestimony, setNewTestimony] = useState({
    image_url: "",
    email: "",
    full_name: "",
    position: "",
    subject: "",
  });
  const [loading,setLoading]=useState(false)
  const addTestimony =async (e) => {
    e.preventDefault();
   
    setLoading(true)
    try {
        const response=await axios.post("http://local:3000/api/testimonials.php",{action:"add",full_name:newTestimony.full_name,email:newTestimony.email,subject:newTestimony.subject,image_url:newTestimony.image_url,position:newTestimony.position})

        
        if (response.data.success) {
          fetch_testimonials()
          toast.success(response.data.message)
        }else{
          toast.error("Sorry, an error occurred")
        }   
      } catch (error) {
        console.error(error)
        toast.error(error)
  }finally{
    setLoading(false)
  }
  ;}
  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const togglePublish =async (id) => {
    try {
      const response=await axios.post("http://local:3000/api/testimonials.php",{action:"toggle_publish",id:id})
     
      if (response.data.success) {
        fetch_testimonials()
        toast.success("Changes saved successfully")
      }else{
        toast.error("Sorry, an error occurred")
      }   
    } catch (error) {
      console.error(error)
      toast.error(error)
    }
  };

  const deleteTestimony =async (id) => {
    try {
      const response=await axios.post("http://local:3000/api/testimonials.php",{action:"delete",id:id})
      if (response.data.success) {
        fetch_testimonials()
        toast.success("1 Message deleted successfully")
      }else{
        toast.error("Sorry, an error occurred")
      }   
    } catch (error) {
      console.error(error)
      toast.error(error)
    }
  };

  const handleInputChange = (e) => {
    setNewTestimony({ ...newTestimony, [e.target.name]: e.target.value });
  };


  return (
    <div className="lg:w-[calc(100vw-18rem)] h-[100vh] overflow-y-scroll w-full mx-auto p-6">
      <ToastContainer/>
      <h2 className="text-2xl font-semibold mb-4 text-[#007fd5]">Testimonials</h2>
      
      {/* Add Testimony Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-[#007fd5] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-700 transition mb-4"
      >
        <MdAdd size={20} />
        Add Testimony
      </button>

      {/* Grouped Testimonials */}
      {["Published", "Unpublished"].map((status) => (
        <div key={status} className="mb-6">
          <h3 className="text-xl font-medium mb-3">{status} Testimonials</h3>
          <div className="space-y-4">
            {testimonials
              .filter((t) => t.published === (status === "Published" ? 1 : 0))
              .map((t) => (
                <div
                  key={t.id}
                  className="flex items-start p-4 bg-white shadow-md rounded-lg border-l-4 border-[#007fd5] transition-all"
                >
                  <img
                    src={t.image_url || "https://via.placeholder.com/100"}
                    alt="User"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{t.full_name}</p>
                    <p className="text-gray-500 text-sm">{t.position}</p>
                    <p className="text-gray-500 text-sm">{t.email}</p>
                    <p className="mt-2 text-gray-700">{t.subject}</p>
                  </div>

                  {/* Meatball Menu */}
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(t.id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <FiMoreVertical size={20} />
                    </button>

                    {menuOpen === t.id && (
                      <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-40">
                        <button
                          onClick={() => togglePublish(t.id)}
                          className="flex items-center px-3 py-2 w-full hover:bg-gray-100 rounded-md text-sm text-gray-700"
                        >
                          {t.published ? (
                            <>
                              <MdUnpublished size={18} className="mr-2 text-yellow-600" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <MdPublish size={18} className="mr-2 text-green-600" />
                              Publish
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => deleteTestimony(t.id)}
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
      ))}

      {/* Add Testimony Form (Modal) */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Add Testimony</h3>
            <input
              type="text"
              name="image_url"
              placeholder="Image URL"
              value={newTestimony.image_url}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-md mb-3"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newTestimony.email}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-md mb-3"
            />
            <input
            required
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={newTestimony.full_name}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-md mb-3"
            />
            <input
            required
              type="text"
              name="position"
              placeholder="Position"
              value={newTestimony.position}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-md mb-3"
            />
            <textarea
            required
              name="subject"
              placeholder="Testimony"
              value={newTestimony.subject}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-md mb-3"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={addTestimony}
                className={`${loading?"bg-gray-500":"bg-[#007fd5]"} 1px-4 py-2  text-white rounded-md hover:bg-red-700 transition`}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;

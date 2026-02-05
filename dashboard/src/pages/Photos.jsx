import { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { MdDelete, MdUnpublished, MdAdd,MdPublish } from "react-icons/md";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import { VscLoading } from "react-icons/vsc";

const Photos = () => {
  async function fetch_images() {
          try {
            const response=await axios.get("http://local:3000/api/photos.php")
            setImages(response.data.photos)
          } catch (error) {
            console.error(error)
            setImages([])
          }
          
        }
        useEffect(()=>{
          fetch_images()
        },[])
  const [columns, setColumns] = useState([[], [], [], []]); // 4-column layout
  const [images, setImages] = useState([]);

  const [menuOpen, setMenuOpen] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    distributeImages(images);
  }, [images]);

  function distributeImages(data) {
    const newColumns = [[], [], [], []]; // Reset columns
    data.forEach((image, index) => {
      newColumns[index % 4].push(image); // Distribute evenly across columns
    });
    setColumns(newColumns);
  }

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const togglePublish = async (id) => {
    try {
      const response = await axios.post(
        "http://local:3000/api/photos.php",
        { action: "toggle_publish", id: id }, 
        { headers: { "Content-Type": "application/json" } }
      );
      
      if (response.data.success) {
        fetch_images(); // Refresh images list
        toast.success("Changes saved successfully");
      } else {
        toast.error("Sorry, an error occurred");
      }
    } catch (error) {
      console.error("Toggle Error:", error);
      toast.error("Failed to update publish status.");
    }
  };
  
  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
  
    try {
      const response = await axios.post(
        "http://local:3000/api/photos.php",
        { action: "delete", id: id }, 
        { headers: { "Content-Type": "application/json" } }
      );
  
      
      if (response.data.success) {
        setImages((prevImages) => prevImages.filter((img) => img.id !== id));
        toast.success("Image deleted successfully!");
      } else {
        console.error("Delete Error:", response.data.error);
        toast.error("Failed to delete image: " + response.data.error);
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("An error occurred while deleting the image.");
    }
  };
  
  

const [imageUpload,setImageUpload]=useState(false)
const uploadImage = async () => {
  setImageUpload(true)
  if (!newImage) {
    alert("Please select an image to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("action", "add");
  formData.append("image", newImage);

  try {
    const response = await axios.post("http://local:3000/api/photos.php", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
if (response.data.success) {
  toast.success("Image uploaded success")
  fetch_images()
} else {
  toast.error("Sorry an error occurred")
}
    setShowForm(false);
  } catch (error) {
    console.error("Upload Error:", error);
    toast.error(error)
  } finally{
    setImageUpload(false)
  }
};

  return (
    <div className="lg:w-[calc(100vw-18rem)] h-[100vh] overflow-y-scroll w-full mx-auto p-6">
      <ToastContainer/>
      <h2 className="text-2xl font-semibold mb-4 text-[#007fd5]">Photo Gallery</h2>

      {/* Upload Image Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-[#007fd5] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-700 transition mb-4"
      >
        <MdAdd size={20} />
        Upload Image
      </button>

      {/* Image Gallery */}
      <div className="flex gap-4">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex-1 space-y-2">
            {col.map((image, imgIndex) => (
              <div key={imgIndex} className="relative group">
                <img
                  src={image.url}
                  alt={`Gallery ${imgIndex + 1}`}
                  className="w-full rounded-lg shadow-md cursor-pointer"
                />

                {/* Meatball Menu */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => toggleMenu(`${colIndex}-${imgIndex}`)}
                    className="text-white bg-black/50 p-1 rounded-full"
                  >
                    <FiMoreVertical size={20} />
                  </button>

                  {menuOpen === `${colIndex}-${imgIndex}` && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-40">
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="flex items-center px-3 py-2 w-full hover:bg-gray-100 rounded-md text-sm text-gray-700"
                      >
                        <MdDelete size={18} className="mr-2 text-red-600" />
                        Delete
                      </button>
                      <button
                      onClick={() => togglePublish(image.id)}
                        className="flex items-center px-3 py-2 w-full hover:bg-gray-100 rounded-md text-sm text-gray-700"
                      >
                        {image.published ? (
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
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      
      {/* Upload Image Form (Modal) */}
      {showForm && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h3 className="text-xl font-semibold mb-4">Upload New Image</h3>
      
      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setNewImage(e.target.files[0])}
        className="w-full border px-3 py-2 rounded-md mb-3"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowForm(false)}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={uploadImage}
          className={`px-4 py-2 bg-[#007fd5] text-white rounded-md hover:bg-red-700 transition ${imageUpload?"pointer-events-none":"pointer-events-auto"}`}
        >
            {imageUpload?<VscLoading className="animate-spin"/>:"Upload"}
          
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Photos;

import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { MdDelete, MdVisibility } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);

  async function fetchConsultations() {
    try {
      const response = await axios.get(
        "http://localhost:3000/consultation.php"
      );
      setConsultations(response.data || []);
    } catch (error) {
      console.error(error);
      setConsultations([]);
    }
  }

  useEffect(() => {
    fetchConsultations();
  }, []);

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const markAsViewed = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/consultation.php",
        { action: "toggle_viewed", id:id }
      );
      if (res.status==200) {
        fetchConsultations();
        toast.success("Marked as viewed");
      }
    } catch (err) {
      toast.error("Failed to update status",err);
    }
  };

  const deleteConsultation = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/consultation.php",
        { action: "delete", id:id }
      );

      if (res.status==200) {
        fetchConsultations();
        toast.success("Consultation deleted");
      }
    } catch (err) {
      toast.error("Delete failed",err);
    }
  };

  return (
    <div className="lg:w-[calc(100vw-18rem)] h-screen overflow-y-scroll p-6">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6 text-[#007fd5]">
        Consultations
      </h2>

      <div className="space-y-4">
        {consultations.map((c) => (
          <div
            key={c.id}
            className={`p-4 bg-white shadow rounded-lg border-l-4 ${
              c.is_viewed ? "border-green-500" : "border-red-500"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-semibold">{c.full_name}</p>
                <p className="text-sm text-gray-600">{c.email}</p>
                <p className="text-sm text-gray-600">{c.phone}</p>
                <p className="text-sm text-gray-600">
                  {c.country} • {c.service_type}
                </p>
                <p className="text-sm">
                  📅 {c.preferred_date} ⏰ {c.preferred_time}
                </p>

                {c.cv_path && (
                  <a
                    href={c.cv_path}
                    target="_blank"
                    className="text-blue-600 text-sm underline"
                  >
                    View CV
                  </a>
                )}

                <span
                  className={`inline-block text-xs px-2 py-1 rounded ${
                    c.is_viewed
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {c.is_viewed ? "Viewed" : "New"}
                </span>
              </div>

              {/* Menu */}
              <div className="relative">
                <button onClick={() => toggleMenu(c.id)}>
                  <FiMoreVertical size={18} />
                </button>

                {menuOpen === c.id && (
                  <div className="absolute right-0 mt-2 bg-white shadow rounded w-40">
                    {!c.is_viewed && (
                      <button
                        onClick={() => markAsViewed(c.id)}
                        className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm"
                      >
                        <MdVisibility /> Mark viewed
                      </button>
                    )}

                    <button
                      onClick={() => deleteConsultation(c.id)}
                      className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-red-600"
                    >
                      <MdDelete /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consultations;

import { useState } from "react";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

const API_URL = "http://localhost:3000/resources.php";

const AddResource = ({ onSuccess }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    excerpt: "",
    category: "",
    image: null,
  });

  /* ================= SUBMIT ================= */
  const submitResource = async () => {
    if (!formData.title || !formData.body || !formData.category) {
      toast.error("All fields are required");
      return;
    }

    const data = new FormData();
    data.append("action", "create");
    data.append("title", formData.title);
    data.append("excerpt", formData.excerpt);
    data.append("content", formData.body);
    data.append("category", formData.category);
    if (formData.image) data.append("image", formData.image);

    try {
      setLoading(true);

      const res = await axios.post(API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
        console.log(res)
      if (res.status==200) {
        toast.success("Resource added successfully");
        setShowForm(false);
        setFormData({
          title: "",
          body: "",
          category: "",
          image: null,
        });
        onSuccess(); // refresh list
      } else {
        toast.error("Failed to add resource");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      {/* ADD BUTTON */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-[#007fd5] text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <MdAdd /> Add Resource
      </button>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">Add Blog Resource</h2>

            <input
              type="text"
              placeholder="Blog Title"
              className="w-full border px-3 py-2 rounded"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

<textarea
              placeholder="Blog excerpt"
              rows="6"
              className="w-full border px-3 py-2 rounded"
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
            />

            <textarea
              placeholder="Blog Body"
              rows="6"
              className="w-full border px-3 py-2 rounded"
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Category (e.g. Work Visas)"
              className="w-full border px-3 py-2 rounded"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />

            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={submitResource}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                {loading ? "Saving..." : "Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

AddResource.propTypes = {
  onSuccess: PropTypes.func,
};

AddResource.defaultProps = {
  onSuccess: () => {},
};

export default AddResource;


import { useEffect, useState } from "react";
import axios from "axios";
import { FiMoreVertical } from "react-icons/fi";
import AddResource from "../components/AddResource";
import {
  MdDelete,
  MdPublish,
  MdUnpublished,
  MdAdd,
  MdEdit,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:3000/resources.php";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    slug: "",
    image: "",
  });

  /* ================= FETCH ================= */
  const fetchResources = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log(res)
      setResources(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load resources");
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  /* ================= MENU ================= */
  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  /* ================= PUBLISH ================= */
  const togglePublish = async (id) => {
    try {
      const res = await axios.post(
        API_URL,
        { action: "publish", id:id },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status==200) {
        toast.success("Status updated");
        fetchResources();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Publish failed");
    }
  };

  /* ================= DELETE ================= */
  const deleteResource = async (id) => {
    if (!window.confirm("Delete this resource?")) return;

    try {
      const res = await axios.post(
        API_URL,
        { action: "delete", id },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status==200) {
        toast.success("Resource deleted");
        setResources((prev) => prev.filter((r) => r.id !== id));
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete error");
    }
  };

  /* ================= ADD / UPDATE ================= */
  const submitResource = async (id) => {
    try {
      const action = editing ? "edit" : "create";

      const res = await axios.post(
        API_URL,
        { action:action, ...formData, id: id },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status==200) {
        toast.success(editing ? "Updated" : "Created");
        fetchResources();
        setShowForm(false);
        setEditing(null);
        setFormData({
          title: "",
          excerpt: "",
          category: "",
          slug: "",
          image: "",
        });
      } else {
        toast.error("Save failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Request failed");
    }
  };

  /* ================= EDIT ================= */
  const startEdit = (resource) => {
    setEditing(resource.id);
    setFormData(resource);
    setShowForm(true);
  };

  return (
    <div className="p-6 w-full">
      <ToastContainer />
<AddResource onSuccess={fetchResources} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary">
          Resources Manager
        </h2>

        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <MdAdd /> Add Resource
        </button>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition relative"
          >
            <img
              src={`http://localhost:3000/${r.image}`}
              alt={r.title}
              className="h-40 w-full object-cover rounded-t-xl"
            />

            <div className="p-4 space-y-2">
              <span className="text-xs text-primary font-semibold">
                {r.category}
              </span>

              <h3 className="font-semibold">{r.title}</h3>

              <p className="text-sm text-gray-600 line-clamp-3">
                {r.excerpt}
              </p>

              <span className="text-xs text-gray-400">
                {r.published ? "Published" : "Draft"}
              </span>
            </div>

            {/* MENU */}
            <div className="absolute top-2 right-2">
              <button
                onClick={() => toggleMenu(r.id)}
                className="bg-black/50 text-white p-1 rounded-full"
              >
                <FiMoreVertical />
              </button>

              {menuOpen === r.id && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 z-10">
                  <button
                    onClick={() => startEdit(r)}
                    className="flex items-center px-3 py-2 w-full hover:bg-gray-100"
                  >
                    <MdEdit className="mr-2" /> Edit
                  </button>

                  <button
                    onClick={() => togglePublish(r.id)}
                    className="flex items-center px-3 py-2 w-full hover:bg-gray-100"
                  >
                    {r.is_published ? (
                      <>
                        <MdUnpublished className="mr-2 text-yellow-600" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <MdPublish className="mr-2 text-green-600" />
                        Publish
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => deleteResource(r.id)}
                    className="flex items-center px-3 py-2 w-full hover:bg-gray-100 text-red-600"
                  >
                    <MdDelete className="mr-2" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-3">
            <h3 className="text-lg font-semibold">
              {editing ? "Edit Resource" : "Add Resource"}
            </h3>

            {["title", "excerpt", "category", "slug", "image","id"].map((field) => (
              <input
                key={field}
                placeholder={field}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            ))}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => submitResource(editing)}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;

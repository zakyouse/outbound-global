"use client";
import { Editor } from 'primereact/editor';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MoreVertical } from 'lucide-react';
import {  IoAddCircle } from 'react-icons/io5';
import { IoMdCloudUpload } from "react-icons/io";
import { IoMdCloudDownload } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";

function Blog() {
    const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState(null);


  const fetchBlogs = async () => {
    const res = await axios.get('http://local:3000/api/blogs.php');
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSave = async () => {
    const payload = {
      content,
      title,
      author,
      image,
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
  
    if (isEditing) {
      payload.action = 'edit';
      payload.id = editId;
    } else {
      payload.action = 'add';
    }
  
    await axios.post('http://local:3000/api/blogs.php', payload);
    setShowPopup(false);
    setContent('');
    setTitle('');
    setImage('');
    setIsEditing(false);
    setEditId(null);
    fetchBlogs();
  };
  
  const handleAction = async (id, action, publish = null) => {
    const payload = { action, id };
    if (publish !== null) payload.publish = publish;
    await axios.post('http://local:3000/api/blogs.php', payload);
    fetchBlogs();
  };


  const handleEdit = (blog) => {
    setTitle(blog.title);
    setImage(blog.image);
    setContent(blog.content);
    setEditId(blog.id);
    setIsEditing(true);
    setShowPopup(true);
  };
  const [activeMenuId, setActiveMenuId] = useState(null);

  return (
    <div className="lg:w-[calc(100vw-18rem)] mt-8 md:mt-0 h-[100vh] overflow-y-scroll w-full mx-auto p-2 md:p-6">
    <button onClick={() => {setShowPopup(true);setContent('');
    setTitle('');
    setAuthor("")
    setImage('');}} className="bg-red-600 text-white px-4 py-2 rounded shadow-2xs flex items-center justify-center gap-1"><IoAddCircle/> Add Blog</button>

    {showPopup && (
      <div className="fixed inset-0 bg-[#00000080] backdrop-blur-xl bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <input
            className="w-full border p-2 mb-2"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            className="w-full border p-2 mb-2"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full border p-2 mb-2"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Editor value={content} onTextChange={(e) => setContent(e.htmlValue)} style={{ height: '200px' }} />
          <div className="flex justify-end mt-4">
            <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">Save Blog</button>
            <button onClick={() => {setShowPopup(false);setIsEditing(false)}} className="ml-2 text-red-600">Cancel</button>
          </div>
        </div>
      </div>
    )}

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {blogs.map((blog) => (
        <div key={blog.id} className="border border-gray-200 shadow rounded p-1 relative">
          {blog.published===1 && <span className={`absolute top-2 left-2 rounded bg-[#29be29b6] font-bold text-white backdrop-blur-md px-2 py-1`}>Published</span>}
          <img src={blog.image} alt={blog.title} className="w-full h-50 object-cover rounded" />
          <h3 className="font-bold mt-2 text-xl">{blog.title}</h3>
          <p className="text-sm text-gray-500">By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</p>

          <div className="absolute top-2 right-2">
            <div className="group relative">
              <MoreVertical onClick={() => setActiveMenuId(activeMenuId === blog.id ? null : blog.id)} className="cursor-pointer text-white" />
              <div className={`absolute right-0 -mt-2 w-32 bg-white shadow rounded group-hover:block z-10 ${activeMenuId === blog.id ? "block" : "hidden"}`}>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2" onClick={() => handleAction(blog.id, 'publish', !blog.published)}>
                  {blog.published ? <><IoMdCloudDownload/>Unpublish</> : <><IoMdCloudUpload/>Publish</>}
                </button>
                <button className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleEdit(blog)}><FaPen/> Edit</button>

                <button className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" onClick={() => handleAction(blog.id, 'delete')}><IoMdTrash/> Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Blog
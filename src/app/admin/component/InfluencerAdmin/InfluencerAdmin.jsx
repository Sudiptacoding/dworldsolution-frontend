"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const InfluencerAdmin = () => {
  const [influencers, setInfluencers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    view: "",
    subs: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // ✅ Fetch all influencers
  const fetchInfluencers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/influencers");
      setInfluencers(res.data);
    } catch (error) {
      console.error("Error fetching influencers:", error.message);
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file select
  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  // ✅ Upload image to imgbb
  const handleAvatarUpload = async () => {
    if (!avatarFile) return formData.image; // যদি আগেই URL থাকে
    const inputType = avatarFile.type.split("/")[1];
    if (!["png", "jpeg", "jpg"].includes(inputType)) {
      toast.error("Please upload a jpeg/png image");
      return null;
    }

    const uploadData = new FormData();
    uploadData.append("image", avatarFile);

    try {
      const res = await axios.post("https://api.imgbb.com/1/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { key: "9d5e814c7c5f4867978ca6169e144b8b" },
      });
      return res.data.data.url;
    } catch (error) {
      console.error("Image upload error:", error.message);
      toast.error("Image upload failed");
      return null;
    }
  };

  // ✅ Add or Update influencer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedImage = await handleAvatarUpload();
      if (!uploadedImage) return <p>Please Wait</p>;

      const payload = { ...formData, image: uploadedImage };

      if (editingId) {
        await axios.put(`http://localhost:5000/influencers/${editingId}`, payload);
        setEditingId(null);
      } else {
        const res = await axios.post("http://localhost:5000/influencers", payload);
        console.log(res);
      }

      setFormData({ name: "", role: "", image: "", view: "", subs: "" });
      setAvatarFile(null);
      fetchInfluencers();
    } catch (error) {
      console.error("Error saving influencer:", error.message);
    }
  };

  // ✅ Delete influencer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this influencer?")) return;
    try {
      await axios.delete(`http://localhost:5000/influencers/${id}`);
      fetchInfluencers();
    } catch (error) {
      console.error("Error deleting influencer:", error.message);
    }
  };

  // ✅ Edit influencer
  const handleEdit = (inf) => {
    setFormData({
      name: inf.name,
      role: inf.role,
      image: inf.image,
      view: inf.view,
      subs: inf.subs,
    });
    setEditingId(inf._id);
  };

  return (
    <div className="min-h-screen p-6 text-gray-200 bg-gray-900">
      <h1 className="mb-6 text-2xl font-bold text-center text-white">👑 Influencer Admin Panel</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 mb-8 bg-gray-800 rounded-lg shadow-md">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Influencer Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="view"
            placeholder="Views (e.g. 80M+ Views)"
            value={formData.view}
            onChange={handleChange}
            className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="subs"
            placeholder="Subscribers (e.g. 300K Subs)"
            value={formData.subs}
            onChange={handleChange}
            className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 md:col-span-2"
          />
        </div>

        <button type="submit" className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          {editingId ? "Update Influencer" : "Add Influencer"}
        </button>
      </form>

      {/* Influencers List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {influencers.map((inf) => (
          <div key={inf._id} className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-xl">
            <img src={inf.image} alt={inf.name} className="object-cover w-full h-48 rounded-lg" />
            <h2 className="mt-4 text-xl font-bold text-white">{inf.name}</h2>
            <p className="text-sm text-gray-400">{inf.role}</p>
            <div className="flex items-center justify-between mt-2 text-gray-300">
              <span>{inf.view}</span>
              <span>{inf.subs}</span>
            </div>
            <div className="flex justify-between mt-4 space-x-2">
              <button onClick={() => handleEdit(inf)} className="flex-1 px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button onClick={() => handleDelete(inf._id)} className="flex-1 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
        {influencers.length === 0 && <p className="col-span-3 text-center text-gray-400">No influencers found.</p>}
      </div>
    </div>
  );
};

export default InfluencerAdmin;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://dworldsolution-backend.vercel.app/api/cards";

const AdminWeDo = () => {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "", // ImgBB এর লিঙ্ক এখানে সেট হবে
  });
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // সব কার্ড ফেচ করার মেথড
  const fetchCards = async () => {
    try {
      const response = await axios.get(API_URL);
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // ইনপুট হ্যান্ডলার
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ImgBB-তে ইমেজ আপলোড করার হ্যান্ডলার
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgbbApiKey = "9d5e814c7c5f4867978ca6169e144b8b"; // আপনার API key
    const uploadData = new FormData();
    uploadData.append("image", file);

    setIsUploading(true);

    try {
      const response = await axios.post("https://api.imgbb.com/1/upload", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          key: imgbbApiKey,
        },
      });

      const imageUrl = response.data.data.url;
      // আপলোড করা ইমেজের URL ফর্ম স্টেটে সেট করা হলো
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  // সাবমিট হ্যান্ডলার (Create অথবা Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please complete all fields.");
      return;
    }

    try {
      if (editingId) {
        // আপডেট (PUT) অপারেশন
        await axios.put(`${API_URL}/${editingId}`, formData);
        alert("Card updated successfully!");
        setEditingId(null);
      } else {
        // ক্রিয়েট (POST) অপারেশন
        await axios.post(API_URL, formData);
        alert("Card added successfully!");
      }
      // রিসেট ও রিফ্রেশ
      setFormData({ title: "", description: "", image: "" });
      fetchCards();
    } catch (error) {
      console.error("Submit operation failed:", error);
      alert("Operation failed!");
    }
  };

  // এডিটের জন্য প্রস্তুত করার হ্যান্ডলার
  const handleEditClick = (card) => {
    setEditingId(card._id);
    setFormData({
      title: card.title,
      description: card.description,
      image: card.image,
    });
  };

  // কার্ড ডিলিট করার হ্যান্ডলার (Delete)
  const handleDeleteClick = async (id) => {
    if (confirm("Are you sure you want to delete this card?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Card deleted successfully!");
        fetchCards();
      } catch (error) {
        console.error("Delete operation failed:", error);
        alert("Delete failed!");
      }
    }
  };

  // এডিট রিসেট বা ক্যানসেল
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 border-b border-gray-800 pb-4 text-center">
          WeDo Dashboard (CRUD)
        </h1>

        {/* ফর্ম সেকশন */}
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            {editingId ? "Edit Service Card" : "Add New Service Card"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white"
                placeholder="e.g. SAAS Videos"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white"
                placeholder="e.g. Organic podcasts to build trust..."
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Upload Card Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 bg-black border border-gray-800 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white"
              />
              {isUploading && <p className="text-yellow-500 text-xs mt-1">Uploading image to ImgBB...</p>}
              {formData.image && (
                <div className="mt-3">
                  <span className="text-xs text-green-500 block mb-1">Uploaded Image:</span>
                  <img src={formData.image} alt="uploaded" className="w-16 h-16 object-cover rounded" />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isUploading}
                className="flex-1 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
              >
                {editingId ? "Update Card" : "Add Card"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* কার্ড লিস্ট ও ডিলিট/এডিট প্যানেল */}
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Existing Cards</h2>
          {cards.length === 0 ? (
            <p className="text-gray-500">No cards in database.</p>
          ) : (
            <div className="space-y-4">
              {cards.map((card) => (
                <div
                  key={card._id}
                  className="p-4 bg-black border border-gray-800 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {card.image && (
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-lg">{card.title}</h4>
                      <p className="text-xs text-gray-400 line-clamp-1">{card.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(card)}
                      className="px-3 py-1.5 bg-blue-900/40 hover:bg-blue-800 rounded text-xs transition border border-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(card._id)}
                      className="px-3 py-1.5 bg-red-950/40 hover:bg-red-800 rounded text-xs transition border border-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminWeDo;
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AboutUs() {
  const [shorts, setShorts] = useState([]);
  const [form, setForm] = useState({
    _id: null,
    videoURL: "",
    caption: "",
    name: "",
    profaction: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchShorts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/about-us");
      setShorts(res.data);
    } catch (err) {
      toast.error("Failed to fetch shorts");
    }
  };

  useEffect(() => {
    fetchShorts();
  }, []);

  const handleAvatarUpload = async () => {
    if (!avatarFile) return null;
    const inputType = avatarFile.type.split("/")[1];
    if (!["png", "jpeg", "jpg"].includes(inputType)) {
      toast.error("Please upload a jpeg/png image");
      return;
    }

    const formData = new FormData();
    formData.append("image", avatarFile);

    const res = await axios.post("https://api.imgbb.com/1/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      params: { key: "9d5e814c7c5f4867978ca6169e144b8b" },
    });

    return res.data.data.url;
  };

  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/shorts\/|youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  // এই ফাংশন handleSubmit এর শুরুতে বসাতে হবে
  const isYouTubeShortLink = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname.includes("youtube.com") && parsedUrl.pathname.startsWith("/shorts/");
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!isYouTubeShortLink(form.videoURL)) {
      toast.error("Please enter a valid YouTube Shorts link");
      return;
    }

    if (!form.videoURL || !form.caption || !form.name || !form.profaction || (!form.avatar && !avatarFile)) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      let avatarUrl = form.avatar;
      if (avatarFile) {
        avatarUrl = await handleAvatarUpload();
      }

      const data = {
        videoThumbnail: `https://img.youtube.com/vi/${extractVideoId(form.videoURL)}/mqdefault.jpg`,
        videoURL: form.videoURL,
        caption: form.caption,
        user: {
          name: form.name,
          profaction: form.profaction,
          avatar: avatarUrl,
        },
      };

      if (form._id) {
        await axios.put(`http://localhost:5000/about-us/${form._id}`, data);
        toast.success("Short updated successfully");
      } else {
        await axios.post("http://localhost:5000/about-us", data);
        toast.success("Short uploaded successfully");
      }

      setForm({ _id: null, videoURL: "", caption: "", name: "", profaction: "", avatar: "" });
      setAvatarFile(null);
      fetchShorts();
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (short) => {
    setForm({
      _id: short._id,
      videoURL: short.videoURL,
      caption: short.caption,
      name: short.user.name,
      profaction: short.user.profaction,
      avatar: short.user.avatar,
    });
    setAvatarFile(null); // clear previous file if any
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/about-us/${id}`);
      toast.success("Short deleted");
      fetchShorts();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-5xl px-4 py-8 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">🎬 YouTube Shorts Manager</h2>

      <div className="p-6 mb-12 bg-white shadow-xl rounded-2xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="YouTube Shorts URL"
            value={form.videoURL}
            onChange={(e) => setForm({ ...form, videoURL: e.target.value })}
            className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Caption"
            value={form.caption}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
            className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Profession"
            value={form.profaction}
            onChange={(e) => setForm({ ...form, profaction: e.target.value })}
            className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center mt-4 space-x-4">
          <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} />
          {form.avatar && <img src={form.avatar} alt="avatar" className="w-12 h-12 border rounded-full" />}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full px-4 py-3 mt-6 text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Processing..." : form._id ? "Update Short" : "Upload Short"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shorts.map((short) => (
          <div key={short._id} className="p-4 bg-white shadow-lg rounded-xl">
            <div className="relative mb-3 overflow-hidden rounded-lg aspect-video">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${extractVideoId(short.videoURL)}`}
                title="YouTube Short"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mb-2 font-semibold">{short.caption}</p>
            <div className="flex items-center gap-3">
              <img src={short.user.avatar} alt="avatar" className="w-10 h-10 border rounded-full" />
              <div>
                <p className="text-sm font-bold">{short.user.name}</p>
                <p className="text-xs text-gray-500">{short.user.profaction}</p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={() => handleEdit(short)} className="text-sm font-medium text-blue-600 hover:underline">
                Edit
              </button>
              <button onClick={() => handleDelete(short._id)} className="text-sm font-medium text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Video() {
  const [url, setUrl] = useState(""); // ইউজার যে URL বসাবে
  const [category, setCategory] = useState(""); // ভিডিও ক্যাটেগরি
  const [videos, setVideos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editUrl, setEditUrl] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Helper: URL থেকে embed বা thumbnail generate করা
  const getVideoId = (url) => {
    try {
      if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];
      if (url.includes("/shorts/")) return url.split("/shorts/")[1].split("?")[0];
      if (url.includes("youtube.com/watch?v=")) return url.split("v=")[1].split("&")[0];
      return null;
    } catch {
      return null;
    }
  };

  const getThumbnail = (url) => {
    const videoId = getVideoId(url);
    if (!videoId) return "";
    return `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const isShorts = (url) => url.includes("/shorts/");

  const fetchVideos = async () => {
    const res = await axios.get("https://dworldsolution-backend.vercel.app/header-video-upload");
    setVideos(res.data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async () => {
    if (!url.trim()) return alert("Please enter a valid YouTube URL");

    const finalCategory = isShorts(url) ? "Shorts" : category.trim();
    if (!finalCategory) return alert("Please enter a category for regular videos");

    await axios.post("https://dworldsolution-backend.vercel.app/header-video-upload", {
      videoURL: url,
      category: finalCategory,
      thumbnailURL: getThumbnail(url),
    });

    setUrl("");
    setCategory("");
    fetchVideos();
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://dworldsolution-backend.vercel.app/header-video-upload/${id}`);
    fetchVideos();
  };

  const startEdit = (video) => {
    setEditingId(video._id);
    setEditUrl(video.src);
    setEditCategory(video.category);
  };

  const saveEdit = async () => {
    if (!editUrl.trim()) return alert("Please enter a URL");
    const finalCategory = isShorts(editUrl) ? "Shorts" : editCategory.trim();
    if (!finalCategory) return alert("Please enter a category for regular videos");

    await axios.put(`https://dworldsolution-backend.vercel.app/header-video-upload/${editingId}`, {
      src: editUrl,
      category: finalCategory,
      thumbnail: getThumbnail(editUrl),
    });

    setEditingId(null);
    setEditUrl("");
    setEditCategory("");
    fetchVideos();
  };

  const categories = ["All", ...new Set(videos.map((v) => v.category))];
  const filteredVideos = selectedCategory === "All" ? videos : videos.filter((v) => v.category === selectedCategory);

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-semibold">📽️ Upload Header Video</h1>

      {/* Upload Form */}
      <div className="grid gap-2 mb-4 md:grid-cols-2">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {!isShorts(url) && (
          <input
            type="text"
            className="p-2 border rounded-md"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        )}
      </div>

      <button onClick={handleUpload} className="px-4 py-2 mb-6 text-white bg-blue-600 rounded hover:bg-blue-700">
        Upload
      </button>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full border ${
              selectedCategory === cat ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm text-left bg-white border border-gray-200">
          <thead className="text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3 border">#</th>
              <th className="px-4 py-3 border">Thumbnail</th>
              <th className="px-4 py-3 border">Category</th>
              <th className="px-4 py-3 text-right border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos.map((video, index) => (
              <tr key={video._id} className="transition-all hover:bg-gray-50">
                <td className="px-4 py-3 border">{index + 1}</td>
                <td className="px-4 py-2 border">
                  <img src={video.thumbnail} alt="Thumbnail" className="object-cover w-full rounded shadow h-28" />
                </td>
                <td className="px-4 py-3 border text-center">{video.category}</td>
                <td className="px-4 py-3 border align-center">
                  {editingId === video._id ? (
                    <div className="space-y-2">
                      <input type="text" className="w-full p-2 border rounded" value={editUrl} onChange={(e) => setEditUrl(e.target.value)} />
                      {!isShorts(editUrl) && (
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Edit category"
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                        />
                      )}
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700">
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditUrl("");
                            setEditCategory("");
                          }}
                          className="px-3 py-1 text-white bg-gray-500 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 md:flex-row md:justify-end">
                      <button onClick={() => startEdit(video)} className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(video._id)} className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filteredVideos.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No videos uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Video;

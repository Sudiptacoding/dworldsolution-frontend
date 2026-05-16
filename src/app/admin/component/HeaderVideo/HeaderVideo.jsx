"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useHeaderVideo from "@/hook/useHeaderVideo";

function HeaderVideo() {
  const { refetch } = useHeaderVideo();
  const [iframe, setIframe] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/header-video");
      setVideo(res.data);
      setIframe(res.data?.src ? `<iframe src="${res.data.src}" frameborder="0"></iframe>` : "");
    } catch (err) {
      toast.error("Failed to load video");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  const extractSrcFromIframe = (iframeStr) => {
    const match = iframeStr.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  };

  const validateIframe = (iframeStr) => {
    const src = extractSrcFromIframe(iframeStr);
    if (!src || !src.includes("youtube.com/embed/")) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateIframe(iframe)) {
      toast.error("Please enter a valid YouTube iframe embed code.");
      return;
    }

    try {
      if (video) {
        await axios.put(`http://localhost:5000/header-video/${video._id}`, { iframe });
        toast.success("Video updated successfully!");
        refetch();
      } else {
        await axios.post("http://localhost:5000/header-video", { iframe });
        toast.success("Video uploaded successfully!");
        refetch();
      }
      fetchVideo();
    } catch (err) {
      toast.error("Upload failed. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/header-video/${video._id}`);
      toast.success("Video deleted.");
      refetch();
      setVideo(null);
      setIframe("");
    } catch (err) {
      toast.error("Failed to delete video.");
    }
  };

  return (
    <div className="w-full max-w-5xl px-4 py-10 mx-auto">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">🎬 Manage Header Video</h2>

      <div className="p-6 space-y-6 bg-white shadow-lg rounded-xl">
        {/* Input */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Paste YouTube iframe:</label>
          <textarea
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder='<iframe src="https://www.youtube.com/embed/abc123"...></iframe>'
            value={iframe}
            onChange={(e) => setIframe(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-start gap-4">
          <button onClick={handleSubmit} className="px-5 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700">
            {video ? "Update Video" : "Upload Video"}
          </button>
          {video && (
            <button onClick={handleDelete} className="px-5 py-2 text-white transition bg-red-500 rounded-md hover:bg-red-600">
              Delete Video
            </button>
          )}
        </div>

        {/* Video Preview */}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : video ? (
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <div className="aspect-video">
              <iframe src={video.src} className="w-full h-full border rounded-lg" allowFullScreen></iframe>
            </div>
            <div>
              <img src={video.thumbnail} alt="Thumbnail" className="object-cover w-full h-64 border rounded-lg shadow" />
              <p className="mt-2 text-sm text-center text-gray-500">Generated Thumbnail</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400">No video uploaded yet.</div>
        )}
      </div>
    </div>
  );
}

export default HeaderVideo;

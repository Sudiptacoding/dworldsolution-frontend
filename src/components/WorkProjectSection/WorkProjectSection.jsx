"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function WorkProjectSection() {
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null); // track which video is playing

  // Function to convert any YouTube URL (normal or shorts) to embed URL
  const getEmbedURL = (url) => {
    try {
      let videoId = null;
      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
      } else if (url.includes("/shorts/")) {
        videoId = url.split("/shorts/")[1].split("?")[0];
      } else if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1].split("&")[0];
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch {
      return url;
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("https://dworldsolution-backend.onrender.com/header-video-upload"); // আপনার API URL
        const apiData = res.data.map((item) => ({
          videoURL: item.src,
          thumbnailURL: item.thumbnail,
          category: item.category,
        }));

        // convert all video URLs to embed URLs
        const updatedVideos = apiData.map((v) => ({
          ...v,
          videoURL: getEmbedURL(v.videoURL),
        }));

        setVideos(updatedVideos);

        const cats = Array.from(new Set(updatedVideos.map((v) => v.category)));
        setCategories(cats);
        setActiveCategory(cats[0]);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = videos?.filter((v) => v?.category === activeCategory);

  return (
    <div className="pt-0 text-white bg-black md:pt-10">
      {/* Heading */}
      <div className="px-4 pt-0 pb-16 text-center md:py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="inline-block text-sm font-semibold uppercase tracking-[1px] px-4 py-1 rounded-full mb-4"
        >
          our work
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-4xl md:text-5xl font-semibold leading-tight bg-gradient-to-r from-[#898e99] to-gray-400 bg-clip-text text-transparent"
        >
          Some of our
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="pt-2 text-3xl font-semibold"
        >
          featured projects
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
        <div className="flex flex-wrap gap-3 justify-center mb-8 px-4 sm:px-6 md:px-10 lg:px-[200px] xl:px-[300px] 2xl:px-[450px]">
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setPlayingIndex(null);
              }}
              className={`px-[14px] py-[8px] tracking-[1px] text-sm font-sans transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#273fb7] text-white font-semibold rounded-[10px]"
                  : " border-gray-500 text-[#9eadb9] hover:bg-gray-800 rounded-[10px]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
          <div
            className={`grid gap-6 max-w-5xl mx-auto px-4 ${
              activeCategory === "Shorts" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
            }`}
          >
            {filteredVideos?.map((video, idx) => {
              const isShorts = video?.category === "Shorts";
              const aspectRatio = isShorts ? "177.77%" : "56.25%"; // 9:16 or 16:9

              return (
                <div key={idx} className="relative w-full overflow-hidden rounded-lg cursor-pointer" style={{ paddingTop: aspectRatio }}>
                  {playingIndex === idx ? (
                    <>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={video?.videoURL}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <button
                        onClick={() => setPlayingIndex(null)}
                        className="absolute z-50 p-2 text-white transition bg-black bg-opacity-50 rounded-full top-2 right-2 hover:bg-opacity-80"
                        aria-label="Close video"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src={video?.thumbnailURL}
                        alt="Video Thumbnail"
                        className="absolute top-0 left-0 object-cover w-full h-full rounded-lg"
                        onClick={() => setPlayingIndex(idx)}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-75 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default WorkProjectSection;

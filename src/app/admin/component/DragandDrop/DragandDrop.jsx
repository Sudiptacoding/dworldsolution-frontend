import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical, Play, Video, Smartphone, ImageOff } from "lucide-react";



// ইউটিউব ভিডিও আইডি বের করার ফাংশন
const getYoutubeId = (url) => {
  if (!url) return null;
  try {
    let videoId = null;
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("/shorts/")) {
      videoId = url.split("/shorts/")[1].split("?")[0];
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    }
    return videoId;
  } catch {
    return null;
  }
};

// অটোমেটিক থাম্বনেইল জেনারেট করার ফাংশন
const getFallbackThumbnail = (url, customThumbnail) => {
  if (customThumbnail && customThumbnail.trim() !== "") {
    return customThumbnail; // কাস্টম ইমেজ থাকলে সেটি দেখাবে
  }
  const id = getYoutubeId(url);
  if (id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500"; // একদম কোনো সোর্স না পেলে ডিফল্ট ইমেজ
};


const DragandDrop = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  // ১. ডাটাবেজ থেকে ভিডিও লোড করা
  useEffect(() => {
    fetch("https://dworldsolution-backend.vercel.app/header-video-upload")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setLoading(false);
      });
  }, []);

  // ২. ডাইনামিকালি সব ক্যাটাগরিগুলো বের করা (ট্যাব তৈরির জন্য)
  const categories = ["All", ...new Set(videos.map((v) => v.category).filter(Boolean))];

  // ৩. শুধুমাত্র সিলেক্টেড ক্যাটাগরির ভিডিওগুলো ফিল্টার করা
  const filteredVideos = videos.filter((video) =>
    activeTab === "All" ? true : video.category === activeTab
  );

  // ৪. ড্র্যাগ কমপ্লিট হওয়ার পর পজিশন আপডেট করা
  const handleOnDragEnd = async (result) => {
    if (!result.destination) return; // যদি লিস্টের বাইরে ড্রপ করা হয়

    // সিলেক্টেড ট্যাবের ভিডিওগুলোর পজিশন পরিবর্তন করা
    const reorderedFiltered = Array.from(filteredVideos);
    const [removed] = reorderedFiltered.splice(result.source.index, 1);
    reorderedFiltered.splice(result.destination.index, 0, removed);

    // মেইন 'videos' অ্যারেতে এই পরিবর্তনটি ম্যাপ করা (যাতে অন্য ট্যাবের ভিডিওর সিরিয়াল নষ্ট না হয়)
    let filteredIdx = 0;
    const finalVideos = videos.map((video) => {
      if (activeTab === "All" || video.category === activeTab) {
        return reorderedFiltered[filteredIdx++];
      }
      return video;
    });

    // ফ্রন্টএন্ড স্টেট সাথে সাথে আপডেট
    setVideos(finalVideos);

    // সব আইডিগুলো সাজিয়ে নতুন সিকোয়েন্স তৈরি
    const orderedIds = finalVideos.map((video) => video._id);

    try {
      // ব্যাকএন্ডে নতুন পজিশন পাঠানোর API কল
      const response = await fetch("https://dworldsolution-backend.vercel.app/header-video-upload/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });

      const data = await response.json();
      console.log("Database updated successfully:", data.message);
    } catch (error) {
      console.error("Error updating sequence in backend:", error);
    }
  };

  // ৫. ইমেজ লোড না হলে ফলব্যাক ইমেজে কনভার্ট করার ফাংশন
  const handleImageError = (e) => {
    const currentSrc = e.target.src;
    // যদি maxresdefault ইমেজটি না পায়, তবে hqdefault ট্রাই করবে
    if (currentSrc.includes("maxresdefault.jpg")) {
      e.target.src = currentSrc.replace("maxresdefault.jpg", "hqdefault.jpg");
    } else {
      // তাও না পেলে একটি সুন্দর ডার্ক প্লেসহোল্ডার ইমেজ সেট করবে
      e.target.src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60";
    }
  };

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-500 font-medium">
        Loading videos...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-50 rounded-2xl shadow-sm border border-slate-100">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Video Order</h2>
          <p className="text-sm text-slate-500">
            Select a category tab and drag the cards to reorder.
          </p>
        </div>
      </div>

      {/* ডাইনামিক ক্যাটাগরি ট্যাবস */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
              activeTab === category
                ? "bg-slate-800 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {category} ({category === "All" ? videos.length : videos.filter(v => v.category === category).length})
          </button>
        ))}
      </div>

      {/* Drag & Drop Context */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="video-list">
          {(provided) => (
            // এখানে grid-cols-1 md:grid-cols-2 দিয়ে ২-কলামের গ্রিড তৈরি করা হয়েছে
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredVideos.map((video, index) => (
                <Draggable key={video._id} draggableId={video._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`flex gap-4 p-4 bg-white border rounded-xl transition-all duration-200 ${
                        snapshot.isDragging
                          ? "border-blue-500 shadow-xl ring-2 ring-blue-100 bg-blue-50/20 scale-[1.02]"
                          : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                      }`}
                    >
                      {/* ১. ড্র্যাগ করার হ্যান্ডেল */}
                      <div
                        {...provided.dragHandleProps}
                        className="cursor-grab active:cursor-grabbing flex items-center justify-center p-1 text-slate-400 hover:text-slate-600 rounded"
                      >
                        <GripVertical size={20} />
                      </div>

                      {/* ২. ভিডিও থাম্বনেইল */}
                    {/* ২. ভিডিও থাম্বনেইল */}
                      <div className="relative w-28 h-20 sm:w-36 sm:h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 group">
                        <img
                          src={getFallbackThumbnail(video.src, video.thumbnail)}
                          alt={video.title || "Video Thumbnail"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500";
                          }}
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* প্লে বাটন ইফেক্ট */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full shadow">
                            <Play size={14} fill="white" />
                          </div>
                        </div>
                      </div>

                      {/* ৩. ভিডিওর বিস্তারিত তথ্য */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                            {video.title || "Untitled Project"}
                          </h4>
                          
                          <div className="flex flex-wrap gap-1.5 items-center mt-1">
                            {/* টাইপ ব্যাজ (Shorts নাকি Video) */}
                            {video.type === "short" ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-100">
                                <Smartphone size={10} /> Shorts
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                                <Video size={10} /> Video
                              </span>
                            )}

                            {/* ক্যাটাগরি ব্যাজ */}
                            {video.category && (
                              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                {video.category}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* টপিকস */}
                        {video.topics && video.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {video.topics.map((topic, tIdx) => (
                              <span key={tIdx} className="text-[9px] font-medium px-1.5 py-0.5 bg-indigo-50 text-indigo-500 rounded">
                                #{topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* ৪. পজিশন ইন্ডিকেটর */}
                      <div className="flex items-center justify-center text-xs font-bold text-slate-400 px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg self-start">
                        #{index + 1}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragandDrop;
// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// function WorkProjectSection() {
//   const [videos, setVideos] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [playingIndex, setPlayingIndex] = useState(null); // track which video is playing

//   // Function to convert any YouTube URL (normal or shorts) to embed URL
//   const getEmbedURL = (url) => {
//     try {
//       let videoId = null;
//       if (url.includes("youtu.be/")) {
//         videoId = url.split("youtu.be/")[1].split("?")[0];
//       } else if (url.includes("/shorts/")) {
//         videoId = url.split("/shorts/")[1].split("?")[0];
//       } else if (url.includes("youtube.com/watch?v=")) {
//         videoId = url.split("v=")[1].split("&")[0];
//       }
//       return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
//     } catch {
//       return url;
//     }
//   };

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const res = await axios.get("https://dworldsolution-backend.vercel.app/header-video-upload"); // আপনার API URL
//         const apiData = res.data.map((item) => ({
//           videoURL: item.src,
//           thumbnailURL: item.thumbnail,
//           category: item.category,
//         }));

//         // convert all video URLs to embed URLs
//         const updatedVideos = apiData.map((v) => ({
//           ...v,
//           videoURL: getEmbedURL(v.videoURL),
//         }));

//         setVideos(updatedVideos);

//         const cats = Array.from(new Set(updatedVideos.map((v) => v.category)));
//         setCategories(cats);
//         setActiveCategory(cats[0]);
//       } catch (error) {
//         console.error("Failed to fetch videos:", error);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const filteredVideos = videos?.filter((v) => v?.category === activeCategory);

//   return (
//     <div className="pt-0 text-white bg-black md:pt-10">
//       {/* Heading */}
//       <div className="px-4 pt-0 pb-16 text-center md:py-16 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.1 }}
//           style={{ fontFamily: "'Syne', sans-serif" }}
//           className="inline-block text-sm font-semibold uppercase tracking-[1px] px-4 py-1 rounded-full mb-4"
//         >
//           our work
//         </motion.div>

//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           style={{ fontFamily: "'Syne', sans-serif" }}
//           className="text-4xl md:text-5xl font-semibold leading-tight bg-gradient-to-r from-[#898e99] to-gray-400 bg-clip-text text-transparent"
//         >
//           Some of our
//         </motion.h2>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.3 }}
//           style={{ fontFamily: "'Syne', sans-serif" }}
//           className="pt-2 text-3xl font-semibold"
//         >
//           featured projects
//         </motion.div>
//       </div>

//       {/* Tabs */}
//       <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
//         <div className="flex flex-wrap gap-3 justify-center mb-8 px-4 sm:px-6 md:px-10 lg:px-[200px] xl:px-[300px] 2xl:px-[450px]">
//           {categories?.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setActiveCategory(cat);
//                 setPlayingIndex(null);
//               }}
//               className={`px-[14px] py-[8px] tracking-[1px] text-sm font-sans transition-all duration-300 ${
//                 activeCategory === cat
//                   ? "bg-[#273fb7] text-white font-semibold rounded-[10px]"
//                   : " border-gray-500 text-[#9eadb9] hover:bg-gray-800 rounded-[10px]"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
//           <div
//             className={`grid gap-6 max-w-5xl mx-auto px-4 ${
//               activeCategory === "Shorts" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
//             }`}
//           >
//             {filteredVideos?.map((video, idx) => {
//               const isShorts = video?.category === "Shorts";
//               const aspectRatio = isShorts ? "177.77%" : "56.25%"; // 9:16 or 16:9

//               return (
//                 <div key={idx} className="relative w-full overflow-hidden rounded-lg cursor-pointer" style={{ paddingTop: aspectRatio }}>
//                   {playingIndex === idx ? (
//                     <>
//                       <iframe
//                         className="absolute top-0 left-0 w-full h-full rounded-lg"
//                         src={video?.videoURL}
//                         title="YouTube video player"
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                       ></iframe>
//                       <button
//                         onClick={() => setPlayingIndex(null)}
//                         className="absolute z-50 p-2 text-white transition bg-black bg-opacity-50 rounded-full top-2 right-2 hover:bg-opacity-80"
//                         aria-label="Close video"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <img
//                         src={video?.thumbnailURL}
//                         alt="Video Thumbnail"
//                         className="absolute top-0 left-0 object-cover w-full h-full rounded-lg"
//                         onClick={() => setPlayingIndex(idx)}
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                         <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-75 rounded-full">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
//                             <path d="M8 5v14l11-7z" />
//                           </svg>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

// export default WorkProjectSection;



// "use client";
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { useRouter, useSearchParams } from "next/navigation";

// function WorkProjectSection() {
//   const router = useRouter();
// const searchParams = useSearchParams();
//   const [items, setItems] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [playingIndex, setPlayingIndex] = useState(null); // track which video is playing
  
//   // ফিল্টার ও টপিক সার্চ স্টেট
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedType, setSelectedType] = useState("all"); // all, video, short, image, pdf
  
//   // ইমেজ দেখার জন্য লাইটবক্স স্টেট
//   const [lightboxImage, setLightboxImage] = useState(null);

//   // ইউটিউব লিঙ্ক থেকে ভিডিও আইডি এক্সট্রাক্ট করার ফাংশন
//   const getYoutubeId = (url) => {
//     if (!url) return null;
//     try {
//       let videoId = null;
//       if (url.includes("youtu.be/")) {
//         videoId = url.split("youtu.be/")[1].split("?")[0];
//       } else if (url.includes("/shorts/")) {
//         videoId = url.split("/shorts/")[1].split("?")[0];
//       } else if (url.includes("v=")) {
//         videoId = url.split("v=")[1].split("&")[0];
//       }
//       return videoId;
//     } catch {
//       return null;
//     }
//   };

//   // ইউটিউব লিঙ্ক কনভার্ট করে এমবেড করার ফাংশন
//   const getEmbedURL = (url) => {
//     const id = getYoutubeId(url);
//     return id ? `https://www.youtube.com/embed/${id}` : url;
//   };

//   // থাম্বনেইল প্রোভাইড না করা হলে ইউটিউব থাম্বনেইল ফেচ করার অটোমেটিক লজিক
//   const getFallbackThumbnail = (url, customThumbnail) => {
//     if (customThumbnail && customThumbnail.trim() !== "") {
//       return customThumbnail; // কাস্টম ইমেজ থাকলে সেটি দেখাবে
//     }
//     const id = getYoutubeId(url);
//     if (id) {
//       // যদি কাস্টম ইমেজ না থাকে, ইউটিউব থেকে অটো হাই-কোয়ালিটি ইমেজ নিবে
//       return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
//     }
//     return "/placeholder.jpg"; // কোনো সোর্স না পেলে ব্ল্যাঙ্ক ডিফেন্ডিং ইমেজ
//   };





//   useEffect(() => {
//   const category = searchParams.get("category");
//   const search = searchParams.get("search");
//   const type = searchParams.get("type");

//   if (category) setActiveCategory(category);
//   if (search) setSearchQuery(search);
//   if (type) setSelectedType(type);
// }, [searchParams]);



// useEffect(() => {
//   if (!items.length) return;

//   const category = searchParams.get("category");
//   if (category) {
//     setActiveCategory(category);
//   }
// }, [items]);




// useEffect(() => {
//   const params = new URLSearchParams();

//   if (activeCategory) {
//     params.set("category", activeCategory);
//   }

//   if (searchQuery) {
//     params.set("search", searchQuery);
//   }

//   if (selectedType !== "all") {
//     params.set("type", selectedType);
//   }

//   router.replace(`?${params.toString()}#work`, {
//     scroll: false,
//   });
// }, [activeCategory, searchQuery, selectedType, router]);

// useEffect(() => {
//   if (window.location.hash === "#work") {
//     setTimeout(() => {
//       document.getElementById("work")?.scrollIntoView({
//         behavior: "smooth",
//       });
//     }, 300);
//   }
// }, []);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const res = await axios.get("https://dworldsolution-backend.vercel.app/header-video-upload");
        
//         const apiData = res.data.map((item) => {
//           let detectedType = item.type || "video";
//           if (item.category === "Shorts" || item.src?.includes("/shorts/")) {
//             detectedType = "short";
//           }

//           return {
//             id: item.id || item._id,
//             title: item.title || "Untitled Project",
//             srcURL: detectedType === "video" || detectedType === "short" ? getEmbedURL(item.src) : item.src,
//             // অটো থাম্বনেইল ফলব্যাক লজিক যুক্ত করা হলো
//             thumbnailURL: getFallbackThumbnail(item.src, item.thumbnail),
//             category: item.category,
//             type: detectedType, // video, short, image, pdf
//             topics: item.topics || [], // সার্চ করার জন্য টপিকসমূহ
//           };
//         });

//         setItems(apiData);

//         const cats = Array.from(new Set(apiData.map((v) => v.category)));
//         setCategories(cats);
//         if (cats.length > 0) {
//           setActiveCategory(cats[0]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch projects:", error);
//       }
//     };

//     fetchItems();
//   }, []);

//   // টপিক, টাইটেল এবং ক্যাটাগরি বেসড সার্চিং লজিক
//   const filteredItems = items?.filter((item) => {
//     // const matchesCategory = item?.category === activeCategory;
//     const matchesCategory =
//   !activeCategory || item?.category === activeCategory;
//     const matchesType = selectedType === "all" || item?.type === selectedType;
    
//     // টাইটেল, ক্যাটাগরি অথবা টপিক-লিস্টের সাথে মিলছে কিনা তা যাচাই
//     const normalizedQuery = searchQuery.toLowerCase();
//     const matchesSearch = 
//       item?.title?.toLowerCase().includes(normalizedQuery) ||
//       item?.category?.toLowerCase().includes(normalizedQuery) ||
//       item?.topics?.some(topic => topic.toLowerCase().includes(normalizedQuery));

//     return matchesCategory && matchesType && matchesSearch;
//   });

//   return (
//     <div className="pt-0 text-white bg-black md:pt-10">
//       {/* Heading */}
//       <div className="px-4 pt-0 pb-12 text-center md:py-16 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.1 }}
//           style={{ fontFamily: "'Syne', sans-serif" }}
//           className="inline-block text-sm font-semibold uppercase tracking-[1px] px-4 py-1 rounded-full mb-4"
//         >
//           our work
//         </motion.div>

//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           style={{ fontFamily: "'Syne', sans-serif" }}
//           className="text-4xl md:text-5xl font-semibold leading-tight bg-gradient-to-r from-[#898e99] to-gray-400 bg-clip-text text-transparent"
//         >
//           Some of our
//         </motion.h2>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.3 }}
//           style={{ fontFamily: "'Syne', sans-serif" }}
//           className="pt-2 text-3xl font-semibold"
//         >
//           featured projects
//         </motion.div>
//       </div>

//       {/* Control Row: Tabs (Left) & Search/Filter (Right Corner) */}
//       <motion.div 
//         initial={{ opacity: 0, y: 30 }} 
//         whileInView={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.7, delay: 0.4 }}
//         className="max-w-5xl mx-auto px-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
//       >
//         {/* Left Side Tabs */}
//         <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
//           {categories?.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setActiveCategory(cat);
//                 setPlayingIndex(null);
//               }}
//               className={`px-[14px] py-[8px] tracking-[1px] text-sm font-sans transition-all duration-300 ${
//                 activeCategory === cat
//                   ? "bg-[#273fb7] text-white font-semibold rounded-[10px]"
//                   : "border border-transparent text-[#9eadb9] hover:bg-gray-800 rounded-[10px]"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Right Side Search & Filter Option */}
//         <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
//           {/* Topic Search Input */}
//           <div className="relative w-full sm:w-64">
//             <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//               </svg>
//             </span>
//             <input
//               type="text"
//               placeholder="Search by topic/title..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-900 text-white border border-neutral-800 rounded-[10px] focus:outline-none focus:border-[#273fb7] transition-all"
//             />
//           </div>

//           {/* Type Filter Select */}
//           <select
//             value={selectedType}
//             onChange={(e) => {
//               setSelectedType(e.target.value);
//               setPlayingIndex(null);
//             }}
//             className="w-full sm:w-auto bg-neutral-900 text-white border border-neutral-800 px-3 py-2 text-sm rounded-[10px] focus:outline-none focus:border-[#273fb7] transition-all cursor-pointer"
//           >
//             <option value="all">All Formats</option>
//             <option value="video">Videos</option>
//             <option value="short">Shorts</option>
//             <option value="image">Images</option>
//             <option value="pdf">PDFs</option>
//           </select>
//         </div>
//       </motion.div>

//       {/* Grid Content */}
//       <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
//         <div
//           className={`grid gap-6 max-w-5xl mx-auto px-4 ${
//             activeCategory === "Shorts" || selectedType === "short"
//               ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" 
//               : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
//           }`}
//         >
//           {filteredItems?.map((item, idx) => {
//             const isShorts = item?.type === "short" || item?.category === "Shorts";
//             const aspectRatio = isShorts ? "177.77%" : "56.25%"; // Shorts 9:16, Videos/Images/PDF 16:9

//             const handleCardClick = () => {
//               if (item.type === "video" || item.type === "short") {
//                 setPlayingIndex(idx);
//               } else if (item.type === "image") {
//                 setLightboxImage(item.srcURL);
//               } else if (item.type === "pdf") {
//                 window.open(item.srcURL, "_blank");
//               }
//             };

//             return (
//               <div 
//                 key={item.id || idx} 
//                 className="relative w-full overflow-hidden rounded-lg cursor-pointer group bg-neutral-900 border border-neutral-800" 
//                 style={{ paddingTop: aspectRatio }}
//               >
//                 {playingIndex === idx && (item.type === "video" || item.type === "short") ? (
//                   <>
//                     <iframe
//                       className="absolute top-0 left-0 w-full h-full rounded-lg"
//                       src={`${item?.srcURL}?autoplay=1`}
//                       title={item?.title}
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     ></iframe>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setPlayingIndex(null);
//                       }}
//                       className="absolute z-50 p-2 text-white transition bg-black bg-opacity-50 rounded-full top-2 right-2 hover:bg-opacity-80"
//                       aria-label="Close video"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-6 h-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </>
//                 ) : (
//                   <div className="absolute inset-0 w-full h-full" onClick={handleCardClick}>
//                     {/* Thumbnail Image (অটোমেটিক্যালি কাস্টম ইমেজ অথবা ইউটিউব থাম্বনেইল লোড করবে) */}
//                     <img
//                       src={item?.thumbnailURL}
//                       alt={item?.title}
//                       className="absolute top-0 left-0 object-cover w-full h-full rounded-lg transition-transform duration-500 group-hover:scale-105"
//                     />
                    
//                     {/* Dark overlay */}
//                     <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-all duration-300" />

//                     {/* Metadata Content (Title & tags) */}
//                     <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1">
//                       <span className="text-xs uppercase font-medium tracking-wider bg-[#273fb7] px-2 py-0.5 rounded-[4px] self-start">
//                         {item?.type}
//                       </span>
//                       <h3 className="text-sm md:text-base font-semibold text-white drop-shadow-md">
//                         {item?.title}
//                       </h3>
//                       {/* Topics Tag List */}
//                       {item.topics && item.topics.length > 0 && (
//                         <div className="flex flex-wrap gap-1 mt-1 opacity-80">
//                           {item.topics.slice(0, 3).map((topic, tIdx) => (
//                             <span key={tIdx} className="text-[10px] text-gray-300 bg-neutral-800 px-1.5 py-0.5 rounded">
//                               #{topic}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                     </div>

//                     {/* Icon Indicators */}
//                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                       {(item.type === "video" || item.type === "short") && (
//                         <div className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-75 rounded-full group-hover:scale-110 transition-transform duration-300">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
//                             <path d="M8 5v14l11-7z" />
//                           </svg>
//                         </div>
//                       )}

//                       {item.type === "image" && (
//                         <div className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-75 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
//                           </svg>
//                         </div>
//                       )}

//                       {item.type === "pdf" && (
//                         <div className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-75 rounded-full group-hover:scale-110 transition-transform duration-300">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                           </svg>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </motion.div>

//       {/* Image Lightbox Modal */}
//       <AnimatePresence>
//         {lightboxImage && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setLightboxImage(null)}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
//           >
//             <button 
//               onClick={() => setLightboxImage(null)}
//               className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             <motion.img 
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               src={lightboxImage} 
//               alt="Project View" 
//               className="max-w-full max-h-[85vh] rounded-lg object-contain"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default WorkProjectSection;



"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

function WorkProjectSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null); // track which video is playing
  
  // ফিল্টার ও সাব-ক্যাটাগরি স্টেট
  const [selectedSubcategory, setSelectedSubcategory] = useState(""); 
  const [selectedType, setSelectedType] = useState("all"); // all, video, short, image, pdf
  
  // ইমেজ দেখার জন্য লাইটবক্স স্টেট
  const [lightboxImage, setLightboxImage] = useState(null);

  // ইউটিউব লিঙ্ক থেকে ভিডিও আইডি এক্সট্রাক্ট করার ফাংশন
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

  // ইউটিউব লিঙ্ক কনভার্ট করে এমবেড করার ফাংশন
  const getEmbedURL = (url) => {
    const id = getYoutubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : url;
  };

  // থাম্বনেইল প্রোভাইড না করা হলে ইউটিউব থাম্বনেইল ফেচ করার অটোমেটিক লজিক
  const getFallbackThumbnail = (url, customThumbnail) => {
    if (customThumbnail && customThumbnail.trim() !== "") {
      return customThumbnail; // কাস্টম ইমেজ থাকলে সেটি দেখাবে
    }
    const id = getYoutubeId(url);
    if (id) {
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    }
    return "/placeholder.jpg"; // কোনো সোর্স না পেলে ব্ল্যাঙ্ক ডিফেন্ডিং ইমেজ
  };

  // ১. ইনিশিয়াল পেজ লোডে ইউআরএল থেকে ফিল্টার প্যারামিটারগুলো রীড করা
  useEffect(() => {
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const type = searchParams.get("type");

    if (category) setActiveCategory(category);
    if (subcategory) setSelectedSubcategory(subcategory);
    if (type) setSelectedType(type);
  }, [searchParams]);

  // এপিআই থেকে আইটেমগুলো লোড করা
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("https://dworldsolution-backend.vercel.app/header-video-upload");
        
        const apiData = res.data.map((item) => {
          let detectedType = item.type || "video";
          if (item.category === "Shorts" || item.src?.includes("/shorts/")) {
            detectedType = "short";
          }

          return {
            id: item.id || item._id,
            title: item.title || "Untitled Project",
            srcURL: detectedType === "video" || detectedType === "short" ? getEmbedURL(item.src) : item.src,
            thumbnailURL: getFallbackThumbnail(item.src, item.thumbnail),
            category: item.category,
            type: detectedType, // video, short, image, pdf
            topics: item.topics || [], 
          };
        });

        setItems(apiData);

        const cats = Array.from(new Set(apiData.map((v) => v.category)));
        setCategories(cats);
        
        // যদি ইউআরএল-এ আগের কোনো ক্যাটাগরি সেট করা না থাকে, তবে প্রথম ক্যাটাগরিকে অ্যাক্টিভ করবে
        const initialCategory = searchParams.get("category");
        if (!initialCategory && cats.length > 0) {
          setActiveCategory(cats[0]);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchItems();
  }, [searchParams]);

  // ২. শুধুমাত্র প্রথমবার শেয়ারড লিংকে প্রবেশ করলেই স্ক্রল লজিক কাজ করবে (লকিং সিস্টেম সহ)
  useEffect(() => {
    if (items.length === 0) return;

    // যদি অলরেডি স্ক্রলিং সম্পন্ন হয়ে থাকে, তবে আর কাজ করবে না (ওয়ান-টাইম লক)
    if (typeof window !== "undefined") {
      if (window.__hasScrolledToWork) {
        return; 
      }
    }

    // ব্রাউজারের রিলোড বা রিফ্রেশ ইভেন্ট চেক করা
    let isReload = false;
    if (typeof window !== "undefined" && window.performance) {
      const navs = performance.getEntriesByType("navigation");
      if (navs.length > 0 && navs[0].type === "reload") {
        isReload = true;
      }
    }

    // ইউআরএল-এ সক্রিয় প্যারামিটার আছে কিনা চেক করা
    const params = new URLSearchParams(window.location.search);
    const hasParams = params.has("category") || params.has("subcategory") || params.has("type");

    // শুধুমাত্র সক্রিয় প্যারামিটার থাকলে এবং পেজটি রিফ্রেশ না হয়ে সরাসরি শেয়ারড লিংকে ভিজিট করলে স্ক্রল হবে
    if (hasParams && !isReload) {
      const timer = setTimeout(() => {
        const el = document.getElementById("work");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          // স্ক্রলিং সম্পন্ন হয়েছে তা উইন্ডো অবজেক্টে সেভ করা হলো
          if (typeof window !== "undefined") {
            window.__hasScrolledToWork = true;
          }
        }
      }, 600);
      return () => clearTimeout(timer);
    } else {
      // যদি স্ক্রল কন্ডিশন না মেলে (যেমন: সাধারণ হোমপেজ ভিজিট বা রিলোড), তবুও লক সক্রিয় করে দেওয়া হবে
      if (typeof window !== "undefined") {
        window.__hasScrolledToWork = true;
      }
    }
  }, [items]);

  // ৩. গ্লোবাল হ্যাশ-ইন্টারসেপ্টর (ইউআরএল এ প্যারামিটার থাকলেও মেনুর হ্যাশ লিংকগুলো যেন ১০০% কাজ করে)
  useEffect(() => {
    const handleHashLinkClick = (e) => {
      // ক্লিক করা এলিমেন্টটি কোনো এঙ্কর (a) ট্যাগ কিনা যাচাই করা
      const targetAnchor = e.target.closest("a");
      if (!targetAnchor) return;

      const href = targetAnchor.getAttribute("href");
      // যদি এটি অভ্যন্তরীণ হ্যাশ লিংক হয় (যেমন: #, #about, #contact)
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.slice(1);

        if (targetId === "" || targetId === "top") {
          // # অথবা #top হলে পেজ স্মুথলি একবারে উপরে চলে যাবে এবং ইউআরএল ক্লিয়ার হবে
          window.scrollTo({ top: 0, behavior: "smooth" });
          router.replace(window.location.pathname, { scroll: false });
        } else {
          // নির্দিষ্ট সেকশনের আইডি ধরে স্মুথ স্ক্রলিং করানো
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            // ব্যাকগ্রাউন্ডে ব্রাউজার হিস্ট্রিতে হ্যাশ আপডেট করা (পেজ জাম্প ছাড়া)
            window.history.pushState(
              null, 
              "", 
              `${window.location.pathname}${window.location.search}#${targetId}`
            );
          }
        }
      }
    };

    document.addEventListener("click", handleHashLinkClick);
    return () => {
      document.removeEventListener("click", handleHashLinkClick);
    };
  }, [router]);

  // ফিল্টার পরিবর্তনের সময় হ্যান্ডলার যা ব্রাউজার লাফানো ছাড়া ইউআরএল আপডেট করবে
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSelectedSubcategory(""); // ক্যাটাগরি চেঞ্জ হলে সাব-ক্যাটাগরি রিসেট হবে
    setPlayingIndex(null);

    const params = new URLSearchParams(window.location.search);
    params.set("category", cat);
    params.delete("subcategory"); // সাব-ক্যাটাগরি প্যারামিটার ইউআরএল থেকে মুছে ফেলবে
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleSubcategoryChange = (sub) => {
    setSelectedSubcategory(sub);
    setPlayingIndex(null);

    const params = new URLSearchParams(window.location.search);
    if (sub) {
      params.set("subcategory", sub);
    } else {
      params.delete("subcategory");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setPlayingIndex(null);

    const params = new URLSearchParams(window.location.search);
    if (type !== "all") {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // ডাইনামিক সাব-ক্যাটাগরি লিস্ট (অ্যাক্টিভ ক্যাটাগরির আইটেমগুলোর টাইটেল থেকে)
  const availableSubcategories = Array.from(
    new Set(
      items
        .filter((item) => !activeCategory || item.category === activeCategory)
        .map((item) => item.title)
        .filter(Boolean)
    )
  );

  // ফিল্টারিং লজিক
  const filteredItems = items?.filter((item) => {
    const matchesCategory = !activeCategory || item?.category === activeCategory;
    const matchesType = selectedType === "all" || item?.type === selectedType;
    const matchesSubcategory = !selectedSubcategory || item?.title === selectedSubcategory;

    return matchesCategory && matchesType && matchesSubcategory;
  });

  return (
    <div className="pt-0 text-white bg-black md:pt-10 scroll-mt-10">
      {/* Heading */}
      <div className="px-4 pt-0 pb-12 text-center md:py-16 sm:px-6 lg:px-8">
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

      {/* Control Row: Tabs (Left) & Filters (Right Corner) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7, delay: 0.4 }}
        className="max-w-5xl mx-auto px-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        {/* Left Side Tabs */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-[14px] py-[8px] tracking-[1px] text-sm font-sans transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#273fb7] text-white font-semibold rounded-[10px]"
                  : "border border-transparent text-[#9eadb9] hover:bg-gray-800 rounded-[10px]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right Side Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
          
          {/* Dynamic Sub-category Dropdown */}
 

          {/* Type Filter Select */}
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full sm:w-auto bg-neutral-900 text-white border border-neutral-800 px-3 py-2 text-sm rounded-[10px] focus:outline-none focus:border-[#273fb7] transition-all cursor-pointer"
          >
            <option value="all">All Formats</option>
            <option value="video">Videos</option>
            <option value="short">Shorts</option>
            <option value="image">Images</option>
            <option value="pdf">PDFs</option>
          </select>

                   <select
            value={selectedSubcategory}
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            className="w-full sm:w-64 bg-neutral-900 text-white border border-neutral-800 px-3 py-2 text-sm rounded-[10px] focus:outline-none focus:border-[#273fb7] transition-all cursor-pointer"
          >
            <option value="">All Sub-categories</option>
            {availableSubcategories.map((sub, idx) => (
              <option key={idx} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Grid Content */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
        <div
          className={`grid gap-6 max-w-5xl mx-auto px-4 ${
            activeCategory === "Shorts" || selectedType === "short"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" 
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
          }`}
        >
          {filteredItems?.map((item, idx) => {
            const isShorts = item?.type === "short" || item?.category === "Shorts";
            const aspectRatio = isShorts ? "177.77%" : "56.25%"; // Shorts 9:16, Videos/Images/PDF 16:9

            const handleCardClick = () => {
              if (item.type === "video" || item.type === "short") {
                setPlayingIndex(idx);
              } else if (item.type === "image") {
                setLightboxImage(item.srcURL);
              } else if (item.type === "pdf") {
                window.open(item.srcURL, "_blank");
              }
            };

            return (
              <div 
                key={item.id || idx} 
                className="relative w-full overflow-hidden rounded-lg cursor-pointer group bg-neutral-900 border border-neutral-800" 
                style={{ paddingTop: aspectRatio }}
              >
                {playingIndex === idx && (item.type === "video" || item.type === "short") ? (
                  <>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={`${item?.srcURL}?autoplay=1`}
                      title={item?.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlayingIndex(null);
                      }}
                      className="absolute z-50 p-2 text-white transition bg-black bg-opacity-50 rounded-full top-2 right-2 hover:bg-opacity-80"
                      aria-label="Close video"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="absolute inset-0 w-full h-full" onClick={handleCardClick}>
                    {/* Thumbnail Image */}
                    <img
                      src={item?.thumbnailURL}
                      alt={item?.title}
                      className="absolute top-0 left-0 object-cover w-full h-full rounded-lg transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-all duration-300" />

                    {/* Metadata Content */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1">
                      <span className="text-xs uppercase font-medium tracking-wider bg-[#273fb7] px-2 py-0.5 rounded-[4px] self-start">
                        {item?.type}
                      </span>
                      <h3 className="text-sm md:text-base font-semibold text-white drop-shadow-md">
                        {item?.title}
                      </h3>
                      {/* Topics Tag List */}
                      {item.topics && item.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1 opacity-80">
                          {item.topics.slice(0, 3).map((topic, tIdx) => (
                            <span key={tIdx} className="text-[10px] text-gray-300 bg-neutral-800 px-1.5 py-0.5 rounded">
                              #{topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Icon Indicators */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {(item.type === "video" || item.type === "short") && (
                        <div className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-75 rounded-full group-hover:scale-110 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}

                      {item.type === "image" && (
                        <div className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-75 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                        </div>
                      )}

                      {item.type === "pdf" && (
                        <div className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-75 rounded-full group-hover:scale-110 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          >
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxImage} 
              alt="Project View" 
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WorkProjectSection;
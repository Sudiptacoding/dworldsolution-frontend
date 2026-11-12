// "use client";
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import DragandDrop from "../DragandDrop/DragandDrop";

// function Video() {
//   const [items, setItems] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [playingIndex, setPlayingIndex] = useState(null); // track which video is playing
//   const [showDragAndDrop, setShowDragAndDrop] = useState(false);

//   // ফিল্টার ও টপিক সার্চ স্টেট
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedType, setSelectedType] = useState("all"); // all, video, short, image, pdf

//   // ইমেজ দেখার জন্য লাইটবক্স স্টেট
//   const [lightboxImage, setLightboxImage] = useState(null);

//   // ------------------- ADMIN STATES -------------------
//   const [isAdminMode, setIsAdminMode] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null); // null মানে নতুন পোস্ট, অবজেক্ট মানে এডিট
//   const [formData, setFormData] = useState({
//     title: "",
//     src: "",
//     thumbnail: "",
//     category: "",
//     type: "video",
//     topics: ""
//   });

// const [subCategories, setSubCategories] = useState([]);

// const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
// const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);

// // API থেকে ক্যাটাগরি ও সাবক্যাটাগরি ফেচ করার জন্য useEffect
// useEffect(() => {
//   const fetchCategoriesAndSubCategories = async () => {
//     try {
//       // আপনার ব্যাকএন্ড API এন্ডপয়েন্ট এখানে বসাবেন
//       const res = await axios.get("https://dworldsolution-backend.vercel.app/api/categories");

//       // ধরে নিচ্ছি API থেকে { categories: [...], subcategories: [...] } আকারে ডেটা আসছে
//       setCategories(res.data.categories || []);
//       setSubCategories(res.data.subcategories || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   fetchCategoriesAndSubCategories();
// }, []);

//   const [isUploading, setIsUploading] = useState(false);

//   // ImgBB-তে ইমেজ আপলোড করার হ্যান্ডলার
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const imgbbApiKey = "9d5e814c7c5f4867978ca6169e144b8b"; // আপনার ImgBB API Key এখানে বসান
//     const uploadData = new FormData();
//     uploadData.append("image", file);

//     setIsUploading(true);

//     try {
//       const response = await axios.post('https://api.imgbb.com/1/upload', uploadData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         params: {
//           key: imgbbApiKey,
//         },
//       });

//       const imageUrl = response.data.data.url;
//       // আপলোড করা ইমেজের URL ফর্ম স্টেটে সেট করা হলো
//       setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));
//       alert('Image uploaded successfully!');
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       alert('Image upload failed!');
//     } finally {
//       setIsUploading(false);
//     }
//   };

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
//       return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
//     }
//     return "/placeholder.jpg";
//   };

//   // API থেকে ডেটা ফেচ করার মূল ফাংশন
//   const fetchItems = async () => {
//     try {
//       const res = await axios.get("https://dworldsolution-backend.vercel.app/header-video-upload");

//       const apiData = res.data.map((item) => {
//         let detectedType = item.type || "video";
//         if (item.category === "Shorts" || item.src?.includes("/shorts/")) {
//           detectedType = "short";
//         }

//         return {
//           id: item.id || item._id,
//           title: item.title || "Untitled Project",
//           rawSrc: item.src, // এডিট করার সুবিধার জন্য মূল লিঙ্কটি আলাদা রাখা হলো
//           srcURL: detectedType === "video" || detectedType === "short" ? getEmbedURL(item.src) : item.src,
//           thumbnailURL: getFallbackThumbnail(item.src, item.thumbnail),
//           rawThumbnail: item.thumbnail || "", // এডিটের জন্য মূল কাস্টম ইমেজ রাখা হলো
//           category: item.category,
//           type: detectedType,
//           topics: item.topics || [],
//         };
//       });

//       setItems(apiData);

//       const cats = Array.from(new Set(apiData.map((v) => v.category)));
//       setCategories(cats);

//       // যদি কারেন্ট সিলেক্টেড ক্যাটাগরি নতুন লিস্টে না থাকে, তবে প্রথম ক্যাটাগরি সিলেক্ট করবে
//       if (cats.length > 0 && !cats.includes(activeCategory)) {
//         setActiveCategory(cats[0]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch projects:", error);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, [activeCategory]);

//   // টপিক, টাইটেল এবং ক্যাটাগরি বেসড সার্চিং ফিল্টার
//   const filteredItems = items?.filter((item) => {
//     const matchesCategory = item?.category === activeCategory;
//     const matchesType = selectedType === "all" || item?.type === selectedType;

//     const normalizedQuery = searchQuery.toLowerCase();
//     const matchesSearch =
//       item?.title?.toLowerCase().includes(normalizedQuery) ||
//       item?.category?.toLowerCase().includes(normalizedQuery) ||
//       item?.topics?.some(topic => topic.toLowerCase().includes(normalizedQuery));

//     return matchesCategory && matchesType && matchesSearch;
//   });

//   // ------------------- CRUD OPERATIONS -------------------

//   // ফর্ম সাবমিট (Create এবং Update) হ্যান্ডলার
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         title: formData.title,
//         src: formData.src,
//         thumbnail: formData.thumbnail,
//         category: formData.category,
//         type: formData.type,
//         topics: formData.topics // কমা দিয়ে সেপারেটেড করা স্ট্রিং ব্যাকএন্ডে গিয়ে অটোমেটিক অ্যারে হবে
//       };

//       if (editingItem) {
//         // UPDATE (PUT) Request
//         await axios.put(`https://dworldsolution-backend.vercel.app/header-video-upload/${editingItem.id}`, payload);
//       } else {
//         // CREATE (POST) Request
//         await axios.post("https://dworldsolution-backend.vercel.app/header-video-upload", payload);
//       }

//       // ফর্ম স্টেট রিসেট ও মোডাল ক্লোজ
//       setIsModalOpen(false);
//       setEditingItem(null);
//       setFormData({ title: "", src: "", thumbnail: "", category: "", type: "video", topics: "" });

//       // নতুন ডেটা পুনরায় লোড
//       await fetchItems();
//     } catch (error) {
//       console.error("Failed to save project:", error);
//       alert("Error saving project. Please try again.");
//     }
//   };

//   // এডিটের জন্য ফর্ম ওপেন ও ফিল্ড পপুলেট করার ফাংশন
//   const handleEditClick = (item, e) => {
//     e.stopPropagation(); // কার্ডের ক্লিক ইভেন্ট বন্ধ করার জন্য
//     setEditingItem(item);
//     setFormData({
//       title: item.title,
//       src: item.rawSrc,
//       thumbnail: item.rawThumbnail,
//       category: item.category,
//       type: item.type,
//       topics: item.topics.join(", ") // অ্যারে থেকে কমা-স্পেস স্ট্রিং তৈরি
//     });
//     setIsModalOpen(true);
//   };

//   // প্রজেক্ট ডিলিট করার ফাংশন
//   const handleDeleteClick = async (id, e) => {
//     e.stopPropagation(); // কার্ডের ক্লিক ইভেন্ট বন্ধ করার জন্য
//     if (window.confirm("Are you sure you want to delete this project?")) {
//       try {
//         await axios.delete(`https://dworldsolution-backend.vercel.app/header-video-upload/${id}`);
//         await fetchItems();
//       } catch (error) {
//         console.error("Failed to delete project:", error);
//         alert("Failed to delete. Please try again.");
//       }
//     }
//   };

//   // নতুন প্রজেক্ট অ্যাড করার মোডাল ওপেন করা
//   const handleAddNewClick = () => {
//     setEditingItem(null);
//     setFormData({ title: "", src: "", thumbnail: "", category: activeCategory, type: "video", topics: "" });
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="pt-0 text-white bg-black !md:pt-0 min-h-screen relative">
//       {/* Heading */}
//       <div className="px-4 pt-0 pb-12 text-center md:py-0 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.1 }}
//           style={{ fontFamily: "'Syne', sans-serif" }}
//           className="inline-block text-sm font-semibold uppercase tracking-[1px] px-4 py-1 rounded-full mb-4 animate-pulse bg-neutral-900 border border-neutral-800"
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

// {/* বাটন ট্রু (True) হলে ড্র্যাগ অ্যান্ড ড্রপ কম্পোনেন্টটি দেখাবে */}
//       {showDragAndDrop && (
//         <div className="max-w-5xl mx-auto px-4 mb-8 transition-all duration-300">
//           <DragandDrop />
//         </div>
//       )}

//       {/* Control Row: Tabs (Left) & Search/Filter (Right Corner) */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, delay: 0.4 }}
//         className="max-w-5xl mx-auto px-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4"
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

//         {/* Right Side Search, Filter, Action Option */}
//         <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
//           {/* Add New Button (Only in Admin Mode) */}
//           {isAdminMode && (
//             <button
//               onClick={handleAddNewClick}
//               className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-[10px] flex items-center justify-center gap-2 transition-all duration-300"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//               </svg>
//               Add Project
//             </button>
//           )}

//           {/* Topic Search Input */}
//           <div className="relative w-full sm:w-60">
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

//       {/* Admin Mode Toggle Switch Bar */}
//       <div className="max-w-5xl mx-auto px-4 mb-8 flex justify-end">
//         <button
//           onClick={() => setIsAdminMode(!isAdminMode)}
//           className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-300 ${
//             isAdminMode
//               ? "bg-[#273fb7]/20 border-[#273fb7] text-white"
//               : "bg-neutral-900 border-neutral-800 text-gray-400 hover:text-white"
//           }`}
//         >
//           {isAdminMode ? "🔒 Exit Admin" : "🔓 Admin Controls"}
//         </button>
//              <button
//           onClick={() => setShowDragAndDrop(!showDragAndDrop)}
//           className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-300 ${
//             showDragAndDrop
//               ? "bg-emerald-500/20 border-emerald-500 text-white"
//               : "bg-neutral-900 border-neutral-800 text-gray-400 hover:text-white"
//           }`}
//         >
//           {showDragAndDrop ? "✕ Close Reorder" : "↕️ Reorder Videos"}
//         </button>
//       </div>

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
//                 {/* Admin Quick Action Overlays on Cards */}
//                 {isAdminMode && (
//                   <div className="absolute top-2 right-2 z-30 flex items-center gap-1.5">
//                     <button
//                       onClick={(e) => handleEditClick(item, e)}
//                       className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
//                       title="Edit"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={(e) => handleDeleteClick(item.id, e)}
//                       className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
//                       title="Delete"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </button>
//                   </div>
//                 )}

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
//                     {/* Thumbnail Image */}
//                     <img
//                       src={item?.thumbnailURL}
//                       alt={item?.title}
//                       className="absolute top-0 left-0 object-cover w-full h-full rounded-lg transition-transform duration-500 group-hover:scale-105"
//                     />

//                     {/* Dark overlay */}
//                     <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-all duration-300" />

//                     {/* Metadata Content */}
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

//       {/* --- ADD / EDIT PROJECT SLIDE-IN MODAL --- */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.95, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.95, y: 20 }}
//               className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Modal Header */}
//               <div className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
//                 <h3 className="font-semibold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
//                   {editingItem ? "Edit Project Details" : "Add New Work Project"}
//                 </h3>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Modal Form */}
//               <form onSubmit={handleFormSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[75vh]">
//                 {/* Title */}
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Project Title</label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     placeholder="Enter project name..."
//                     className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7]"
//                   />
//                 </div>

//                 {/* Sourse Link (YouTube, Image or PDF URL) */}
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Source URL (Video / Image / PDF Link)</label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.src}
//                     onChange={(e) => setFormData({ ...formData, src: e.target.value })}
//                     placeholder="https://youtube.com/watch?v=... or asset link"
//                     className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7]"
//                   />
//                 </div>

//                 {/* Custom Thumbnail */}
//  {/* Custom Thumbnail with ImgBB Upload option */}
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
//                     Custom Thumbnail (Optional)
//                   </label>

//                   <div className="flex flex-col sm:flex-row gap-2">
//                     {/* Direct URL Input */}
//                     <input
//                       type="text"
//                       value={formData.thumbnail}
//                       onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
//                       placeholder="Paste Image URL or upload file..."
//                       className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7]"
//                     />

//                     {/* ImgBB Upload Input (Button Styled) */}
//                     <label className="cursor-pointer bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 px-4 py-2 rounded-lg text-sm text-white text-center transition-colors flex items-center justify-center gap-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//                       </svg>
//                       {isUploading ? "Uploading..." : "Upload"}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="hidden"
//                         disabled={isUploading}
//                       />
//                     </label>
//                   </div>

//                   {/* Realtime Upload Preview with Clear Option */}
//                   {formData.thumbnail && (
//                     <div className="mt-2 relative w-24 h-14 rounded overflow-hidden border border-neutral-800 self-start">
//                       <img
//                         src={formData.thumbnail}
//                         alt="Thumbnail Preview"
//                         className="w-full h-full object-cover"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setFormData({ ...formData, thumbnail: "" })}
//                         className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 p-1 rounded-bl text-white transition-colors"
//                         title="Remove image"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Format/Type & Category in a Row */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Format Format</label>
//                     <select
//                       value={formData.type}
//                       onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//                       className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7] cursor-pointer"
//                     >
//                       <option value="video">Video</option>
//                       <option value="short">Short</option>
//                       <option value="image">Image</option>
//                       <option value="pdf">PDF</option>
//                     </select>
//                   </div>

//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Category</label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.category}
//                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                       placeholder="e.g. Graphic Design"
//                       className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7]"
//                     />
//                   </div>
//                 </div>

//                 {/* Topics Input */}
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Related Topics (Comma Separated)</label>
//                   <input
//                     type="text"
//                     value={formData.topics}
//                     onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
//                     placeholder="e.g. promo, minimal, corporate, design"
//                     className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7]"
//                   />
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-neutral-800">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-sm font-semibold rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-2 bg-[#273fb7] hover:bg-[#1e329a] text-sm font-semibold text-white rounded-lg transition-colors"
//                   >
//                     {editingItem ? "Save Changes" : "Create Project"}
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

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

// export default Video;

"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import DragandDrop from "../DragandDrop/DragandDrop";
import PdfModal from "@/components/PdfModal";

function Video() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [showDragAndDrop, setShowDragAndDrop] = useState(false);

  // ফিল্টার ও টপিক সার্চ স্টেট
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all"); // all, video, short, image, pdf

  // ইমেজ দেখার জন্য লাইটবক্স স্টেট
  const [lightboxImage, setLightboxImage] = useState(null);

  // ------------------- ADMIN STATES -------------------
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null মানে নতুন পোস্ট, অবজেক্ট মানে এডিট
  const [formData, setFormData] = useState({
    title: "",
    src: "",
    thumbnail: "",
    category: "",
    subcategory: "", // নতুন subcategory ফিল্ড
    type: "video",
    topics: "",
  });

  const [selectedPdf, setSelectedPdf] = useState(null); // PDF ওপেন করার জন্য

  // ড্রপডাউন কন্ট্রোল স্টেট
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);

  // ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ করার জন্য Ref
  const categoryWrapperRef = useRef(null);
  const subCategoryWrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryWrapperRef.current && !categoryWrapperRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (subCategoryWrapperRef.current && !subCategoryWrapperRef.current.contains(event.target)) {
        setShowSubCategoryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // API থেকে ক্যাটাগরি ও সাবক্যাটাগরি ফেচ করার জন্য useEffect
  useEffect(() => {
    const fetchCategoriesAndSubCategories = async () => {
      try {
        const res = await axios.get("https://dworldsolution-backend.vercel.app/header-video-upload/categories");
        setCategories(res.data.categories || []);
        setSubCategories(res.data.subcategories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesAndSubCategories();
  }, []);

  const [isUploading, setIsUploading] = useState(false);

  // ImgBB-তে ইমেজ আপলোড করার হ্যান্ডলার
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgbbApiKey = "9d5e814c7c5f4867978ca6169e144b8b";
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
      setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

// ১. ইউটিউব ও শর্টস লিঙ্ক থেকে ভিডিও আইডি এক্সট্রাক্ট করার ফাংশন
  const getYoutubeId = (url) => {
    if (!url) return null;
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    } catch {
      return null;
    }
  };

  // ২. ইউটিউব লিঙ্ক কনভার্ট করে এমবেড করার ফাংশন
  const getEmbedURL = (url) => {
    const id = getYoutubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : url;
  };

  // ৩. থাম্বনেইল না দিলে অটোমেটিক ইউটিউব থাম্বনেইল ধরার ফাংশন
  const getFallbackThumbnail = (url, customThumbnail) => {
    // যদি কাস্টম ইমেজ (ImgBB) আপলোড করা থাকে এবং সেটি কোনো ইউটিউব লিঙ্ক না হয়
    if (
      customThumbnail && 
      customThumbnail.trim() !== "" && 
      !customThumbnail.includes("youtube.com") && 
      !customThumbnail.includes("youtu.be")
    ) {
      return customThumbnail;
    }

    // অটোমেটিক ইউটিউব থাম্বনেইল (hqdefault সবসময় কাজ করে)
    const id = getYoutubeId(url);
    if (id) {
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
    return "/placeholder.jpg";
  };

  // API থেকে ডেটা ফেচ করার মূল ফাংশন
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
          rawSrc: item.src,
          srcURL: detectedType === "video" || detectedType === "short" ? getEmbedURL(item.src) : item.src,
          thumbnailURL: getFallbackThumbnail(item.src, item.thumbnail),
          rawThumbnail: item.thumbnail || "",
          category: item.category,
          subcategory: item.subcategory || "",
          type: detectedType,
          topics: item.topics || [],
        };
      });

      setItems(apiData);

      const cats = Array.from(new Set(apiData.map((v) => v.category).filter(Boolean)));
      if (cats.length > 0) {
        setCategories((prev) => Array.from(new Set([...prev, ...cats])));
      }

      if (cats.length > 0 && !cats.includes(activeCategory)) {
        setActiveCategory(cats[0]);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [activeCategory]);

  // ফিল্টার আইটেম
  const filteredItems = items?.filter((item) => {
    const matchesCategory = item?.category === activeCategory;
    const matchesType = selectedType === "all" || item?.type === selectedType;

    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch =
      item?.title?.toLowerCase().includes(normalizedQuery) ||
      item?.category?.toLowerCase().includes(normalizedQuery) ||
      item?.topics?.some((topic) => topic.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesType && matchesSearch;
  });

  // ক্যাটাগরি ও সাবক্যাটাগরি ডাটা স্ট্রিং বা অবজেক্ট যাই আসুক হ্যান্ডেল করার হেল্পার
  const getItemName = (item) => (typeof item === "string" ? item : item?.name || item?.title || "");

  // টাইপ অনুযায়ী রিয়েলটাইম ফিল্টার হওয়া ক্যাটাগরি ও সাবক্যাটাগরি লিস্ট
  const filteredCategoryOptions = categories.filter((cat) =>
    getItemName(cat)
      .toLowerCase()
      .includes((formData.category || "").toLowerCase()),
  );

  const filteredSubCategoryOptions = subCategories.filter((sub) =>
    getItemName(sub)
      .toLowerCase()
      .includes((formData.subcategory || "").toLowerCase()),
  );

  // ------------------- CRUD OPERATIONS -------------------

  // ফর্ম সাবমিট (Create এবং Update)
  // ফর্ম সাবমিট (Create এবং Update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // ইমেজ বা পিডিএফ হলে এবং Source URL খালি থাকলে আপলোড করা Thumbnail URL-টি src হিসেবে বসে যাবে
      const finalSrc = formData.src || formData.thumbnail;

      // ভিডিও বা শর্টসের জন্য URL বাধ্যতামূলক চেক
      if (!finalSrc && (formData.type === "video" || formData.type === "short")) {
        alert("Please provide a Video Source URL!");
        return;
      }

      // ইমেজের জন্য অন্তত ইমেজ ফাইল আপলোড করা হয়েছে কি না চেক
      if (!finalSrc && formData.type === "image") {
        alert("Please upload an Image first!");
        return;
      }

const payload = {
        title: formData.title,
        src: finalSrc,
        // শুধুমাত্র ছবি আপলোড করলে বা টাইপ image হলেই thumbnail সেভ হবে, ভিডিও হলে খালি থাকবে যাতে অটো ইউটিউব থাম্বনেইল ধরে
        thumbnail: formData.thumbnail || (formData.type === "image" ? finalSrc : ""),
        category: formData.category,
        subcategory: formData.subcategory,
        type: formData.type,
        topics: formData.topics
      };

      if (editingItem) {
        await axios.put(`https://dworldsolution-backend.vercel.app/header-video-upload/${editingItem.id}`, payload);
      } else {
        await axios.post("https://dworldsolution-backend.vercel.app/header-video-upload", payload);
      }

      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({ title: "", src: "", thumbnail: "", category: "", subcategory: "", type: "video", topics: "" });

      await fetchItems();
    } catch (error) {
      console.error("Failed to save project:", error);
      alert("Error saving project. Please try again.");
    }
  };

  // এডিট বাটনে ক্লিক করলে ফর্ম ফিল্ড পপুলেট
  const handleEditClick = (item, e) => {
    e.stopPropagation();
    setEditingItem(item);
    setFormData({
      title: item.title,
      src: item.rawSrc,
      thumbnail: item.rawThumbnail,
      category: item.category || "",
      subcategory: item.subcategory || "", // এডিটের সময় আগের সাব-ক্যাটাগরি বসানো হচ্ছে
      type: item.type,
      topics: (item.topics || []).join(", "),
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`https://dworldsolution-backend.vercel.app/header-video-upload/${id}`);
        await fetchItems();
      } catch (error) {
        console.error("Failed to delete project:", error);
        alert("Failed to delete. Please try again.");
      }
    }
  };

  // নতুন প্রজেক্ট অ্যাড করার মোডাল ওপেন করা
  const handleAddNewClick = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      src: "",
      thumbnail: "",
      category: activeCategory || "",
      subcategory: "",
      type: "video",
      topics: "",
    });
    setIsModalOpen(true);
  };

// PDF আপলোড হ্যান্ডলার (কোনো ব্যাকএন্ড সার্ভার বা লোকালহোস্ট লাগবে না, সরাসরি ব্রাউজারেই কনভার্ট হবে)
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ভার্সেলের ম্যাক্সিমাম লিমিট ৪ এমবি
    if (file.size > 4 * 1024 * 1024) {
      alert("PDF size must be under 4MB!");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = () => {
      // PDF টি সরাসরি Base64 স্ট্রিং হয়ে src-তে বসে যাবে এবং MongoDB-তে সেভ হবে
      setFormData((prev) => ({ ...prev, src: reader.result }));
      setIsUploading(false);
      alert("PDF loaded successfully!");
    };

    reader.onerror = () => {
      setIsUploading(false);
      alert("Failed to read PDF file!");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="pt-0 text-white bg-black !md:pt-0 min-h-screen relative">
      {/* Heading */}
      <div className="px-4 pt-0 pb-12 text-center md:py-0 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="inline-block text-sm font-semibold uppercase tracking-[1px] px-4 py-1 rounded-full mb-4 animate-pulse bg-neutral-900 border border-neutral-800"
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

      {showDragAndDrop && (
        <div className="max-w-5xl mx-auto px-4 mb-8 transition-all duration-300">
          <DragandDrop />
        </div>
      )}

      {/* Control Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="max-w-5xl mx-auto px-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        {/* Left Side Tabs */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
          {categories?.map((cat) => {
            const catName = getItemName(cat);
            return (
              <button
                key={catName}
                onClick={() => {
                  setActiveCategory(catName);
                  setPlayingIndex(null);
                }}
                className={`px-[14px] py-[8px] tracking-[1px] text-sm font-sans transition-all duration-300 ${
                  activeCategory === catName
                    ? "bg-[#273fb7] text-white font-semibold rounded-[10px]"
                    : "border border-transparent text-[#9eadb9] hover:bg-gray-800 rounded-[10px]"
                }`}
              >
                {catName}
              </button>
            );
          })}
        </div>

        {/* Right Side Search, Filter, Action Option */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
          {isAdminMode && (
            <button
              onClick={handleAddNewClick}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-[10px] flex items-center justify-center gap-2 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Project
            </button>
          )}

          <div className="relative w-full sm:w-60">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by topic/title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-900 text-white border border-neutral-800 rounded-[10px] focus:outline-none focus:border-[#273fb7] transition-all"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setPlayingIndex(null);
            }}
            className="w-full sm:w-auto bg-neutral-900 text-white border border-neutral-800 px-3 py-2 text-sm rounded-[10px] focus:outline-none focus:border-[#273fb7] transition-all cursor-pointer"
          >
            <option value="all">All Formats</option>
            <option value="video">Videos</option>
            <option value="short">Shorts</option>
            <option value="image">Images</option>
            <option value="pdf">PDFs</option>
          </select>
        </div>
      </motion.div>

      {/* Admin Mode Toggle Bar */}
      <div className="max-w-5xl mx-auto px-4 mb-8 flex justify-end gap-2">
        <button
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-300 ${
            isAdminMode ? "bg-[#273fb7]/20 border-[#273fb7] text-white" : "bg-neutral-900 border-neutral-800 text-gray-400 hover:text-white"
          }`}
        >
          {isAdminMode ? "🔒 Exit Admin" : "🔓 Admin Controls"}
        </button>
        <button
          onClick={() => setShowDragAndDrop(!showDragAndDrop)}
          className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-300 ${
            showDragAndDrop ? "bg-emerald-500/20 border-emerald-500 text-white" : "bg-neutral-900 border-neutral-800 text-gray-400 hover:text-white"
          }`}
        >
          {showDragAndDrop ? "✕ Close Reorder" : "↕️ Reorder Videos"}
        </button>
      </div>

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
            const aspectRatio = isShorts ? "177.77%" : "56.25%";

            const handleCardClick = () => {
              if (item.type === "video" || item.type === "short") {
                setPlayingIndex(idx);
              } else if (item.type === "image") {
                setLightboxImage(item.srcURL);
              } else if (item.type === "pdf") {
                window.open(item.srcURL, "_blank");
              } else if (item.type === "pdf") {
                setSelectedPdf({ url: item.srcURL, title: item.title });
              }
            };

            return (
              <div
                key={item.id || idx}
                className="relative w-full overflow-hidden rounded-lg cursor-pointer group bg-neutral-900 border border-neutral-800"
                style={{ paddingTop: aspectRatio }}
              >
                {isAdminMode && (
                  <div className="absolute top-2 right-2 z-30 flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleEditClick(item, e)}
                      className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                      title="Edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(item.id, e)}
                      className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                )}

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
                    
                    {/* ১. ব্যাকগ্রাউন্ড প্রিভিউ (PDF হলে PDF Preview, ইমেজ/ভিডিও হলে সাধারণ Thumbnail) */}
                    {item.type === "pdf" && (!item.rawThumbnail || item.rawThumbnail.endsWith(".pdf")) ? (
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-neutral-900 to-neutral-950 flex items-center justify-center overflow-hidden">
                        {/* PDF-এর প্রথম পেজ কার্ডের ব্যাকগ্রাউন্ডে ইনলাইন প্রিভিউ দেখাবে */}
                        <iframe
                          src={`${item.srcURL}#toolbar=0&navpanes=0&view=Fit`}
                          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 border-none scale-105"
                          title="PDF Card View"
                        />
                      </div>
                    ) : (
                      <img
                        src={item?.thumbnailURL}
                        alt={item?.title}
                        className="absolute top-0 left-0 object-cover w-full h-full rounded-lg transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* ডার্ক ওভারলে */}
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-all duration-300" />

                    {/* ২. মেটাডেটা (ক্যাটাগরি, সাব-ক্যাটাগরি, টাইটেল ও টপিকস) */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <span className="text-xs uppercase font-medium tracking-wider bg-[#273fb7] px-2 py-0.5 rounded-[4px] self-start">
                          {item?.type}
                        </span>
                        {item?.subcategory && (
                          <span className="text-xs tracking-wider bg-neutral-800 border border-neutral-700 px-2 py-0.5 rounded-[4px] text-gray-300">
                            {item?.subcategory}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm md:text-base font-semibold text-white drop-shadow-md">
                        {item?.title}
                      </h3>
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

                    {/* ৩. সেন্টারের আইকনসমূহ (ভিডিও, ইমেজ বা PDF রিড আইকন) */}
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
                        <div className="flex flex-col items-center gap-1 group-hover:scale-110 transition-transform duration-300">
                          <div className="flex items-center justify-center w-14 h-14 bg-red-600/90 text-white rounded-full shadow-lg shadow-red-950/60">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider bg-black/60 px-2 py-0.5 rounded text-gray-200">
                            Read PDF
                          </span>
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

      {/* --- ADD / EDIT PROJECT SLIDE-IN MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
                <h3 className="font-semibold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {editingItem ? "Edit Project Details" : "Add New Work Project"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleFormSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[75vh]">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter project name..."
                    className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7]"
                  />
                </div>

                {/* Source Link */}
                {/* Source Link (Image হলে এটি আর Required থাকবে না) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
                    Source URL {formData.type === "image" ? "(Optional for Image)" : "(Video / PDF Link)"}
                  </label>
                  <input
                    type="text"
                    required={formData.type === "video" || formData.type === "short"}
                    value={formData.src}
                    onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                    placeholder={formData.type === "image" ? "Optional (Leave blank to use uploaded image)" : "https://youtube.com/watch?v=..."}
                    className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7]"
                  />
                  {formData.type === "pdf" && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Upload PDF File</label>
                      <label className="cursor-pointer bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 px-4 py-2.5 rounded-lg text-sm text-white flex items-center justify-center gap-2">
                        📄 {isUploading ? "Uploading PDF..." : "Choose & Upload PDF Document"}
                        <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="hidden" disabled={isUploading} />
                      </label>
                      {formData.src && <span className="text-xs text-green-400 truncate">Uploaded: {formData.src}</span>}
                    </div>
                  )}
                </div>

                {/* Custom Thumbnail */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Custom Thumbnail (Optional)</label>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      placeholder="Paste Image URL or upload file..."
                      className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7]"
                    />

                    <label className="cursor-pointer bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 px-4 py-2 rounded-lg text-sm text-white text-center transition-colors flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      {isUploading ? "Uploading..." : "Upload"}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading} />
                    </label>
                  </div>

                  {formData.thumbnail && (
                    <div className="mt-2 relative w-24 h-14 rounded overflow-hidden border border-neutral-800 self-start">
                      <img src={formData.thumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, thumbnail: "" })}
                        className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 p-1 rounded-bl text-white transition-colors"
                        title="Remove image"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Format / Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Format</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7] cursor-pointer"
                  >
                    <option value="video">Video</option>
                    <option value="short">Short</option>
                    <option value="image">Image</option>
                    <option value="pdf">PDF</option>
                  </select>
                </div>

                {/* CATEGORY & SUBCATEGORY (Filterable Dropdown + Manual Typing) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category Field */}
                  <div className="flex flex-col gap-1.5 relative" ref={categoryWrapperRef}>
                    <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Category</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onFocus={() => setShowCategoryDropdown(true)}
                      onChange={(e) => {
                        setFormData({ ...formData, category: e.target.value });
                        setShowCategoryDropdown(true);
                      }}
                      placeholder="Type or select category..."
                      className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7]"
                    />

                    {/* Filtered Category Dropdown */}
                    {showCategoryDropdown && filteredCategoryOptions.length > 0 && (
                      <ul className="absolute top-[102%] left-0 right-0 max-h-44 overflow-y-auto bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl z-50">
                        {filteredCategoryOptions.map((cat, idx) => {
                          const val = getItemName(cat);
                          return (
                            <li
                              key={idx}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, category: val }));
                                setShowCategoryDropdown(false);
                              }}
                              className="px-3 py-2 text-sm text-gray-300 hover:bg-[#273fb7] hover:text-white cursor-pointer transition-colors"
                            >
                              {val}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {/* Subcategory Field */}
                  <div className="flex flex-col gap-1.5 relative" ref={subCategoryWrapperRef}>
                    <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Subcategory</label>
                    <input
                      type="text"
                      value={formData.subcategory}
                      onFocus={() => setShowSubCategoryDropdown(true)}
                      onChange={(e) => {
                        setFormData({ ...formData, subcategory: e.target.value });
                        setShowSubCategoryDropdown(true);
                      }}
                      placeholder="Type or select subcategory..."
                      className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7]"
                    />

                    {/* Filtered Subcategory Dropdown */}
                    {showSubCategoryDropdown && filteredSubCategoryOptions.length > 0 && (
                      <ul className="absolute top-[102%] left-0 right-0 max-h-44 overflow-y-auto bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl z-50">
                        {filteredSubCategoryOptions.map((sub, idx) => {
                          const val = getItemName(sub);
                          return (
                            <li
                              key={idx}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, subcategory: val }));
                                setShowSubCategoryDropdown(false);
                              }}
                              className="px-3 py-2 text-sm text-gray-300 hover:bg-[#273fb7] hover:text-white cursor-pointer transition-colors"
                            >
                              {val}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Topics Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Related Topics (Comma Separated)</label>
                  <input
                    type="text"
                    value={formData.topics}
                    onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                    placeholder="e.g. promo, minimal, corporate, design"
                    className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#273fb7]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-sm font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#273fb7] hover:bg-[#1e329a] text-sm font-semibold text-white rounded-lg transition-colors"
                  >
                    {editingItem ? "Save Changes" : "Create Project"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox Modal */}
      <PdfModal isOpen={!!selectedPdf} onClose={() => setSelectedPdf(null)} pdfUrl={selectedPdf?.url} title={selectedPdf?.title} />

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          >
            <button onClick={() => setLightboxImage(null)} className="absolute top-4 right-4 text-white hover:text-gray-300 z-50">
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

export default Video;

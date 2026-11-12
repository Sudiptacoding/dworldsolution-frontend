"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

function WorkProjectSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);


  // মাউস দিয়ে ড্র্যাগ করে স্ক্রল করার রেফারেন্স ও স্টেট
  const categoryScrollRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // মাউস ক্লিক চাপলে
  const handleMouseDown = (e) => {
    isDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - categoryScrollRef.current.offsetLeft;
    scrollLeftRef.current = categoryScrollRef.current.scrollLeft;
  };

  // মাউস ছেড়ে দিলে বা বাইরে চলে গেলে
  const handleMouseUpOrLeave = () => {
    isDownRef.current = false;
  };

  // মাউস ধরে টানলে (Drag)
  const handleMouseMove = (e) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // স্ক্রল স্পিড
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true; // ড্র্যাগ করা হয়েছে
    }
    categoryScrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  // মাউসের হুইল (চাকা) ঘুরালে হরাইজন্টাল স্ক্রল হবে
  const handleWheel = (e) => {
    if (categoryScrollRef.current && e.deltaY !== 0) {
      categoryScrollRef.current.scrollLeft += e.deltaY * 0.9;
    }
  };




  // ফিল্টার ও সাব-ক্যাটাগরি স্টেট
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // লাইটবক্স ও পিডিএফ ভিউ স্টেট
  const [lightboxImage, setLightboxImage] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);

  // পেজিনেশন: ডিফল্ট ৬টি কার্ড দেখাবে
  const [visibleCount, setVisibleCount] = useState(6);

  // ক্যাটাগরি হরাইজন্টাল স্ক্রল রেফ
  // const categoryScrollRef = useRef(null);

  // যে কোনো ইউটিউব ও শর্টস লিঙ্ক থেকে আইডি নেওয়ার শক্তিশালী ফাংশন
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

  const getEmbedURL = (url) => {
    const id = getYoutubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : url;
  };

  // থাম্বনেইল না দিলে অটোমেটিক ইউটিউব থাম্বনেইল ধরার সঠিক লজিক
  const getFallbackThumbnail = (url, customThumbnail) => {
    // যদি কাস্টম ইমেজ (ImgBB) আপলোড করা থাকে এবং সেটি কোনো ইউটিউব লিঙ্ক না হয়
    if (customThumbnail && customThumbnail.trim() !== "" && !customThumbnail.includes("youtube.com") && !customThumbnail.includes("youtu.be")) {
      return customThumbnail;
    }

    // অটোমেটিক ইউটিউব থাম্বনেইল (hqdefault সবসময় ১০০% কাজ করে)
    const id = getYoutubeId(url);
    if (id) {
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
    return "/placeholder.jpg";
  };

  // ১. ইনিশিয়াল পেজ লোডে ইউআরএল থেকে ফিল্টার প্যারামিটার রীড করা
  useEffect(() => {
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");

    if (category) setActiveCategory(category);
    if (subcategory) setSelectedSubcategory(subcategory);
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
            rawThumbnail: item.thumbnail || "",
            category: item.category,
            subcategory: item.subcategory || "", // সাব-ক্যাটাগরি
            type: detectedType, // video, short, image, pdf
            topics: item.topics || [],
          };
        });

        setItems(apiData);

        const cats = Array.from(new Set(apiData.map((v) => v.category).filter(Boolean)));
        setCategories(cats);

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

  // ২. শুধুমাত্র প্রথমবার শেয়ারড লিংকে প্রবেশ করলেই স্ক্রল লজিক কাজ করবে
  useEffect(() => {
    if (items.length === 0) return;

    if (typeof window !== "undefined" && window.__hasScrolledToWork) {
      return;
    }

    let isReload = false;
    if (typeof window !== "undefined" && window.performance) {
      const navs = performance.getEntriesByType("navigation");
      if (navs.length > 0 && navs[0].type === "reload") {
        isReload = true;
      }
    }

    const params = new URLSearchParams(window.location.search);
    const hasParams = params.has("category") || params.has("subcategory");

    if (hasParams && !isReload) {
      const timer = setTimeout(() => {
        const el = document.getElementById("work");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          if (typeof window !== "undefined") {
            window.__hasScrolledToWork = true;
          }
        }
      }, 600);
      return () => clearTimeout(timer);
    } else {
      if (typeof window !== "undefined") {
        window.__hasScrolledToWork = true;
      }
    }
  }, [items]);

  // ৩. গ্লোবাল হ্যাশ-ইন্টারসেপ্টর
  useEffect(() => {
    const handleHashLinkClick = (e) => {
      const targetAnchor = e.target.closest("a");
      if (!targetAnchor) return;

      const href = targetAnchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.slice(1);

        if (targetId === "" || targetId === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          router.replace(window.location.pathname, { scroll: false });
        } else {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `${window.location.pathname}${window.location.search}#${targetId}`);
          }
        }
      }
    };

    document.addEventListener("click", handleHashLinkClick);
    return () => {
      document.removeEventListener("click", handleHashLinkClick);
    };
  }, [router]);

  // ক্যাটাগরি পরিবর্তনের সময় হ্যান্ডলার
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSelectedSubcategory(""); // ক্যাটাগরি চেঞ্জ হলে সাব-ক্যাটাগরি রিসেট
    setPlayingIndex(null);
    setVisibleCount(6); // নতুন ক্যাটাগরিতে আসলে আবার ৬টি কার্ড দিয়ে শুরু

    const params = new URLSearchParams(window.location.search);
    params.set("category", cat);
    params.delete("subcategory");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // সাব-ক্যাটাগরি পরিবর্তনের হ্যান্ডলার
  const handleSubcategoryChange = (sub) => {
    setSelectedSubcategory(sub);
    setPlayingIndex(null);
    setVisibleCount(6);

    const params = new URLSearchParams(window.location.search);
    if (sub) {
      params.set("subcategory", sub);
    } else {
      params.delete("subcategory");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // ক্যাটাগরি বার স্ক্রল করার ফাংশন (Arrows)
  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const offset = direction === "left" ? -240 : 240;
      categoryScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // শুধুমাত্র কারেন্ট একটিভ ক্যাটাগরির অধীনে থাকা সাব-ক্যাটাগরিগুলো বের করা
  const currentCategorySubcategories = Array.from(
    new Set(
      items
        .filter((item) => item.category === activeCategory)
        .map((item) => item.subcategory)
        .filter((sub) => sub && typeof sub === "string" && sub.trim() !== ""),
    ),
  );

  // ফিল্টারিং লজিক (ক্যাটাগরি ও সাব-ক্যাটাগরি অনুযায়ী)
  const filteredItems = items?.filter((item) => {
    const matchesCategory = !activeCategory || item?.category === activeCategory;
    const matchesSubcategory = !selectedSubcategory || item?.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase();

    return matchesCategory && matchesSubcategory;
  });

  // পেজিনেশন অনুযায়ী আইটেম স্লাইস করা (৬টি করে)
  const displayedItems = filteredItems.slice(0, visibleCount);

  return (
    <div id="work" className="pt-0 text-white bg-black md:pt-0 scroll-mt-10 min-h-screen">
      {/* Heading */}
      <div className="px-4 pt-0 pb-10 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="inline-block text-sm font-semibold uppercase tracking-[1px] px-4 py-1 rounded-full mb-4 bg-neutral-900 border border-neutral-800"
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

      {/* --- ক্যাটাগরি এবং সাব-ক্যাটাগরি ড্রপডাউন (পাশাপাশি ও বর্ডারলেস) --- */}
{/* --- ক্যাটাগরি (মাউস ড্র্যাগ স্ক্রল) এবং সাব-ক্যাটাগরি ড্রপডাউন --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        {/* Left: Category Tabs with Mouse Drag & Wheel Scroll (Scrollbar Hidden) */}
        <div 
          ref={categoryScrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseUp={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
          className="flex items-center gap-2 overflow-x-auto w-full md:w-auto flex-1 min-w-0 py-1 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories?.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                // ড্র্যাগ করার সময় যেন ভুলবশত ক্যাটাগরি ক্লিক না হয়ে যায়
                if (!hasDraggedRef.current) {
                  handleCategoryChange(cat);
                }
              }}
              className={`px-4 py-2 tracking-wide text-sm font-sans transition-all duration-200 rounded-[10px] shrink-0 whitespace-nowrap select-none ${
                activeCategory === cat
                  ? "bg-[#273fb7] text-white font-semibold shadow-md shadow-[#273fb7]/30"
                  : "text-[#9eadb9] hover:bg-neutral-900 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right: Sub-category Dropdown */}
        {currentCategorySubcategories.length > 0 && (
          <div className="w-full sm:w-56 shrink-0">
            <select
              value={selectedSubcategory}
              onChange={(e) => handleSubcategoryChange(e.target.value)}
              className="w-full bg-neutral-900 text-white border border-neutral-800 px-3.5 py-2 text-sm rounded-[10px] focus:outline-none focus:border-[#273fb7] transition-all cursor-pointer"
            >
              <option value="">All Sub-categories</option>
              {currentCategorySubcategories.map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}
      </motion.div>

      {/* --- ৩. গ্রিড কনটেন্ট (ভিডিও হলে ২টি, শর্টস/ইমেজ/পিডিএফ হলে ৩টি) --- */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        {(() => {
          const itemsWithIndex = displayedItems?.map((item, idx) => ({ ...item, originalIdx: idx })) || [];

          // চেক করা হচ্ছে কারেন্ট ক্যাটাগরি বা আইটেমটি Video কি না
          // যদি Shorts, Image বা PDF হয় তবে ৩টি কলাম; আর Video হলে ২টি কলাম
          const isThreeColumns =
            activeCategory === "Shorts" ||
            activeCategory?.toLowerCase() === "image" ||
            activeCategory?.toLowerCase() === "pdf" ||
            (displayedItems.length > 0 && displayedItems[0]?.type !== "video");

          // কলাম সংখ্যা নির্ধারণ (ভিডিও হলে ২, অন্যথায় ৩)
          const numCols = isThreeColumns ? 3 : 2;

          const columns = Array.from({ length: numCols }, () => []);
          itemsWithIndex.forEach((item, idx) => {
            columns[idx % numCols].push(item);
          });

          return (
            <div
              className={`grid gap-6 max-w-5xl mx-auto px-4 items-start ${
                numCols === 3 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {columns.map((colItems, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-6">
                  {colItems.map((item) => {
                    const isShorts = item?.type === "short" || item?.category === "Shorts";

                    // অ্যাসপেক্ট রেশিও (উচ্চতা)
                    let aspectRatio = "56.25%"; // ১৬:৯ (ভিডিও)
                    if (isShorts) {
                      aspectRatio = "177.77%"; // ৯:১৬ (শর্টস)
                    } else if (item.type === "image") {
                      // ছবির উচ্চতা কেমন চান:
                      aspectRatio = "100%"; // ১:১ স্কয়ার (উচ্চতা বাড়বে)
                      // aspectRatio = "56.25%"; // ভিডিওর মতো আড়াআড়ি/চ্যাপ্টা
                      // aspectRatio = "120%"; // পোর্ট্রেট/লম্বাটে ছবি
                    } else if (item.type === "pdf") {
                      // পিডিএফ সাধারণত কাগজের মতো লম্বাটে হয়:
                      aspectRatio = "130%"; // ডকুমেন্টের মতো খাড়া/লম্বাটে (A4 পেজের মতো সুন্দর লাগবে)
                    }
                    const idx = item.originalIdx;

                    const handleCardClick = () => {
                      if (item.type === "video" || item.type === "short") {
                        setPlayingIndex(idx);
                      } else if (item.type === "image") {
                        setLightboxImage(item.srcURL);
                      } else if (item.type === "pdf") {
                        setSelectedPdf({ url: item.srcURL, title: item.title });
                      }
                    };

                    return (
                      <div
                        key={item.id || idx}
                        className="relative w-full overflow-hidden rounded-xl cursor-pointer group bg-neutral-900 border border-neutral-800 transition-all duration-300"
                        style={{ paddingTop: aspectRatio }}
                      >
                        {/* আপনার ভেতরের কার্ড ও আইকন কোড অপরিবর্তিত থাকবে */}
                        {playingIndex === idx && (item.type === "video" || item.type === "short") ? (
                          <>
                            <iframe
                              className="absolute top-0 left-0 w-full h-full rounded-xl"
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
                            {item.type === "pdf" && (!item.rawThumbnail || item.rawThumbnail.endsWith(".pdf")) ? (
                              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-neutral-900 to-neutral-950 flex items-center justify-center overflow-hidden">
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
                                className="absolute top-0 left-0 object-cover w-full h-full rounded-xl transition-transform duration-500 group-hover:scale-105"
                              />
                            )}

                            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-all duration-300" />

                            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1">
                              <div className="flex gap-2 items-center flex-wrap">
                                <span className="text-xs uppercase font-medium tracking-wider bg-[#273fb7] px-2 py-0.5 rounded-[4px] self-start">
                                  {item?.type}
                                </span>
                                {item?.subcategory && (
                                  <span className="text-xs tracking-wider bg-neutral-800 border border-neutral-700 px-2 py-0.5 rounded-[4px] text-gray-300">
                                    {item?.subcategory}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-sm md:text-base font-semibold text-white drop-shadow-md">{item?.title}</h3>
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
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 text-black"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                  </svg>
                                </div>
                              )}

                              {item.type === "pdf" && (
                                <div className="flex flex-col items-center gap-1 group-hover:scale-110 transition-transform duration-300">
                                  <div className="flex items-center justify-center w-14 h-14 bg-red-600/90 text-white rounded-full shadow-lg shadow-red-950/60">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-7 h-7"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                      />
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
              ))}
            </div>
          );
        })()}

        {/* --- ৪. View More বাটন (৬ টির বেশি আইটেম থাকলে দেখাবে) --- */}
        {filteredItems.length > visibleCount && (
          <div className="flex justify-center mt-12 mb-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#273fb7] text-white text-sm font-semibold rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <span>View More</span>
              <span className="text-xs bg-[#273fb7] px-2 py-0.5 rounded-full">+{filteredItems.length - visibleCount}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
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
            <button onClick={() => setLightboxImage(null)} className="absolute top-4 right-4 text-white hover:text-gray-300 z-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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

      {/* PDF Viewer Inline Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 md:p-6"
          >
            <div className="relative w-full max-w-5xl h-[90vh] bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 bg-neutral-900">
                <div className="flex items-center gap-2.5 truncate">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">PDF</span>
                  <h3 className="text-white text-sm md:text-base font-semibold truncate max-w-xs md:max-w-md">
                    {selectedPdf?.title || "PDF Document"}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={selectedPdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-[#273fb7] hover:bg-[#1e329a] text-white px-3 py-1.5 rounded-lg transition"
                  >
                    Open New Tab
                  </a>
                  <button onClick={() => setSelectedPdf(null)} className="text-gray-400 hover:text-white transition px-2 py-1 text-lg font-bold">
                    ✕
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full h-full bg-neutral-900">
                <object data={`${selectedPdf.url}#toolbar=1`} type="application/pdf" className="w-full h-full">
                  <iframe src={`${selectedPdf.url}#toolbar=1`} className="w-full h-full border-none" title="PDF View" />
                </object>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WorkProjectSection;

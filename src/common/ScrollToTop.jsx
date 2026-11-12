"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          // bottom-6 এবং left-1/2 -translate-x-1/2 দিয়ে স্ক্রিনের একদম সেন্টার-বটমে পজিশন করা হয়েছে
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] cursor-pointer"
          onClick={scrollToTop}
        >
          {/* স্মুথ ফ্লোটিং অ্যানিমেশন (উপরে-নিচে দুলবে) */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center justify-center p-2 text-white/70 hover:text-white transition-colors group"
            aria-label="Scroll to top"
          >
            {/* ব্যাকগ্রাউন্ড ছাড়া প্রিমিয়াম অ্যারো আইকন */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
            
            {/* ছোট একটি অপশনাল টেক্সট বা লেবেল রাখতে চাইলে রাখতে পারেন, না চাইলে বাদ দিতে পারেন */}
            <span className="text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity mt-1 font-medium">
              Top
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
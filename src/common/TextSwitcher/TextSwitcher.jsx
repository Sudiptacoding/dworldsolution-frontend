"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const texts = ["Hook", "Title", "Value", "CTA"];

const TextSwitcher = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2500); // change every 2.5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[50px] overflow-hidden  text-white text-[24px] pl-2 md:text-[32px] font-semibold">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute"
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextSwitcher;

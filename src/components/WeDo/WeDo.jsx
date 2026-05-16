"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import classNames from "classnames";

const cards = [
  {
    title: "SAAS Videos",
    description: "Organic podcasts to build trust and create credibility among your audience.",
    image: "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6797946d7d95b7ff012094ce_2b.avif",
  },
  {
    title: "Short Form Videos",
    description: "Byte-sized top of funnel videos for Instagram Reels and TikTok.",
    image: "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6797946d852423e898d8cad9_1b.avif",
  },
  {
    title: "Youtube Videos",
    description: "Grow a personal brand in any niche with our trendy edits.",
    image: "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6797946d852423e898d8cad9_1b.avif",
  },
];

const MarqueeRow = ({ direction }) => {
  return (
    <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden mb-8">
      <div
        className={classNames(
          "flex gap-6 animate-marquee whitespace-nowrap",
          direction === "right" && "animate-marquee-reverse"
        )}
      >
        {[...cards, ...cards].map((card, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full max-w-[370px] sm:w-[320px] md:w-[360px] lg:w-[370px] h-[300px] transition-transform duration-300 hover:scale-[1.02]"
          >
         <div
  className="grid grid-cols-1 grid-rows-[auto_auto_auto] gap-4 cursor-pointer
    w-full h-full
    rounded-[20px] border border-[#1b1b1b]
    bg-[#111]
    relative overflow-hidden text-left shadow-lg
    justify-center items-start
    px-10 pt-12 pb-12"
  style={{
    backgroundImage:
      "radial-gradient(circle at top center, #1a1a2e 0%, #0f0f1a 40%, #090909 100%)",
  }}
>
  {/* Image */}
  <div className="relative w-[60px] h-[60px] mx-auto mb-2">
    <Image
      src={card.image}
      alt={card.title}
      layout="fill"
      objectFit="cover"
      className="object-cover rounded-md"
    />
  </div>

  {/* Title */}
  <h5 className="text-white text-3xl font-semibold leading-[1.3] font-syne text-center">
    {card.title}
  </h5>

  {/* Description */}
  <p className="text-sm text-center text-white break-words whitespace-normal font-syne">
    {card.description}
  </p>
</div>
          </div>
        ))}
      </div>

      {/* Side gradients (stronger) */}
      <div className="absolute top-0 left-0 z-20 w-40 h-full pointer-events-none bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute top-0 right-0 z-20 w-40 h-full pointer-events-none bg-gradient-to-l from-black via-black/80 to-transparent" />
    </div>
  );
};

const WeDo = () => {
  return (
    <div className="py-16 overflow-hidden bg-black">
      {/* Heading */}
      <div className="relative z-10 max-w-3xl px-4 mx-auto mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-sm font-semibold tracking-widest text-gray-300 uppercase font-syne"
        >
          CORE SERVICES
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-4xl pt-2 font-bold font-syne bg-gradient-to-r from-[#898e99] to-gray-400 bg-clip-text text-transparent"
        >
          Types Of Work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-2 text-3xl font-semibold text-white font-syne"
        >
          We Do
        </motion.p>
      </div>

      {/* Marquee Rows */}
      <MarqueeRow direction="left" />
      <MarqueeRow direction="right" />
    </div>
  );
};

export default WeDo;

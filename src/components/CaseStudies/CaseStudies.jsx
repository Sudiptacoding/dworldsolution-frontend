"use client";

import React from "react";
import { motion } from "framer-motion";
import VideoThumbnail from "../VideoThumbnail/VideoThumbnail";

function CaseStudies() {
  return (
    <div className="pt-0 text-white bg-black md:pt-16">
      <div className="px-4 pt-0 pb-12 text-center md:pt-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="inline-block text-sm font-semibold uppercase tracking-[1px] px-4 py-1 rounded-full mb-4"
        >
          case studies
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-4xl md:text-5xl font-semibold leading-tight bg-gradient-to-r from-[#898e99] to-gray-400 bg-clip-text text-transparent"
        >
          Some solid
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="pt-2 text-3xl font-semibold"
        >
          Case studies
        </motion.div>
      </div>

      <div
        className="max-w-5xl mx-auto p-14
  bg-gradient-to-b from-[#181929] via-[#000000] to-[#000000]
  rounded-2xl
  backdrop-blur-md
  border border-white/10
  flex flex-col space-y-9
"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {/* 01 Case study - full width */}
          <div className="w-full">
            <div className="mb-2 text-sm font-semibold tracking-widest text-white select-none">01 &nbsp;&nbsp;&nbsp;&nbsp;Case study</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {/* Case study text - full width */}
          <div className="w-full">
            <h3 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              <span className="block mb-2 font-sans font-medium text-gray-400">“With just 5,000 subscribers,</span>
              <span>Spencer now generates $350K per month"</span>
            </h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {/* Profile + Button row */}
          <div className="flex items-center justify-between w-full">
            {/* Profile */}
            <div className="flex items-center space-x-4">
              <img
                src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/680357673bf2451641c3e59e_49450176611_d46ff738a1.avif"
                alt="Neel Nafis"
                loading="lazy"
                className="object-cover w-20 h-20 rounded-full"
              />
              <div>
                <div className="text-lg font-semibold text-white">Neel Nafis</div>
                <p className="text-sm text-gray-400">Founder</p>
              </div>
            </div>

            {/* Button */}
            <a
              href="#book-a-call"
              className="flex items-center gap-2 bg-[#4355e4] hover:bg-[#273fb7] md:inline-flex hidden text-white font-semibold px-[25px] py-[14px] rounded-lg transition duration-300"
            >
              <div>Book a call</div>
              <img
                loading="lazy"
                src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67970745c860818130bc7fd6_Arrow_Up_Right.svg"
                alt="Arrow icon"
                className="w-[26px] h-[26px] bg-[#a8a9cf3b] rounded-full p-2"
              />
            </a>
          </div>
        </motion.div>

        {/* Stats and Video row */}
        <div className="flex flex-col items-center justify-between w-full gap-8 md:flex-row">
          {/* Stats */}
          <div className="flex space-x-12">
            <div className="flex flex-col items-start justify-between gap-6 font-serif">
              <div id="stat-holder" className="text-left">
                <h3 className="text-4xl font-extrabold text-white">250%</h3>
                <p className="text-sm text-gray-400">Revenue Growth</p>
              </div>

              <div
                className="w-full max-w-[203px] h-[240px] max-h-[240px] rounded-[20px] border border-white/5 bg-[#764cff]"
                style={{ boxShadow: "0 2px 20px 3px rgba(39,63,183,0.57)" }}
              ></div>
            </div>

            <div className="flex flex-col justify-end items-start gap-6 max-w-[203px] w-full font-serif">
              <div className="text-left">
                <h3 className="text-4xl font-extrabold text-white">200%</h3>
                <p className="text-sm text-gray-400">Saved on Ads</p>
              </div>

              <div
                className="w-full h-[160px] max-h-[160px] rounded-[20px] border border-white/5 bg-[#7985df]"
                style={{ boxShadow: "0 2px 20px 3px rgba(39,63,183,0.57)" }}
              ></div>
            </div>
          </div>

          {/* Video */}
          <div className="w-full md:w-[48%] rounded-lg overflow-hidden shadow-lg">
            <VideoThumbnail
              thamnailURL="https://embed-ssl.wistia.com/deliveries/600d415624c94ae765a528510dbb66a6.webp?image_crop_resized=1920x1080"
              VideoURL="https://www.youtube.com/embed/eZ6VIjuWXA4?si=ZX8eHpnaCwWhljIL"
            ></VideoThumbnail>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseStudies;

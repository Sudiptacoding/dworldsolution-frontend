"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import SmartCount from "@/common/SmartCount/SmartCount";

export default function AnimatedParallaxSection() {
  const sectionRef = useRef(null);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftImageX = useTransform(scrollYProgress, [0, 1], [-200, -300]);
  const rightImageX = useTransform(scrollYProgress, [0, 1], [150, 250]);

  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0.2, 1]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.4], [0.2, 1]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);

  return (
    <div className="bg-black">
      <section ref={sectionRef} className="relative flex items-center justify-center hidden w-full py-8 overflow-hidden md:flex">
        <motion.div
          ref={ref}
          className="absolute left-[15%] lg:left-[23%] !top-[25%] -translate-y-1/2 flex flex-col gap-4 z-10"
          style={{ x: leftImageX }}
        >
          <motion.img
            src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/679f511ce23fb32e2b64a2a8_Group%201618874152.avif"
            alt=""
            className="w-48 object-cover !rotate-[8.7052deg]"
          />
          <motion.img
            src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/679f511c0910ed0099e93ae5_Group%201618874147.avif"
            alt=""
            className="w-48 object-cover !-rotate-[8.67804deg] top-[50px] left-[20px] lg:left-[34px]  absolute"
          />
        </motion.div>

        <motion.div
          ref={ref}
          className="absolute right-[11%] lg:right-[23%] !top-[25%] -translate-y-1/2 flex flex-col gap-4 z-10"
          style={{ x: rightImageX }}
        >
          <motion.img
            src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/679f511cc86e2a1d5d76f4cc_Group%201618874151.avif"
            alt=""
            className="w-48 object-cover !-rotate-[8.7052deg]"
          />
          <motion.img
            src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/679f690527d250b730d285eb_yt.avif"
            alt=""
            className="w-48 object-cover !rotate-[8.67804deg] top-[50px] left-[34px] absolute"
          />
        </motion.div>

        <div ref={ref} className="px-4 py-32 space-y-5 text-center bg-black ">
          <motion.h2
            style={{ opacity: opacity1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl lg:text-4xl/none font-bold font-syne text-white tracking-[2px] "
          >
            Tired of boring video content that
          </motion.h2>

          <motion.h2
            style={{ opacity: opacity2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-2xl lg:text-4xl/none font-bold font-syne text-white tracking-[2px] "
          >
            don’t stand out? It’s time to upgrade
          </motion.h2>

          <motion.h2
            style={{ opacity: opacity3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="text-2xl lg:text-4xl/none font-bold font-syne text-white tracking-[2px] "
          >
            the game with us!
          </motion.h2>
        </div>
      </section>

      <section className="flex flex-row flex-wrap  border-[#ffffff0f] items-center justify-center md:items-center lg:flex-row gap-6 md:gap-32 bg-black px-4 py-8  ">
        {/* Block 1 */}
        <div className="w-[120px] md:w-[192px] text-white flex flex-col items-center md:items-start relative">
          <div className="text-2xl font-bold text-center md:text-4xl font-geist md:text-left">
            <SmartCount end={200} duration={5} />
            <span className="ml-1 text-xl md:text-3xl">%</span>
          </div>
          <p className="text-white text-sm md:text-base mt-3 font-syne pl-[0px] md:pl-[48px] text-right md:text-left w-full">More Engagement</p>
          <p className="text-[#999999] hidden md:block text-left text-sm md:text-base mt-3 font-syne w-full">Viral Edits</p>
        </div>

        {/* Block 2 */}
        <div className="w-[120px] md:w-[192px] text-white flex flex-col items-center md:items-start relative">
          <div className="text-2xl font-bold text-center md:text-4xl font-geist md:text-left">
            <SmartCount end={5} duration={5} />
            <span className="ml-1 text-xl md:text-3xl">X</span>
          </div>
          <p className="text-white text-sm md:text-base mt-3 font-syne pl-[0px] md:pl-[48px] text-right md:text-left w-full">More Reach</p>
          <p className="text-[#999999] hidden md:block text-left text-sm md:text-base mt-3 font-syne w-full">Strategic Distribution</p>
        </div>

        {/* Block 3 */}
        <div className="w-[120px] md:w-[192px] text-white flex flex-col items-center md:items-start relative">
          <div className="text-2xl font-bold text-center md:text-4xl font-geist md:text-left">
            <SmartCount end={50} duration={5} />
            <span className="ml-1 text-xl md:text-3xl">%</span>
          </div>
          <p className="text-white text-sm md:text-base mt-3 font-syne pl-[0px] md:pl-[48px] text-right md:text-left w-full">More Leads</p>
          <p className="text-[#999999] hidden md:block text-left text-sm md:text-base mt-3 font-syne w-full">Automated Systems</p>
        </div>
      </section>

      <div className="border-[#ffffff0f] border-b-2 pt-4 max-w-4xl mx-auto"></div>

      <div className="px-4 pt-16 text-center text-white bg-black sm:px-6 lg:px-8">
        {/* Badge with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="inline-block text-sm font-semibold uppercase text-white tracking-[1px]  px-4 py-1 rounded-full mb-4"
        >
          Client Testimonials
        </motion.div>

        {/* Heading with animation */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-3xl sm:text-4xl md:text-4xl font-sans font-semibold leading-tight bg-gradient-to-r from-[#898e99] to-gray-400 bg-clip-text text-transparent"
        >
          Hear what they’re
        </motion.h2>

        {/* Optional subtitle with delay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-3xl sm:text-4xl tracking-[1px] md:text-4xl/none pt-2 font-sans font-semibold  text-white "
        >
          {/* Optional subtitle text */}
          Saying about us
        </motion.div>
      </div>
    </div>
  );
}

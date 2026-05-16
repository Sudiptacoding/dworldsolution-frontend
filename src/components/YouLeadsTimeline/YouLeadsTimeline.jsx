"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import TextSwitcher from "@/common/TextSwitcher/TextSwitcher";

import Lottie from "lottie-react";
import animationData from "../../data/step5-animation.json";

function YouLeadsTimeline() {
  const [activeStep, setActiveStep] = useState(1);
  const stepsRef = useRef([]);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const containerRef = useRef(null);

  // Step 1
  const step1Ref = useRef(null);
  const { scrollYProgress: step1Scroll } = useScroll({
    target: step1Ref,
    offset: ["start end", "end start"],
  });

  // Step 2
  const step2Ref = useRef(null);
  const { scrollYProgress: step2Scroll } = useScroll({
    target: step2Ref,
    offset: ["start end", "end start"],
  });
  // Step 3
  const step3Ref = useRef(null);
  const { scrollYProgress: step3Scroll } = useScroll({
    target: step3Ref,
    offset: ["start end", "end start"],
  });
  // Step 4
  const step4Ref = useRef(null);
  const { scrollYProgress: step4Scroll } = useScroll({
    target: step4Ref,
    offset: ["start end", "end start"],
  });

  const lineHeightMap = {
    1: "h-[100px]",
    2: "h-[250px]",
    3: "h-[400px]",
    4: "h-[550px]",
  };

  // Tag animations: Upward tags move outward
  const tag1X = useTransform(step1Scroll, [0, 0.5, 1], ["10%", "0%", "10%"]);
  const tag1Y = useTransform(step1Scroll, [0, 0.5, 1], ["10%", "0%", "10%"]);
  const tag2X = useTransform(step1Scroll, [0, 0.5, 1], ["-10%", "0%", "-10%"]);
  const tag2Y = useTransform(step1Scroll, [0, 0.5, 1], ["10%", "0%", "10%"]);

  // Step 2
  const tag3X = useTransform(step2Scroll, [0, 0.5, 1], ["40%", "45%", "40%"]);
  const tag3Y = useTransform(step2Scroll, [0, 1], ["-15%", "0%"]);

  // Step 3
  const tag4X = useTransform(step3Scroll, [0, 0.5, 1], ["30%", "30%", "30%"]);
  const tag4Y = useTransform(step3Scroll, [0, 0.5, 1], ["0%", "10%", "35%"]);
  const tag5X = useTransform(step3Scroll, [0, 0.5, 1], ["130%", "157%", "130%"]);
  const tag5Y = useTransform(step3Scroll, [0, 0.5, 1], ["17%", "11%", "17%"]);

  // Step 4
  const tag8X = useTransform(step4Scroll, [0, 0.5, 1], ["135%", "137%", "135%"]);
  const tag8Y = useTransform(step4Scroll, [0, 0.5, 1], ["-20%", "-95%", "-20%"]);
  const img1X = useTransform(step4Scroll, [0, 1], ["-100%", "40%"]);
  const img2X = useTransform(step4Scroll, [0, 1], ["0%", "160%"]);
  const img1Rotate = useTransform(step4Scroll, [0, 1], [0, 0]);
  const img2Rotate = useTransform(step4Scroll, [0, 1], [0, -12]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setActiveStep(idx + 1);
          }
        });
      },
      { threshold: 0.5 }
    );

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => {
      stepsRef.current.forEach((step) => {
        if (step) observer.unobserve(step);
      });
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <>
       <div className="relative z-10 max-w-3xl pb-20 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-sm font-semibold tracking-widest text-gray-300 uppercase font-syne"
            >
              OUR PROCESS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl font-syne md:text-4xl pt-2 font-bold bg-gradient-to-r from-[#898e99] to-gray-400 bg-clip-text text-transparent"
            >
              Our Strategy To Get
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-2 text-3xl font-semibold text-white font-syne"
            >
              You Leads With Content
            </motion.p>
          </div>

      <div className="relative w-full max-w-5xl mx-auto ">
        {/* Timeline Line */}
        <div className="hidden lg:block absolute left-1/2 top-0 h-full w-[1px] bg-white/5 z-0">
          <div className={`inner-blue-line transition-all duration-700 ease-in-out ${lineHeightMap[activeStep]}`}></div>
        </div>

        {/* STEP-1 */}

        <div
          ref={(el) => (stepsRef.current[0] = el)}
          className="relative z-10 flex flex-col items-start justify-between gap-6 mb-24 text-white lg:flex-row"
        >
          <div
            className="order-1 lg:order-2 flex justify-center items-center w-[80px] h-[80px] lg:h-[70px] rounded-full
         border border-[#2c3138] bg-gradient-to-b from-[#181929] to-[#020205]
         text-white text-[18px] shadow-[0_0_45.1px_rgba(86,86,229,0.3)] mx-auto"
          >
            01
          </div>
          <div className="order-2 w-full text-center lg:order-1 lg:w-1/2 md:pr-10 lg:pl-10 lg:text-left">
            <div className="flex flex-col gap-[27px] rounded-[20px] py-[30px] w-full max-w-[350px] lg:items-start items-center mx-auto lg:mx-0">
              <div className="uppercase bg-[#3636ff] hidden lg:block rounded-[8.8px] px-[13px] py-[8px] text-[14.235px] leading-[1.55] text-white shadow-[0_4.433px_8.865px_rgba(0,0,0,0.12)]">
                Ideation
              </div>
              <h3 className="text-[20px] lg:text-[22px] font-semibold leading-[1.3] tracking-[-1.12px] capitalize m-0">Ideas into strategy</h3>
            </div>
            <p className="text-[#ffffff8a] max-w-[238px] font-normal leading-[1.47] mt-4 mx-auto lg:mx-0">
              We take your concepts and align them with market trends and audience needs.
            </p>
          </div>
          <div
            ref={step1Ref}
            className="order-3 lg:order-3 w-full lg:w-1/2 text-center lg:text-right flex flex-col items-center lg:items-end relative
               pb-[320px] lg:pb-0"
          >
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b5dd36b3452df31baf9345_Glow.avif"
              alt="Glow"
              className="absolute left-0 z-0 w-full opacity-100 -top-20 lg:left-0 md:left-0 xl:left-16"
            />
            <motion.img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b6c9a706e0b3217385d044_tag%204.avif"
              alt="Tag 1"
              className="md:w-[160px] w-24 absolute z-10 md:left-80 lg:left-64 left-48 top-20 rounded-full shadow-[0_9px_20px_-2px_#366cff91]"
              style={{ x: tag1X, y: tag1Y, rotate: 332 }}
            />
            <motion.img
              src="https://i.postimg.cc/vTWfyH03/Gemini-Generated-Image-8d0bef8d0bef8d0b.png"
              // src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b6c9a7b71a60f057a75d5a_tag%203.avif"
              alt="Tag 2"
              className="md:w-[140px] w-24  absolute lg:right-32 right-56 top-24 z-10 rounded-full shadow-[0_9px_20px_-2px_#366cff91]"
              style={{ x: tag2X, y: tag2Y, rotate: 21 }}
            />
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b6c9a7492d6fd645d90cf9_tag%202.avif"
              alt="Tag 3"
              className="md:w-[150px] w-24  absolute lg:-bottom-60 bottom-8 lg:left-32 left-8 z-10 rotate-[-18deg] rounded-full shadow-[0_9px_20px_-2px_#366cff91]"
            />
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b6c9a77447cd58110ed2b8_tag%201.avif"
              alt="Tag 4"
              className="md:w-[105px] w-24  absolute lg:-bottom-64 bottom-16 right-24 lg:right-8 z-10 rotate-[21deg] rounded-full shadow-[0_9px_20px_-2px_#366cff91]"
            />
          </div>
        </div>

        {/* STEP-2 */}

        <div
          ref={(el) => (stepsRef.current[1] = el)}
          className="relative z-10 flex flex-col items-start justify-between gap-6 text-white lg:flex-row mb-44"
        >
          <div
            className="order-1 lg:order-2 flex justify-center items-center w-[80px] h-[80px] lg:h-[70px] rounded-full
     border border-[#2c3138] bg-gradient-to-b from-[#181929] to-[#020205]
     text-white text-[18px] shadow-[0_0_45.1px_rgba(86,86,229,0.3)] mx-auto"
          >
            02
          </div>
          <div
            ref={step2Ref}
            className="order-2 lg:order-1 w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start relative pb-[320px] lg:pb-0"
          >
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b5dd36b3452df31baf9345_Glow.avif"
              alt="Glow"
              className="absolute left-0 z-0 w-full opacity-100 -top-20 lg:left-16"
            />
            <div className="absolute z-30 lg:top-[23%] top-1 lg:left-[-7%] left-[21%] w-[230px]">
              <div className="relative ">
                <motion.img
                  src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b6daa5744c735ff068b073_input%20box.png"
                  alt="Input Box"
                  className="absolute inset-0 object-fill w-full h-24"
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="absolute z-10 flex items-center justify-center w-full gap-2 top-5 -left-0">
                  <img
                    src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b6a0fc18b1b753b873e667_tag.svg"
                    alt="Tag Icon"
                    className="w-[50px]"
                  />
                  <div className="flex items-center gap-24 h-[50px]">
                    <TextSwitcher />
                    <div className="bg-white w-[1px] h-[50px]"></div>
                  </div>
                </div>
              </div>
            </div>
            <motion.img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b6e7100cf992b2952b2345_link%20bar.avif"
              alt="Tag 2"
              className="absolute z-10 hidden h-40 w-80 md:block "
              style={{ x: tag3X, y: tag3Y, rotate: 0 }}
            />
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b5dd3525079b2a2e62ac95_card%201.avif"
              alt="Tag 3"
              className="lg:w-[350px] w-full lg:mx-auto absolute  z-10 top-28 lg:left-8 lg:p-0 p-10 shadow-[0_9px_20px_-2px_#00000]"
            />
          </div>
          <div className="order-3 w-full text-center lg:order-3 lg:w-1/2 lg:pl-10 lg:text-right">
            <div className="flex flex-col gap-[27px] rounded-[20px] md:py-[30px] pt-32 w-full max-w-[350px] md:items-start items-center lg:items-end mx-auto lg:ml-auto">
              <div className="uppercase bg-[#3636ff] hidden lg:block rounded-[8.8px] px-[13px] py-[8px] text-[14.235px] leading-[1.55] text-white shadow-[0_4.433px_8.865px_rgba(0,0,0,0.12)]">
                Ideation
              </div>
              <h3 className="text-[20px] lg:text-[22px] font-semibold leading-[1.3] tracking-[-1.12px] capitalize m-0">Proven frameworks</h3>
              <p className="text-[#ffffff8a] max-w-[238px] font-normal leading-[1.47] mt-4">
                Scripts and structures trusted by leading brands in real estate, finance, and commercial industries.
              </p>
            </div>
          </div>
        </div>

        {/* STEP-3  */}

        <div
          ref={(el) => (stepsRef.current[2] = el)}
          className="relative z-10 flex flex-col items-start justify-between gap-6 mb-48 text-white lg:flex-row"
        >
          <div
            className="order-1 lg:order-2 flex justify-center items-center w-[80px] h-[80px] lg:h-[70px] rounded-full
         border border-[#2c3138] bg-gradient-to-b from-[#181929] to-[#020205]
         text-white text-[18px] shadow-[0_0_45.1px_rgba(86,86,229,0.3)] mx-auto"
          >
            03
          </div>
          <div className="order-2 w-full text-center lg:order-1 lg:w-1/2 lg:pr-10 lg:text-left">
            <div className="flex flex-col gap-[27px] rounded-[20px] py-[30px] w-full max-w-[350px] lg:items-start items-center mx-auto lg:mx-0">
              <div className="uppercase bg-[#3636ff] hidden lg:block rounded-[8.8px] px-[13px] py-[8px] text-[14.235px] leading-[1.55] text-white shadow-[0_4.433px_8.865px_rgba(0,0,0,0.12)]">
                Ideation
              </div>
              <h3 className="text-[20px] lg:text-[22px] font-semibold leading-[1.3] tracking-[-1.12px] capitalize m-0">Professional video content</h3>
            </div>
            <p className="text-[#ffffff8a] max-w-[238px] font-normal leading-[1.47] mt-4 mx-auto lg:mx-0">
              Polished editing and branded visuals that make your message clear and persuasive.
            </p>
          </div>
          <div
            ref={step3Ref}
            className="order-3 lg:order-3 w-full lg:w-1/2 text-center lg:text-right flex flex-col items-center lg:items-end relative
               pb-[320px] lg:pb-0"
          >
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b5dd36b3452df31baf9345_Glow.avif"
              alt="Glow"
              className="absolute left-0 z-0 w-full opacity-100 -top-20 lg:left-0 md:left-0 xl:left-16"
            />
            <motion.img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b5dd368a7f0840c7932011_icon%201.avif"
              alt="Tag 1"
              className="w-[170px] absolute z-10 lg:left-44 left-20 top-0 lg:-top-12 rounded-full "
              style={{ x: tag4X, y: tag4Y, rotate: 0 }}
            />
            <motion.img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b5dd36ed14bc9ea8341c97_icon%202.avif"
              alt="Tag 2"
              className="w-[110px] absolute md:right-32 lg:right-40 right-11 lg:block hidden top-32 lg:top-20 z-10 rounded-full "
              style={{ x: tag5X, y: tag5Y, rotate: 17 }}
            />
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b73326861ecd43aa1089d3_tag%203.avif"
              alt="Tag 3"
              className="w-[49px] absolute lg:-bottom-60 bottom-8 lg:left-32 left-20 z-10 rotate-[-360deg] rounded-full shadow-[0_9px_20px_-2px_#366cff91]"
            />
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b5dd354eb81fe4d982b5df_video%20editing%20canvas.avif"
              alt="Tag 4"
              className="w-[428px] absolute lg:-bottom-96 bottom-16 right-24 lg:-right-16 z-10 hidden xl:block "
            />
          </div>
        </div>

        {/* STEP-4  */}

        <div
          ref={(el) => (stepsRef.current[3] = el)}
          className="relative z-10 flex flex-col items-start justify-between gap-6 mb-16 text-white lg:flex-row"
        >
          <div
            className="order-1 lg:order-2 flex justify-center items-center w-[80px] h-[80px] lg:h-[70px] rounded-full
    border border-[#2c3138] bg-gradient-to-b from-[#181929] to-[#020205]
    text-white text-[18px] shadow-[0_0_45.1px_rgba(86,86,229,0.3)] mx-auto"
          >
            04
          </div>

          <div
            ref={step4Ref}
            className="relative flex flex-col items-center order-2 w-full text-center lg:order-1 lg:w-1/2 lg:text-left lg:items-start "
          >
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b5dd36b3452df31baf9345_Glow.avif"
              alt="Glow"
              className="absolute left-0 z-0 w-full opacity-100 -top-44 lg:left-8"
            />

            <div ref={containerRef} className="relative w-full h-[300px] lg:h-[400px] overflow-hidden rounded-xl ">
              <motion.img
                src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67debd0be7a053c01e6bb522_Iman%20gadzhi.avif"
                alt="Iman"
                className="absolute top-0 left-0 object-cover w-[445px] h-60 z-10"
                style={{ x: img1X, rotate: img1Rotate }}
              />

              <motion.img
                src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67debd0bb9bcdeb6007467cb_Ali%20abdaal%202.avif"
                alt="Ali"
                className="absolute top-0 left-0 w-[445px] h-60 object-cover z-20"
                style={{ x: img2X, rotate: img2Rotate }}
              />

              <div className="absolute top-0 left-0 z-30 w-1/3 h-full rounded-md pointer-events-none bg-gradient-to-l from-transparent to-black/80" />

              <div className="absolute top-0 right-0 z-30 w-1/3 h-full rounded-md pointer-events-none bg-gradient-to-r from-transparent to-black/80" />

              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-l from-black/60 via-transparent to-black/60" />
            </div>

            <motion.img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b707fc23c7175ae432a4ca_Thumbnail%20icon.avif"
              alt="Thumbnail"
              className="absolute z-10 hidden w-32 h-32 lg:block"
              style={{ x: tag8X, y: tag8Y, rotate: 12 }}
            />
          </div>

          <div className="order-3 w-full text-center lg:order-3 lg:w-1/2 lg:text-right">
            <div className="flex flex-col gap-[27px] rounded-[20px] py-[30px] w-full max-w-[350px] md:items-start items-center lg:items-end mx-auto lg:ml-auto">
              <div className="uppercase bg-[#3636ff] hidden lg:block rounded-[8.8px] px-[13px] py-[8px] text-[14.235px] leading-[1.55] text-white shadow-[0_4.433px_8.865px_rgba(0,0,0,0.12)]">
                Ideation
              </div>
              <h3 className="text-[20px] lg:text-[22px] font-semibold leading-[1.3] tracking-[-1.12px] capitalize m-0">High-converting thumbnails</h3>
              <p className="text-[#ffffff8a] max-w-[238px] font-normal leading-[1.47] mt-4">
                Designed to capture attention and drive results in your niche.
              </p>
            </div>
          </div>


        </div>

        {/* STEP-5  */}

        <div ref={ref} className="relative z-10 flex flex-col items-start justify-between gap-6 mb-24 text-white lg:flex-row">
          <div
            className="order-1 lg:order-2 flex justify-center items-center w-[80px] h-[80px] lg:h-[70px] rounded-full
      border border-[#2c3138] bg-gradient-to-b from-[#181929] to-[#020205]
      text-white text-[18px] shadow-[0_0_45.1px_rgba(86,86,229,0.3)] mx-auto"
          >
            05
          </div>

          <div className="order-2 lg:order-3 w-full lg:w-1/2 text-center lg:text-right flex flex-col items-center lg:items-end relative pb-[320px] lg:pb-0">
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b5dd36b3452df31baf9345_Glow.avif"
              alt="Glow"
              className="absolute left-0 z-0 w-full opacity-100 -top-20 lg:left-0"
            />

            {inView && (
              <div className="absolute z-0 w-40 h-32 pointer-events-none bottom-10 left-6 lg:-bottom-28 lg:left-24 rotate-12">
                <Lottie animationData={animationData} loop={false} />
              </div>
            )}

            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b6fea4de667cb6f255f2a2_view%20icon.avif"
              alt="Tag 3"
              className="w-[260px] lg:w-[321px] md:w-[400px] xl:w-[400px]  absolute lg:-bottom-64 md:-bottom-80 xl:-bottom-80 bottom-6 lg:left-32 left-4 z-10 rounded-full"
            />
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b6fddc63aa60dafdeff726_you%20tube%20icon-1.avif"
              alt="Tag 4"
              className="w-[70px] lg:w-[90px] absolute lg:-bottom-[254px] bottom-10 right-24 lg:right-52 rounded-full shadow-[0_9px_20px_-2px_#366cff91]"
            />
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b731d891c16c44b9310086_Group%201618874258.avif"
              alt="Tag 4"
              className="w-[90px] lg:w-[120px] absolute hidden lg:block lg:bottom-[-16px] lg:right-48 rounded-full"
            />
            <img
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b6fe2b0c2c7cfd9f95e99a_you%20tube%20icon.avif"
              alt="Tag 4"
              className="w-[100px] lg:w-[150px] absolute bottom-36 lg:-bottom-20 right-28 lg:-right-24 rounded-full block lg:hidden xl:block"
            />
          </div>

          <div className="order-3 w-full text-center lg:order-1 lg:w-1/2 lg:pr-10 lg:text-left">
            <div className="flex flex-col gap-[27px] rounded-[20px] py-[30px] w-full max-w-[350px] items-center lg:items-start items-center mx-auto lg:mx-0">
              <div className="uppercase bg-[#3636ff] hidden lg:block rounded-[8.8px] px-[13px] py-[8px] text-[14.235px] leading-[1.55] text-white shadow-[0_4.433px_8.865px_rgba(0,0,0,0.12)]">
                Ideation
              </div>
              <h3 className="text-[20px] lg:text-[22px] font-semibold leading-[1.3] tracking-[-1.12px] capitalize m-0">From content to clients</h3>
            </div>
            <p className="text-[#ffffff8a] max-w-[238px] font-normal leading-[1.47] mt-4 mx-auto lg:mx-0">
              Post your video and start generating leads that grow your business.
            </p>
          </div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="">
        <div className="flex items-center justify-center w-full py-0 md:py-10">
          <a
            href="#book-a-call"
            className="inline-flex items-center gap-2 bg-[#4355e4] hover:bg-[#273fb7] text-white font-semibold px-[25px] py-[14px] rounded-lg transition duration-300 hover:opacity-90
               hover:[box-shadow:inset_0_0_0_2px_rgba(255,255,255,0.08),inset_0_0_10px_rgba(255,255,255,0.06)] "
          >
            <div>Book a 30-min call</div>
            <img
              loading="lazy"
              src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67970745c860818130bc7fd6_Arrow_Up_Right.svg"
              alt="Arrow icon"
              className="w-[26px] h-[26px] bg-[#a8a9cf3b] rounded-full p-2"
            />
          </a>
        </div>
      </motion.div>
    </>

  );
}

export default YouLeadsTimeline;

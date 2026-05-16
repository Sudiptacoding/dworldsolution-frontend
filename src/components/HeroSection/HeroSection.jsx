// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import VideoThumbnail from "../VideoThumbnail/VideoThumbnail";
// import TiltController from "../TiltController/TiltController";
// import useHeaderVideo from "@/hook/useHeaderVideo";

// export default function HeroSection() {
//   const { isPending, error, headerVideo, refetch } = useHeaderVideo();
//   console.log(headerVideo);
//   const defaultVideo = {
//     thumbnail: "https://embed-ssl.wistia.com/deliveries/d70c018134211b2cef054003cd784398.webp?image_crop_resized=1920x1080",
//     src: "https://www.youtube.com/embed/xVqZ6ZSeMW4?si=C0jmHz5yMCQE15kE",
//   };

//   const videoToRender = headerVideo && headerVideo?.src ? headerVideo : defaultVideo;
//   return (
//     <section
//       className="relative flex items-center justify-center w-full min-h-screen px-4 bg-top bg-cover pt-28 pb-14 md:pt-40"
//       style={{
//         backgroundImage: "url('https://cdn.prod.website-files.com/6796419e2d5f03877896246e/679651def5e214bba9495e68_Hero%20Glow%20BG-p-2000.webp')",
//       }}
//     >
//       {/* Glass effect overlay */}
//       <div className="absolute inset-0 z-0 rounded-lg bg-white/10 backdrop-blur-lg" />

//       <div className="max-w-7xl mx-auto w-full text-center text-[#a8aeb6] relative z-10">
//         {/* Header Text */}
//         <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
//           <h1 className="text-4xl font-bold leading-tight md:text-6xl font-geist">
//             <span className=" font-syne">
//               <span className="text-white/[#8b8e97]">
//                 Get More Leads <br />
//                 Using{" "}
//               </span>
//             </span>
//             <span className="text-white font-syne"> Quality Video Content</span>
//           </h1>
//         </motion.div>

//         {/* Subtitle */}
//         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-2">
//           <p className="text-lg  text-white/[#8b8e97] max-w-2xl mx-auto">
//             We help entrepreneurs and businesses with Done-For-You organic content systems that generate leads on autopilot.
//           </p>
//         </motion.div>

//         {/* Team Images */}
//         <div className="flex flex-col items-center justify-center pb-10 md:flex-row">
//           {/* Images stacked with overlap */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="relative w-[170px] h-20 flex items-center"
//           >
//             {teamImages.map((src, i) => (
//               <div
//                 key={i}
//                 className="absolute overflow-hidden border-2 border-white rounded-full shadow-lg"
//                 style={{ left: `${i * 28}px`, zIndex: teamImages.length - i }} // overlap with offset and zIndex for stacking order
//               >
//                 <Image src={src} alt="Client Photo" width={64} height={64} className="object-cover rounded-full w-11 h-11" loading="lazy" />
//               </div>
//             ))}
//           </motion.div>

//           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="">
//             {/* Text Content */}
//             <div className="max-w-xl text-left text-white/90">
//               <p className="text-sm">Loved by 500+ Businesses worldwide.</p>
//               <p className="mt-1 text-sm text-[#8b8e97]">Our Clients Speak for Us</p>
//             </div>
//           </motion.div>
//         </div>

//         {/* Button */}
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
//           <Link
//             href="#book-a-call"
//             className="inline-flex items-center gap-2 px-6 py-3  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white bg-[#273fb7] p-[14px] rounded-lg font-semibold  transition text-sm text-white hover:opacity-85 hover:[box-shadow:inset_0_0_0_5px_#0003]focus:ring-offset-2 "
//           >
//             Book a Call
//             <Image
//               className="bg-[#a8a9cf3b] w-6 h-6 p-2 rounded-full"
//               src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67970745c860818130bc7fd6_Arrow_Up_Right.svg"
//               width={20}
//               height={20}
//               alt="Arrow Icon"
//             />
//           </Link>
//         </motion.div>

//         {/* VideoThumbnail with motion animation */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="max-w-4xl mx-auto"
//         >
//           <TiltController>
//             <VideoThumbnail thamnailURL={videoToRender?.thumbnail} VideoURL={videoToRender?.src} />
//           </TiltController>
//         </motion.div>
//       </div>

//       {/* {!headerVideo ? (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="max-w-4xl mx-auto mt-20"
//         >
//           <TiltController customClass="flex flex-col items-center justify-center w-full h-full text-white transition-transform duration-500 ease-out shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
//             <VideoThumbnail
//               thamnailURL={videoToRender?.thumbnail}
//               // VideoURL={"https://malloy-files-c0ddahgefecthmcs.z03.azurefd.net/web/framer_videos/Portfolio%20Showcase%202200x1000%20v2.mp4"}
//               VideoURL={videoToRender?.src}
//             />
//           </TiltController>
//         </motion.div>
//       ) : (
//         <TiltController customClass="">
//           {" "}
//           <div className="">
//             <div className="relative w-full max-w-4xl mx-auto overflow-hidden transition duration-500 transform rounded-lg cursor-pointer hover:scale-105 ">
//               <video
//                 src="https://malloy-files-c0ddahgefecthmcs.z03.azurefd.net/web/framer_videos/Portfolio%20Showcase%202200x1000%20v2.mp4"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="object-contain w-full h-auto shadow-2xl rounded-2xl bg-black/5"
//               >
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           </div>
//         </TiltController>
//       )} */}

//       {/* Optional dark overlay */}
//       <div className="absolute inset-0 z-0 bg-black/30" />
//     </section>
//   );
// }

// const teamImages = [
//   "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/68039aedeb4bf0f0e7b3ab65_0x0.webp",
//   "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/68039af1ab8b6374769d4021_channels4_profile%20(1).jpg",
//   "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6796419e2d5f0387789624ae_Client%20Photo%201.webp",
//   "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/68039af8dc4ee14f99625623_channels4_profile%20(3).avif",
//   "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/68039af40f8de0d527df7ffd_channels4_profile%20(2).avif",
// ];

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import VideoThumbnail from "../VideoThumbnail/VideoThumbnail";
import TiltController from "../TiltController/TiltController";
import useHeaderVideo from "@/hook/useHeaderVideo";
import { useState } from "react";

const clientImages = [
  "https://framerusercontent.com/images/58IbyFPDZt1MzyLggmMD3PrJsQ.png",
  "https://framerusercontent.com/images/3ljYEqohtI2b06DjjDXdGayh0jU.jpg",
  "https://framerusercontent.com/images/f1DS8SjePPfrm8I7S7Aw6vU8tPs.png",
  "https://framerusercontent.com/images/eypxGLbLsyxFpirkXlVe32e04Z8.png",
];

export default function HeroSection() {
  const { isPending, error, headerVideo, refetch } = useHeaderVideo();
  const [hovered, setHovered] = useState(false);

  const defaultVideo = {
    thumbnail:
      "https://embed-ssl.wistia.com/deliveries/d70c018134211b2cef054003cd784398.webp?image_crop_resized=1920x1080",
    src: "https://www.youtube.com/embed/xVqZ6ZSeMW4?si=C0jmHz5yMCQE15kE",
  };

  const videoToRender =
    headerVideo && headerVideo?.src ? headerVideo : defaultVideo;

  return (

       <section className="relative flex flex-col items-center justify-start w-full min-h-screen px-4 overflow-hidden bg-black pt-28 pb-14 md:pt-40">
        <div className="max-w-7xl mx-auto w-full text-center text-[#a8aeb6] relative z-10">
          {/* ===== Text Area (with background circles) ===== */}
          <div className="relative flex flex-col items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div
                className="absolute lg:w-[850px] lg:h-[850px] w-[400px] h-[400px] rounded-full border-l border-r border-white/20
               opacity-0 animate-circle-1">
              </div>
              <div
                className="absolute lg:w-[1080px] lg:h-[1080px] w-[600px] h-[600px] rounded-full border-l border-r border-white/20
               opacity-0 animate-circle-2">
              </div>
              <div
                className="absolute lg:w-[1300px] lg:h-[1300px] w-[800px] h-[800px] rounded-full border-l border-r border-white/20
               opacity-0 animate-circle-3">
              </div>
            </div>
            {/* Header Text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-[60rem] mx-auto mb-1 text-center"
            >
              <h1 className="text-3xl font-semibold text-gray-200 sm:text-4xl lg:text-6xl ">
               Get More Leads Through Thoughtfully Planned Video And Social Media Content
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl mx-auto text-center"
            >
              <p className="mt-4 text-lg text-gray-600">
                Launch a client-winning editing portfolio website in &lt; 5 minutes
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div
                className="relative flex justify-center h-20 mt-6 cursor-pointer w-72"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {clientImages.map((src, index) => {
                  const hoverOffset = hovered
                    ? (index - (clientImages.length - 1) / 2) * 10
                    : 0;
                  const zIndex = clientImages.length - index; // top image above
                  const initialOffset = index * 40; // slight initial X offset for visibility
                  return (
                    <motion.img
                      key={index}
                      src={src}
                      alt={`Client ${index + 1}`}
                      className="absolute object-cover w-16 h-16 border-2 border-white rounded-full shadow-md"
                      style={{
                        left: `calc(35% + ${initialOffset}px)`,
                        zIndex,
                      }}
                      animate={{
                        left: hovered
                          ? `calc(17% + ${initialOffset + hoverOffset}px)`
                          : `calc(17% + ${initialOffset}px)`,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  );
                })}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl mx-auto text-center"
            >
              <p className="mt-2 text-sm text-gray-500">
                Used by 10,000+ editors worldwide.
              </p>
            </motion.div>
            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="mt-6">
                <Link href="#book-a-call"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gray-900 rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
                    className="w-5 h-5 fill-white">
                    <path d="M219.71,117.38a12,12,0,0,0-7.25-8.52L161.28,88.39l10.59-70.61a12,12,0,0,0-20.64-10l-112,120a12,12,0,0,0,4.31,19.33l51.18,20.47L84.13,238.22a12,12,0,0,0,20.64,10l112-120A12,12,0,0,0,219.71,117.38ZM113.6,203.55l6.27-41.77a12,12,0,0,0-7.41-12.92L68.74,131.37,142.4,52.45l-6.27,41.77a12,12,0,0,0,7.41,12.92l43.72,17.49Z"></path>
                  </svg>
                  Sign in with Google
                </Link>
              </div>
            </motion.div>
          </div>

          {
            !headerVideo ?      <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto mt-20"
          >
            <TiltController customClass="flex flex-col items-center justify-center w-full h-full text-white transition-transform duration-500 ease-out shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <VideoThumbnail
                thamnailURL={videoToRender?.thumbnail}
                // VideoURL={"https://malloy-files-c0ddahgefecthmcs.z03.azurefd.net/web/framer_videos/Portfolio%20Showcase%202200x1000%20v2.mp4"}
                VideoURL={videoToRender?.src}
              />
            </TiltController>
          </motion.div> :     <TiltController customClass="">  <div className="">
            <div className="relative w-full max-w-4xl mx-auto overflow-hidden transition duration-500 transform rounded-lg cursor-pointer hover:scale-105 ">

              <video
                src="https://malloy-files-c0ddahgefecthmcs.z03.azurefd.net/web/framer_videos/Portfolio%20Showcase%202200x1000%20v2.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="object-contain w-full h-auto shadow-2xl rounded-2xl bg-black/5"
              >
                Your browser does not support the video tag.
              </video>

            </div>
          </div></TiltController>
          }

        </div>
      </section>

  );
}

const teamImages = [
  "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/68039aedeb4bf0f0e7b3ab65_0x0.webp",
  "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/68039af1ab8b6374769d4021_channels4_profile%20(1).jpg",
  "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6796419e2d5f0387789624ae_Client%20Photo%201.webp",
  "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/68039af8dc4ee14f99625623_channels4_profile%20(3).avif",
  "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/68039af40f8de0d527df7ffd_channels4_profile%20(2).avif",
];

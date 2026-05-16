// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCircleChevronDown } from "react-icons/fa6";

// const faqs = [
//   {
//     question: "Tell me about your agency?",
//     answer:
//       "At MZ Media, we help coaches and trainers build their personal brand through high quality video editing and social media marketing.",
//   },
//   {
//     question: "Tell me about your content plan?",
//     answer:
//       "We analyze your existing content, identify your niche and offer a comprehensive content plan catering to your personal brand.",
//   },
//   {
//     question: "What services will you provide?",
//     answer:
//       "We offer video editing (YouTube, Shorts, Reels), promotional content, and social media marketing with proven ROI strategies.",
//   },
//   {
//     question: "What if I don’t get the results?",
//     answer:
//       "We’ve helped scale dozens of brands using our proven content frameworks—it’s very unlikely it won’t work for you too. 😉",
//   },
//   {
//     question: "Why wouldn’t I hire a freelancer?",
//     answer:
//       "We have a dedicated team of 30+ editors. Our quality and consistency always outperform individual freelancers.",
//   },

// ];

// function AnyQueries() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="relative z-10 w-full max-w-[1000px] mx-auto px-4 py-20 md:py-24 lg:py-32">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//         className="mb-12 text-center"
//       >
//         <div className="inline-block px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-full">
//           Any queries you have
//         </div>
//         <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
//           <span className="text-gray-400">Questions you may </span>Ask
//         </h2>
//       </motion.div>

//       {/* 🟡 Change from grid to flex-wrap to avoid column shifting */}
//       <div className="flex flex-wrap gap-6">
//         {faqs.map((faq, index) => {
//           const isOpen = openIndex === index;
//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1, duration: 0.5 }}
//               viewport={{ once: true }}
//               className="bg-gradient-to-br from-[#1f1f1f] to-black border border-gray-700 rounded-xl p-5 w-full md:w-[48%] flex flex-col"
//             >
//               <button
//                 onClick={() => toggleFAQ(index)}
//                 className="flex items-center justify-between w-full text-left text-white"
//               >
//                 <span className="font-normal font-syne text-[18px]">{faq.question}</span>
//                 <FaCircleChevronDown
//                   className={`w-5 h-5 transform transition-transform duration-300 ${
//                     isOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               <AnimatePresence initial={false}>
//                 {isOpen && (
//                   <motion.div
//                     key="answer"
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="overflow-hidden text-base text-gray-300 font-syne"
//                   >
//                     <div className="py-2">{faq.answer}</div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// export default AnyQueries;




"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCircleChevronDown } from "react-icons/fa6";

const faqs = [
  {
    question: "Tell me about your agency.",
    answer:
      "Lumenza helps creators, brands, and coaches grow with proven video strategies—delivering content that’s engaging, professional, and designed to convert audiences.",
  },
  {
    question: "Tell me about your content plan.",
    answer:
      "We craft tailored content strategies using proven frameworks, storytelling, and market insights to help creators, brands, and coaches consistently stand out.",
  },
  {
    question: "What services will you provide?",
    answer:
      "We provide video editing, motion graphics, scripts, thumbnails, and distribution strategies—everything creators, brands, and coaches need to grow effectively.",
  },
  {
    question: " Why wouldn’t I hire a freelancer?",
    answer:
      "Freelancers may lack consistency and systems. With Lumenza, creators, brands, and coaches get structured execution, rapid delivery, and growth-focused strategies every time.",
  },
 
];

function AnyQueries() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative z-10 w-full bg-top bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('https://cdn.prod.website-files.com/6796419e2d5f03877896246e/679651def5e214bba9495e68_Hero%20Glow%20BG-p-2000.webp')",
      }}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-4 py-20 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-block px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-full">
            Any queries you have
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            <span className="text-gray-400">Questions you may </span>Ask
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="flex flex-wrap gap-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#1f1f1f] to-black border border-gray-700 rounded-xl p-5 w-full md:w-[48%] flex flex-col"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full text-left text-white"
                >
                  <span className="font-normal font-syne text-[18px]">
                    {faq.question}
                  </span>
                  <FaCircleChevronDown
                    className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-base text-gray-300 font-syne"
                    >
                      <div className="py-2">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AnyQueries;

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
      "Dworldsolution supports business owners, creators, entrepreneurs, and personal brands in building a strong, credible presence through high-quality video editing and strategic social media marketing.",
  },
  {
    question: "What services will DworldSolutions provide?",
    answer:
      "Video editing services include YouTube videos, Shorts, Instagram Reels, TikTok, Facebook Reels, and promotional content. Social media marketing focuses on creating engaging content and managing campaigns to support audience growth and conversions",
  },
  {
    question: "If raw footage isn’t available, Will AI-generated content match my brand?",
    answer:
      "Yes. Content is guided by your brand style, messaging, and goals to ensure consistency in tone and presentation.",
  },
  {
    question: "What is your content plan?",
    answer:
      "A strategy-led content plan built around clear positioning, structured planning, and consistent execution, with AI-assisted workflows used where needed.",
  },

  {
    question: "How does your process work?",
    answer:
      "The process begins with understanding your goals, audience, and content needs, followed by a discovery call to align on direction. Content is then planned, created, and refined through structured workflows and feedback loops.",
  },
  {
    question: "Why choose your agency?",
    answer:
      "A structured approach, clear communication, and consistent execution, with content aligned to your goals. Each project begins with a focused brainstorming session to understand your business, supported by an experienced team that develops tailored content ideas.",
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

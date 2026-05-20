// "use client";

// import React, { useState } from "react";

// function WorkWithUs() {
//   const [enrollOpen, setEnrollOpen] = useState(true); // control form visibility
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     organization: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/enroll", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const result = await res.json();
//       if (res.ok) {
//         alert("Enrollment submitted successfully!");
//         setFormData({ name: "", email: "", phone: "", organization: "", message: "" });
//       } else {
//         alert(result.message || "Something went wrong.");
//       }
//     } catch (error) {
//       alert("Server error");
//     }
//   };

//   return (

//     <div className="relative w-full flex flex-col items-center justify-start overflow-hidden border border-neutral-800 rounded-2xl bg-[radial-gradient(circle_farthest-corner_at_50%_100%,#1f1f1f,#ffffff03_40%,transparent)]  max-w-[1000px] mx-auto ">
//       {/* Background */}
//       <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
//         <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#090909] via-[#090909e6] to-transparent"></div>
//         <div className="absolute w-48 h-48 rounded-full bg-[#ff00ff] opacity-90 blur-3xl z-0 transform translate-x-[-80px] translate-y-[-30px]" />
//         <img
//           src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/679651def5e214bba9495e68_Hero%20Glow%20BG.webp"
//           alt="Glow BG"
//           className="z-0 object-cover w-full h-full opacity-30"
//           loading="lazy"
//         />
//       </div>

//       {/* Container */}
//       <div className="relative z-20 w-full max-w-[1000px] mx-auto flex flex-col items-center justify-center gap-8 px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 lg:pt-20  pb-5 text-center">
//         <div className="flex flex-col items-center max-w-2xl gap-4 font-syne">
//           <div className="px-4 py-1 text-xs tracking-widest text-white uppercase bg-gray-800 rounded-full">
//             Work with us
//           </div>
//           <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
//             <span className="text-gray-400">Let’s level up<br /></span>
//             Your Business!
//           </h2>
//         </div>

//         {/* Form Section */}
//         <div className="w-full ">
//           {enrollOpen ? (
//             <form
//               onSubmit={handleSubmit}
//               className="grid grid-cols-1 gap-6 p-6 text-left text-white bg-black border border-gray-700 bg-opacity-20 rounded-xl md:grid-cols-2"
//             >
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="p-3 text-white bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="p-3 text-white bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   className="p-3 text-white bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="mb-1 text-sm">Organization / Company</label>
//                 <input
//                   type="text"
//                   name="organization"
//                   value={formData.organization}
//                   onChange={handleChange}
//                   className="p-3 text-white bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//               </div>
//               <div className="flex flex-col md:col-span-2">
//                 <label className="mb-1 text-sm">Message / Project Description</label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   rows={4}
//                   className="p-3 text-white bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 ></textarea>
//               </div>
//               <div className="text-right md:col-span-2">
//                 <button
//                   type="submit"
//                   className="px-6 py-3 font-medium text-black transition bg-white rounded-lg hover:bg-gray-200"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="h-[400px] font-syne flex items-center justify-center text-white text-lg bg-black bg-opacity-20 border border-gray-700 rounded-xl">
//               <p>Enrollment is currently closed.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>

//   );
// }

// export default WorkWithUs;

"use client";
import React from "react";
import { motion } from "framer-motion";

import axios from "axios";
import Swal from "sweetalert2";

export default function WorkWithUs() {
  // form submit handler with axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await axios.post("https://dworldsolution-backend.vercel.app/contact", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res) {
        Swal.fire({
          title: "Good job!",
          text: "✅ Form submitted successfully!",
          icon: "success",
        });
        e.target.reset();
      } else {
        toast.error("");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "❌ Something went wrong!",
        });
      }
    } catch (error) {
      alert("❌ Server error!");
    }
  };

  return (
    <div className="pt-10 pb-0 ">
      {/* Heading Section */}
      <div className="relative z-10 max-w-3xl pb-16 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-sm font-semibold tracking-widest text-gray-300 uppercase font-syne"
        >
          WORK WITH US
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl font-syne md:text-4xl pt-2 font-bold bg-gradient-to-r from-[#898e99] to-gray-400 bg-clip-text text-transparent"
        >
          Let’s level up
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-2 text-3xl font-semibold text-white font-syne"
        >
          Your Business!
        </motion.p>
      </div>

      <section
        className="relative z-10 w-full bg-left-bottom bg-no-repeat bg-contain "
        style={{
          backgroundImage: "url('https://cdn.prod.website-files.com/6796419e2d5f03877896246e/67b5dd36b3452df31baf9345_Glow.avif')",
        }}
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-xl"></div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} // ✅ x থেকে y করা হলো
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6 md:col-span-1"
          >
            <div className="rounded-[31px] p-8 md:p-10 flex flex-col gap-6 text-white" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              <img
                src="https://panze.co/wp-content/uploads/2024/09/Frame.svg"
                alt="Contact Form of Panze UX Design Studio"
                className="w-full h-auto"
                loading="lazy"
              />

              <h4 className="text-lg font-semibold leading-tight md:text-xl">
                Meet Mahmudul, <span className="text-[#7EE0FF]">Brain Behind</span>
              </h4>

              <p className="text-sm leading-relaxed text-gray-200 md:text-base">
                Let’s discuss your unique design challenges. Schedule your complimentary consultation today and let’s find the best solutions
                together.
              </p>

              <div>
                <a
                  href="https://tidycal.com/panze/meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block px-6 py-3 text-sm font-medium text-white rounded-full transition-all duration-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7EE0FF]"
                  style={{
                    backgroundImage: "linear-gradient(80deg, #B03BFF, #408BFF)",
                  }}
                >
                  <span className="relative z-10">Schedule a Virtual Coffee</span>
                  <span className="absolute inset-[2px] rounded-full bg-[#050A26]"></span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} // ✅ x থেকে y করা হলো
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-2"
          >
            <div
              className="w-full p-6 rounded-2xl md:p-10"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              }}
            >
              <form className="space-y-6" aria-label="Contact form" onSubmit={handleSubmit}>
                {/* Name + Email */}
                <div className="flex flex-col gap-4 md:flex-row">
                  <input
                    name="client_name"
                    type="text"
                    placeholder="Type your name"
                    className="flex-1 px-8 py-4 rounded-full bg-[#050A26] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7EE0FF] transition-all"
                  />
                  <input
                    name="client_email"
                    type="email"
                    placeholder="Type contact email"
                    required
                    className="flex-1 px-8 py-4 rounded-full bg-[#050A26] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7EE0FF] transition-all"
                  />
                </div>

                {/* Service options */}
                <fieldset>
                  <legend className="mb-3 text-sm text-gray-300">Select Service</legend>
                  <div className="flex flex-wrap gap-6 md:gap-3">
                    {["Branding", "Mobile App", "Website", "Web App"].map((s) => (
                      <div key={s}>
                        <input type="radio" id={s} name="w_service" value={s} className="hidden peer" />
                        <label
                          htmlFor={s}
                          className="cursor-pointer px-6 py-3 rounded-full text-sm transition-all 
                     bg-[#1E233C] text-gray-200 hover:bg-[#2A3050]
                     peer-checked:bg-gradient-to-r peer-checked:from-[#7EE0FF]/30 peer-checked:to-[#8AE6C1]/30 
                     peer-checked:text-white peer-checked:ring-2 peer-checked:ring-[#7EE0FF]/50"
                        >
                          {s}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                {/* Budget options */}
                <fieldset>
                  <legend className="mb-3 text-sm text-gray-300">Estimated Budget</legend>
                  <div className="flex flex-wrap gap-6 md:gap-3">
                    {["Less than $1k", "$1k - $5k", "$5k - $10k", "More than $10k"].map((b) => (
                      <div key={b}>
                        <input type="radio" id={b} name="w_budget" value={b} className="hidden peer" />
                        <label
                          htmlFor={b}
                          className="cursor-pointer px-6 py-3 rounded-full text-sm transition-all 
                     bg-[#1E233C] text-gray-200 hover:bg-[#2A3050]
                     peer-checked:bg-gradient-to-r peer-checked:from-[#7EE0FF]/30 peer-checked:to-[#8AE6C1]/30 
                     peer-checked:text-white peer-checked:ring-2 peer-checked:ring-[#7EE0FF]/50"
                        >
                          {b}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                {/* Project details */}
                <textarea
                  name="project_desc"
                  rows={6}
                  maxLength={2000}
                  placeholder="Write your dream plan's brief here"
                  className="w-full px-8 py-4 rounded-2xl bg-[#050A26] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7EE0FF] transition-all"
                />

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#1f2937]/40 to-[#050a26]/60 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#7EE0FF] transition-all"
                >
                  Hit &amp; Make The Magic
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

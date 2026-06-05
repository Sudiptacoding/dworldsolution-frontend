// "use client";

// import React, { useState, useEffect } from "react";

// const WhatsAppChatWidget = ({
//   phoneNumber = "8801911081400",
//   adminName = "D World Solution",
//   welcomeMessage = "Hello! Welcome to D World Solution. 😊\n\nWe provide professional video editing, digital marketing, branding, and content creation services.\n\nHow can we help you today? Please type your message below to let us know.",
//   placeholderText = "Type your message...",
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [visitorMessage, setVisitorMessage] = useState("");
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);

//   // চ্যাট উইন্ডো ওপেন হলে একটু বাস্তবসম্মত টাইপিং ইফেক্ট দেখানোর জন্য
//   useEffect(() => {
//     if (isOpen) {
//       setIsTyping(true);
//       const timer = setTimeout(() => {
//         setIsTyping(false);
//         setShowWelcomeMessage(true);
//       }, 1200); // ১.২ সেকেন্ড টাইপিং ইন্ডিকেটর দেখাবে
//       return () => clearTimeout(timer);
//     } else {
//       // চ্যাট উইন্ডো বন্ধ হয়ে গেলে স্টেটগুলো রিসেট হয়ে যাবে
//       setShowWelcomeMessage(false);
//       setIsTyping(false);
//     }
//   }, [isOpen]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!visitorMessage.trim()) return;

//     // ভিজিটরের টাইপ করা মেসেজটি এনকোড করে হোয়াটসঅ্যাপ ইউআরএল তৈরি করা
//     const encodedMessage = encodeURIComponent(visitorMessage);
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

//     // নতুন ট্যাবে ভিজিটরের টাইপ করা মেসেজসহ হোয়াটসঅ্যাপ ওপেন হবে
//     window.open(whatsappUrl, "_blank", "noopener,noreferrer");
//     setVisitorMessage(""); // সেন্ড হওয়ার পর ইনপুট ফিল্ড খালি হয়ে যাবে
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
//       {/* চ্যাট উইন্ডো ইন্টারফেস */}
//       {isOpen && (
//         <div className="w-[340px] sm:w-[360px] h-[430px] bg-[#efeae2] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-4 transition-all duration-300 transform scale-100 origin-bottom-right">
//           {/* চ্যাট হেডার (WhatsApp Style) */}
//           <div className="bg-[#075e54] p-4 flex items-center justify-between text-white shadow-md">
//             <div className="flex items-center gap-3">
//               {/* প্রোফাইল আইকন (ডামি রাউন্ড লোগো বা নামের প্রথম অক্ষর) */}
//               <div className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg text-white select-none">
//                 {adminName.charAt(0)}
//                 {/* অ্যাক্টিভ অনলাইন ডট */}
//                 <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075e54]" />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-sm leading-tight">{adminName}</h4>
//                 <p className="text-xs text-emerald-200">Online</p>
//               </div>
//             </div>

//             {/* ক্লোজ বাটন */}
//             <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition duration-200" aria-label="Close Chat">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {/* চ্যাট বডি (যেখানে মেসেজগুলো থাকবে) */}
//           <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
//             {/* টাইপিং অ্যানিমেশন */}
//             {isTyping && (
//               <div className="self-start bg-white text-gray-500 text-xs px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5 max-w-[80%] border border-gray-100">
//                 <span className="text-gray-400">typing</span>
//                 <span className="flex gap-1 items-center">
//                   <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
//                   <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
//                   <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
//                 </span>
//               </div>
//             )}

//             {/* অটোমেটিক ওয়েলকাম মেসেজ বাবল */}
//             {showWelcomeMessage && (
//               <div className="self-start bg-white text-black text-sm px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] relative border border-gray-100">
//                 <p className="whitespace-pre-line leading-relaxed">{welcomeMessage}</p>
//                 <span className="text-[9px] text-gray-400 block text-right mt-1.5 select-none">
//                   {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* চ্যাট ফুটার (ইনপুট ফিল্ড ও সেন্ড বাটন) */}
//           <form onSubmit={handleSendMessage} className="p-3 bg-[#f0f2f5] border-t border-gray-200 flex items-center gap-2">
//             <input
//               type="text"
//               value={visitorMessage}
//               onChange={(e) => setVisitorMessage(e.target.value)}
//               placeholder={placeholderText}
//               className="flex-1 py-2.5 px-4 bg-white rounded-full text-black text-sm focus:outline-none border border-gray-200"
//             />
//             <button
//               type="submit"
//               disabled={!visitorMessage.trim()}
//               className="w-10 h-10 bg-[#075e54] hover:bg-[#128c7e] text-white rounded-full flex items-center justify-center transition duration-200 shrink-0 disabled:opacity-50"
//               aria-label="Send message"
//             >
//               {/* সেন্ড অ্যারো আইকন */}
//               <svg className="w-5 h-5 transform rotate-90 translate-x-[-1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//               </svg>
//             </button>
//           </form>
//         </div>
//       )}

//       {/* ফ্লোটিং হোয়াটসঅ্যাপ ট্রিগার বাটন */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
//         aria-label="Toggle WhatsApp Chat"
//       >
//         {isOpen ? (
//           // ক্লোজ আইকন (যখন চ্যাট উইন্ডোটি খোলা থাকবে)
//           <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         ) : (
//           // হোয়াটসঅ্যাপ আইকন
//           <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12.004 2c-5.51 0-9.993 4.483-9.993 9.993 0 1.763.457 3.483 1.324 5.006L2 22l5.122-1.343a9.92 9.92 0 0 0 4.882 1.278h.005c5.51 0 9.993-4.483 9.993-9.993C21.997 6.483 17.514 2 12.004 2zm0 1.65c4.6 0 8.343 3.743 8.343 8.343 0 4.6-3.743 8.343-8.343 8.343a8.27 8.27 0 0 1-4.223-1.155l-.303-.18-3.13.82.834-3.047-.197-.314a8.275 8.275 0 0 1-1.324-4.467c0-4.6 3.743-8.343 8.343-8.343zm-3.323 3.51c-.19 0-.41.053-.59.176-.326.223-.654.58-.654 1.18 0 1.134.782 2.378 1.83 3.426 1.047 1.048 2.292 1.83 3.426 1.83.6 0 .957-.328 1.18-.654.123-.18.176-.4.176-.59a.63.63 0 0 0-.083-.3l-.907-1.314a.635.635 0 0 0-.647-.282c-.224.062-.432.26-.642.47-.202.202-.38.38-.59.38-.204 0-.457-.107-.79-.317a5.53 5.53 0 0 1-1.334-1.15c-.413-.49-.66-.994-.746-1.15-.084-.153-.024-.28.05-.355.074-.075.166-.183.25-.264.082-.08.113-.153.16-.254.047-.1.024-.204-.012-.278l-.75-1.383a.62.62 0 0 0-.295-.316z" />
//           </svg>
//         )}
//       </button>
//     </div>
//   );
// };

// export default WhatsAppChatWidget;




"use client";

import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppChatWidget = ({
  phoneNumber = "8801911081400", 
  adminName = "D World Solution", 
  welcomeMessage = "Hello! Welcome to D World Solution. 😊\n\nWe provide professional video editing, digital marketing, branding, and content creation services.\n\nHow can we help you today? Please type your message below to let us know.", 
  placeholderText = "Type your message...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorMessage, setVisitorMessage] = useState("");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Simulated typing effect when the widget opens
  useEffect(() => {
    if (isOpen) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setShowWelcomeMessage(true);
      }, 1200); // 1.2 seconds typing delay
      return () => clearTimeout(timer);
    } else {
      setShowWelcomeMessage(false);
      setIsTyping(false);
    }
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!visitorMessage.trim()) return;

    // Encode visitor message for WhatsApp URL
    const encodedMessage = encodeURIComponent(visitorMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Opens WhatsApp in a new tab with the pre-filled message
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setVisitorMessage(""); // Clear input field after sending
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Chat Window Interface */}
      {isOpen && (
        <div className="w-[325px] sm:w-[325px] h-[430px] bg-[#efeae2] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-4 transition-all duration-300 transform scale-100 origin-bottom-right">
          
          {/* Chat Header */}
          <div className="bg-[#075e54] p-4 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-3">
              {/* Profile Icon / Logo Initials */}
              <div className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg text-white select-none">
                {adminName.charAt(0)}
                {/* Active Online Indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075e54]" />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">{adminName}</h4>
                <p className="text-xs text-emerald-200">Online</p>
              </div>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition duration-200"
              aria-label="Close Chat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="self-start bg-white text-gray-500 text-xs px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5 max-w-[80%] border border-gray-100">
                <span className="text-gray-400">typing</span>
                <span className="flex gap-1 items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            )}

            {/* Welcome Message Bubble */}
            {showWelcomeMessage && (
              <div className="self-start bg-white text-black text-sm px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] relative border border-gray-100">
                <p className="whitespace-pre-line leading-relaxed">{welcomeMessage}</p>
                <span className="text-[9px] text-gray-400 block text-right mt-1.5 select-none">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )}
            
          </div>

          {/* Chat Footer */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#f0f2f5] border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              value={visitorMessage}
              onChange={(e) => setVisitorMessage(e.target.value)}
              placeholder={placeholderText}
              className="flex-1 py-2.5 px-4 bg-white rounded-full text-black text-sm focus:outline-none border border-gray-200"
            />
            <button
              type="submit"
              disabled={!visitorMessage.trim()}
              className="w-10 h-10 bg-[#075e54] hover:bg-[#128c7e] text-white rounded-full flex items-center justify-center transition duration-200 shrink-0 disabled:opacity-50"
              aria-label="Send message"
            >
              <svg className="w-5 h-5 transform rotate-90 translate-x-[-1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Toggle WhatsApp Chat"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <FaWhatsapp className="w-8 h-8 text-white animate-pulse" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppChatWidget;
"use client";

import React, { useState, useEffect } from "react";

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

  // চ্যাট উইন্ডো ওপেন হলে একটু বাস্তবসম্মত টাইপিং ইফেক্ট দেখানোর জন্য
  useEffect(() => {
    if (isOpen) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setShowWelcomeMessage(true);
      }, 1200); // ১.২ সেকেন্ড টাইপিং ইন্ডিকেটর দেখাবে
      return () => clearTimeout(timer);
    } else {
      // চ্যাট উইন্ডো বন্ধ হয়ে গেলে স্টেটগুলো রিসেট হয়ে যাবে
      setShowWelcomeMessage(false);
      setIsTyping(false);
    }
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!visitorMessage.trim()) return;

    // ভিজিটরের টাইপ করা মেসেজটি এনকোড করে হোয়াটসঅ্যাপ ইউআরএল তৈরি করা
    const encodedMessage = encodeURIComponent(visitorMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // নতুন ট্যাবে ভিজিটরের টাইপ করা মেসেজসহ হোয়াটসঅ্যাপ ওপেন হবে
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setVisitorMessage(""); // সেন্ড হওয়ার পর ইনপুট ফিল্ড খালি হয়ে যাবে
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* চ্যাট উইন্ডো ইন্টারফেস */}
      {isOpen && (
        <div className="w-[340px] sm:w-[360px] h-[430px] bg-[#efeae2] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-4 transition-all duration-300 transform scale-100 origin-bottom-right">
          
          {/* চ্যাট হেডার (WhatsApp Style) */}
          <div className="bg-[#075e54] p-4 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-3">
              {/* প্রোফাইল আইকন (ডামি রাউন্ড লোগো বা নামের প্রথম অক্ষর) */}
              <div className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg text-white select-none">
                {adminName.charAt(0)}
                {/* অ্যাক্টিভ অনলাইন ডট */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075e54]" />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">{adminName}</h4>
                <p className="text-xs text-emerald-200">Online</p>
              </div>
            </div>
            
            {/* ক্লোজ বাটন */}
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

          {/* চ্যাট বডি (যেখানে মেসেজগুলো থাকবে) */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
            
            {/* টাইপিং অ্যানিমেশন */}
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

            {/* অটোমেটিক ওয়েলকাম মেসেজ বাবল */}
            {showWelcomeMessage && (
              <div className="self-start bg-white text-black text-sm px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] relative border border-gray-100">
                <p className="whitespace-pre-line leading-relaxed">{welcomeMessage}</p>
                <span className="text-[9px] text-gray-400 block text-right mt-1.5 select-none">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )}
            
          </div>

          {/* চ্যাট ফুটার (ইনপুট ফিল্ড ও সেন্ড বাটন) */}
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
              {/* সেন্ড অ্যারো আইকন */}
              <svg className="w-5 h-5 transform rotate-90 translate-x-[-1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* ফ্লোটিং হোয়াটসঅ্যাপ ট্রিগার বাটন */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Toggle WhatsApp Chat"
      >
        {isOpen ? (
          // ক্লোজ আইকন (যখন চ্যাট উইন্ডোটি খোলা থাকবে)
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // হোয়াটসঅ্যাপ আইকন
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.528 1.975 14.067 1.974 12 1.974c-5.437 0-9.863 4.37-9.867 9.8-.001 1.973.518 3.896 1.5 5.623l-.998 3.643 3.734-.973zm11.367-7.36c-.266-.134-1.583-.781-1.829-.871-.247-.089-.427-.134-.607.134-.18.267-.697.871-.853 1.05-.157.18-.314.201-.58.067-.266-.134-1.127-.415-2.147-1.326-.79-.705-1.324-1.577-1.48-1.845-.155-.267-.017-.411.117-.544.121-.119.266-.312.4-.467.133-.156.178-.267.266-.446.089-.178.045-.334-.022-.468-.067-.134-.607-1.462-.83-2.002-.218-.524-.459-.452-.607-.46l-.518-.01c-.18 0-.473.067-.72.333-.248.267-.945.924-.945 2.25 0 1.325.964 2.607 1.098 2.785.135.178 1.899 2.9 4.6 4.07.643.277 1.144.443 1.534.566.645.205 1.233.176 1.698.107.518-.077 1.583-.647 1.807-1.27.224-.624.224-1.157.157-1.27-.067-.111-.247-.178-.513-.311z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default WhatsAppChatWidget;
"use client";

import { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";

export default function TiltController({ children }) {
  // Start with manual tilt X = -50, Y = 0
  const [[manualTiltAngleX, manualTiltAngleY], setManualTiltAngle] = useState([10, 0]);

  useEffect(() => {
    function handleScroll() {
      const element = document.getElementById("tilt-container");
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if element is mostly visible in viewport (e.g. 50% visible)
      const isInView = rect.top < windowHeight * 0.45 && rect.bottom > windowHeight * 0.25;

      if (isInView) {
        setManualTiltAngle([0, 0]);
      } else {
        setManualTiltAngle([10, 0]);
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="tilt-container" className="flex flex-col items-center gap-6 mt-10">
      <Tilt
        tiltAngleXManual={manualTiltAngleX}
        tiltAngleYManual={manualTiltAngleY}
        glareEnable={true}
        glareMaxOpacity={0}
        glareColor="#ffffff"
        glarePosition="all"
        transition={true}
        className="flex flex-col items-center justify-center max-w-4xl h-full text-white shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
      >
        {children}
      </Tilt>
    </div>
  );
}

// "use client";

// import { useState, useEffect, useRef } from "react";
// import Tilt from "react-parallax-tilt";

// export default function TiltController({ children ,customClass = ""}) {
//   const [manualTilt, setManualTilt] = useState([10, 0]);
//   const currentTilt = useRef([10, 0]);
//   const targetTilt = useRef([10, 0]);
//   const animationRef = useRef(null);

//   // Smooth animate function
//   const animateTilt = () => {
//     const [cx, cy] = currentTilt.current;
//     const [tx, ty] = targetTilt.current;

//     const dx = tx - cx;
//     const dy = ty - cy;

//     // যদি পার্থক্য ছোট হয় তাহলে stop
//     if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
//       currentTilt.current = [tx, ty];
//       setManualTilt([tx, ty]);
//       return;
//     }

//     // ধীরে ধীরে কাছাকাছি নিয়ে যাওয়া
//     const newX = cx + dx * 0.1;
//     const newY = cy + dy * 0.1;

//     currentTilt.current = [newX, newY];
//     setManualTilt([newX, newY]);

//     animationRef.current = requestAnimationFrame(animateTilt);
//   };

//   useEffect(() => {
//     function handleScroll() {
//       const element = document.getElementById("tilt-container");
//       if (!element) return;

//       const rect = element.getBoundingClientRect();
//       const windowHeight = window.innerHeight;

//       const isInView = rect.top < windowHeight * 0.45 && rect.bottom > windowHeight * 0.25;

//       // টার্গেট ভ্যালু সেট করুন
//       targetTilt.current = isInView ? [0, 0] : [10, 0];

//       // এনিমেশন শুরু করুন
//       cancelAnimationFrame(animationRef.current);
//       animationRef.current = requestAnimationFrame(animateTilt);
//     }

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       cancelAnimationFrame(animationRef.current);
//     };
//   }, []);

//   return (
//     <div id="tilt-container" className="flex flex-col items-center gap-6 mt-10">
//       <Tilt
//         tiltAngleXManual={manualTilt[0]}
//         tiltAngleYManual={manualTilt[1]}
//         glareEnable={true}
//         glareMaxOpacity={0}
//         glareColor="#ffffff"
//         glarePosition="all"
//         transition={true}
//         className={`${customClass}`}
//         // className="flex flex-col items-center justify-center w-full h-full text-white transition-transform duration-500 ease-out shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
//       >
//         {children}
//       </Tilt>
//     </div>
//   );
// }

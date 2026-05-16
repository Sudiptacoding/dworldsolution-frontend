"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const animate = () => {
      // Smooth interpolation
      currentX.current += (mouseX.current - currentX.current) * 0.1;
      currentY.current += (mouseY.current - currentY.current) * 0.1;

      if (cursor) {
        cursor.style.left = `${currentX.current}px`;
        cursor.style.top = `${currentY.current}px`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate(); // Start animation loop

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed z-[9999] top-0 left-0 w-6 h-6 rounded-full pointer-events-none animate-pulse-custom"
      style={{
        background: "radial-gradient(circle, #fb7185 0%, #f43f5e 40%, transparent 70%)",
        boxShadow: "0 0 12px #f43f5e, 0 0 24px #f43f5e, 0 0 36px #fb7185",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}



// "use client";
// import { useEffect, useRef } from "react";

// export default function NeonSnakeCursorLine() {
//   const canvasRef = useRef(null);
//   const pointsRef = useRef([]);
//   const mouseX = useRef(0);
//   const mouseY = useRef(0);

//   const trailLength = 20; // snake trail points
//   const lineWidth = 5;    // snake thickness
//   const cursorGlowRadius = 10; // circular glow radius

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     // Initialize trail points
//     pointsRef.current = Array.from({ length: trailLength }, () => ({ x: 0, y: 0 }));

//     const handleMouseMove = (e) => {
//       mouseX.current = e.clientX;
//       mouseY.current = e.clientY;
//     };

//     const animate = () => {
//       const points = pointsRef.current;

//       // Shift points: remove last, insert new cursor position
//       points.pop();
//       points.unshift({ x: mouseX.current, y: mouseY.current });

//       // Clear canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Create gradient for snake line
//       const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//       gradient.addColorStop(0, "#3B82F6");   // blue
//       gradient.addColorStop(0.5, "#60A5FA"); // lighter blue
//       gradient.addColorStop(1, "#8B5CF6");   // purple

//       // Draw continuous neon line
//       ctx.beginPath();
//       for (let i = 0; i < points.length; i++) {
//         const p = points[i];
//         if (i === 0) {
//           ctx.moveTo(p.x, p.y);
//         } else {
//           ctx.lineTo(p.x, p.y);
//         }
//       }
//       ctx.strokeStyle = gradient;
//       ctx.lineWidth = lineWidth;
//       ctx.shadowColor = "#3B82F6";
//       ctx.shadowBlur = 90;
//       ctx.stroke();

//       // Draw cursor glow circle
//       ctx.beginPath();
//       ctx.arc(mouseX.current, mouseY.current, cursorGlowRadius, 0, Math.PI * 2);
//       ctx.fillStyle = "rgba(59,130,246,0.3)"; // semi-transparent glow
//       ctx.shadowColor = "#3B82F6";
//       ctx.shadowBlur = 90;
//       ctx.fill();

//       requestAnimationFrame(animate);
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     animate();

//     // Resize canvas on window resize
//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none"
//     ></canvas>
//   );
// }

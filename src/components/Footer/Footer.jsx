// import React from "react";
// import Container from "../../common/Container/Container";
// import Link from "next/link";
// import Image from "next/image";

// function Footer() {
//   return (
//     <footer className="text-white bg-black">
//       <Container>
//         {/* Top Divider Line */}
      

//         {/* Main Footer */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-0 mb-[60px]">
//           {/* Left: Logo Section */}
//           <Link
//             href="/"
//             aria-label="Home"
//             className="shrink-0 flex flex-col gap-8 items-start max-w-[450px]"
//           >
//             <Image
//               src="/image/Logo png.png"
//               alt="Brand Logo"
//               width={130}
//               height={37}
//               className="w-[200px] h-[58px] "
//             />
//           </Link>

//           {/* Right: Link Section */}
//           <div className="flex items-center justify-start w-full md:justify-end">
//             <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
//               <Link
//                 href="#Experience"
//                 className="text-sm font-normal text-gray-500 transition-colors duration-300 hover:text-white"
//               >
//                 Terms & Conditions
//               </Link>
//               <Link
//                 href="#Feature-Section"
//                 className="text-sm font-normal text-gray-500 transition-colors duration-300 hover:text-white"
//               >
//                 Refund Policy
//               </Link>
//               <Link
//                 href="#Extra"
//                 className="text-sm font-normal text-gray-500 transition-colors duration-300 hover:text-white"
//               >
//                 Privacy Policy
//               </Link>
//             </div>
//           </div>
//         </div>
//   <div className="w-full h-px bg-[#2e2e2e] mb-[60px] flex items-center justify-center"></div>
//         {/* Bottom Made-by Section */}
//         <div className="flex flex-col items-center justify-between gap-6 pb-10 md:flex-row">
//           <div className="text-[12.5px] text-[#A0A0A0] font-normal leading-[1.5em]">
//             © 2025 mzmedia | all rights reserved by mzmedia
//           </div>

//           {/* Social Media Links */}
//           <div className="flex gap-[30px]">
//             <a
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-[20px] inline-block transition-opacity duration-300 hover:opacity-70"
//             >
//               <Image
//                 src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6796419e2d5f0387789624a7_LinkedIn.svg"
//                 alt="Linkedin"
//                 width={20}
//                 height={20}
//                 className="w-full h-auto"
//               />
//             </a>
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-[20px] inline-block transition-opacity duration-300 hover:opacity-70"
//             >
//               <Image
//                 src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6796419e2d5f0387789624f9_X.com.svg"
//                 alt="X.com logo"
//                 width={20}
//                 height={20}
//                 className="w-full h-auto"
//               />
//             </a>
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-[20px] inline-block transition-opacity duration-300 hover:opacity-70"
//             >
//               <Image
//                 src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6796419e2d5f0387789624a8_Facebook.svg"
//                 alt="Facebook"
//                 width={20}
//                 height={20}
//                 className="w-full h-auto"
//               />
//             </a>
//           </div>
//         </div>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;




import React from "react";
import Container from "../../common/Container/Container";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer
      className="relative text-white bg-black bg-bottom bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('https://cdn.prod.website-files.com/6796419e2d5f03877896246e/679651def5e214bba9495e68_Hero%20Glow%20BG-p-2000.webp')",
      }}
    >
      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10">
        <Container>
          {/* Main Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-0 mb-[60px] py-24">
            {/* Left: Logo Section */}
            <Link
              href="/"
              aria-label="Home"
              className="shrink-0 flex flex-col gap-8 items-start max-w-[450px]"
            >
              <Image
                src="/image/Logo png.png"
                alt="Brand Logo"
                width={139}
                height={33}
                className="w-[200px] h-[58px] "
              />
            </Link>

            {/* Right: Link Section */}
            <div className="flex items-center justify-start w-full md:justify-end">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
                <Link
                  href="#Experience"
                  className="text-sm font-normal text-gray-400 transition-colors duration-300 hover:text-white"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="#Feature-Section"
                  className="text-sm font-normal text-gray-400 transition-colors duration-300 hover:text-white"
                >
                  Refund Policy
                </Link>
                <Link
                  href="#Extra"
                  className="text-sm font-normal text-gray-400 transition-colors duration-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#2e2e2e] mb-[60px] flex items-center justify-center"></div>

          {/* Bottom Made-by Section */}
          <div className="flex flex-col items-center justify-between gap-6 pb-10 md:flex-row">
            <div className="text-[12.5px] text-[#A0A0A0] font-normal leading-[1.5em]">
              © 2025 mzmedia | all rights reserved by mzmedia
            </div>

            {/* Social Media Links */}
            <div className="flex gap-[30px]">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[20px] inline-block transition-opacity duration-300 hover:opacity-70"
              >
                <Image
                  src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6796419e2d5f0387789624a7_LinkedIn.svg"
                  alt="Linkedin"
                  width={20}
                  height={20}
                  className="w-full h-auto"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[20px] inline-block transition-opacity duration-300 hover:opacity-70"
              >
                <Image
                  src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6796419e2d5f0387789624f9_X.com.svg"
                  alt="X.com logo"
                  width={20}
                  height={20}
                  className="w-full h-auto"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[20px] inline-block transition-opacity duration-300 hover:opacity-70"
              >
                <Image
                  src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6796419e2d5f0387789624a8_Facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="w-full h-auto"
                />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;

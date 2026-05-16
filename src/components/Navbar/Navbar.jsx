"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky z-50 flex justify-center w-full px-4 top-4">
      <div
        className="absolute max-w-[944px] w-full flex items-center justify-between px-4 py-3 md:py-4 
                      bg-gradient-to-b from-[#1819294d] to-black/90 
                      backdrop-blur-md border border-white/10 rounded-lg"
      >
        {/* Logo */}
        <Link href="#" aria-label="Home" className="shrink-0">
          <Image
            src="/image/Logo png.png"
            alt="Brand Logo"
            width={120}
            height={40}
            className="w-[130px] h-[37px]"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="items-center justify-center flex-1 hidden space-x-6 text-sm md:flex">
          <NavLink href="#testimonial" text="Review" />
          <NavLink href="#work" text="Work" />
          <NavLink href="#case-study" text="Case Study" />
          <NavLink href="#Process" text="Process" />
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block ">
          <Link
            href="#book-a-call"
            className="bg-[#273fb7] p-[14px] rounded-lg font-semibold  transition text-sm text-white hover:opacity-85 hover:[box-shadow:inset_0_0_0_5px_#0003]"
          >
            Book a call
          </Link>
        </div>

        {/* Hamburger Button */}
        <button className="z-50 ml-auto md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          <Image
            src="https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6796419e2d5f0387789624c2_Hamburger.svg"
            alt="Menu"
            width={24}
            height={24}
          />
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute left-0 w-full p-4 mt-2 space-y-4 border rounded-lg top-full bg-black/90 backdrop-blur-md border-white/10 md:hidden">
            <MobileNavLink href="#testimonial" text="Review" />
            <MobileNavLink href="#work" text="Work" />
            <MobileNavLink href="#case-study" text="Case Study" />
            <MobileNavLink href="#Process" text="Process" />
            <Link href="#book-a-call" className="block px-4 py-2 font-semibold text-center text-black bg-white rounded">
              Book a call
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

// Desktop Nav Link
function NavLink({ href, text }) {
  return (
    <Link href={href} className="font-medium text-white transition hover:text-gray-300">
      {text}
    </Link>
  );
}

// Mobile Nav Link
function MobileNavLink({ href, text }) {
  return (
    <Link href={href} className="block font-medium text-white hover:text-gray-300">
      {text}
    </Link>
  );
}

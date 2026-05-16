"use client";

import React from "react";

export default function Container({ children, className = "" }) {
  return (
    <div
      className={`
        relative 
        flex flex-col justify-center items-stretch
        w-full max-w-[1000px]
        px-8 py-6 md:px-0 md:py-0
        mx-auto
        ${className}
      `}
    >
      {children}
    </div>
  );
}

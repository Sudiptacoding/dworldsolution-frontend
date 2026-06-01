"use client";

import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    // ১. ব্রাউজারের ডিফল্ট স্ক্রল রিস্টোরেশন বন্ধ করা (যাতে রিলোড দিলে ব্রাউজার নিজে থেকে লাফ না দেয়)
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        const element = document.getElementById(targetId);

        if (element) {
          // ২. পেজের অন্যান্য উপাদান এবং স্লাইডার রেন্ডার হওয়া সম্পন্ন করতে সামান্য সময় দেওয়া হচ্ছে
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 600); // লেআউট স্থির হওয়ার জন্য ৬০০ মিলি-সেকেন্ড ডিলে করা হলো
        }
      }
    };

    // প্রথমবার কম্পোনেন্ট মাউন্ট হলে স্ক্রল রান করা
    scrollToHash();

    // পেজ পুরোপুরি লোড (ইমেজ, স্লাইডার রিসোর্স সহ) হওয়ার পর আবার রান করা
    window.addEventListener("load", scrollToHash);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.removeEventListener("load", scrollToHash);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
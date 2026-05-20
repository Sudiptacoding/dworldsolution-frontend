'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    const startTime = Date.now();
    
    const sendData = async () => {
      const duration = (Date.now() - startTime) / 1000;
      await axios.post('https://dworldsolution-backend.vercel.app/api/track', {
        url: pathname,
        referrer: document.referrer || 'Direct',
        sessionDuration: duration
      });
    };

    // পেজ থেকে চলে যাওয়ার সময় ডেটা পাঠাবে
    window.addEventListener('beforeunload', sendData);
    return () => window.removeEventListener('beforeunload', sendData);
  }, [pathname]);

  return null;
}
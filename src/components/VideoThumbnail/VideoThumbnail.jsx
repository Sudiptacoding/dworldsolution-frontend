"use client";
import { useState } from "react";
export default function VideoThumbnail({ thamnailURL, VideoURL }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg cursor-pointer"
      style={{ paddingTop: "56.25%" }} // 16:9 aspect ratio
    >
      {!isPlaying ? (
        <>
          {/* Custom Thumbnail Image */}
          <img
            src={thamnailURL}
            alt="Video Thumbnail"
            className="absolute top-0 left-0 object-cover w-full h-full rounded-lg"
            onClick={() => setIsPlaying(true)}
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-75 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* YouTube iframe */}
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={VideoURL}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          {/* Close Button */}
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute z-50 p-2 text-white transition bg-black bg-opacity-50 rounded-full top-2 right-2 hover:bg-opacity-80"
            aria-label="Close video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

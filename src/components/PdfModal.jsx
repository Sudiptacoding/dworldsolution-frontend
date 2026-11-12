// components/PdfModal.jsx
"use client";
import React from "react";

function PdfModal({ isOpen, onClose, pdfUrl, title }) {
  if (!isOpen || !pdfUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 md:p-6">
      <div className="relative w-full max-w-5xl h-[90vh] bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 bg-neutral-900">
          <div className="flex items-center gap-2.5 truncate">
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">PDF</span>
            <h3 className="text-white text-sm md:text-base font-semibold truncate max-w-xs md:max-w-md">
              {title || "PDF Document"}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-[#273fb7] hover:bg-[#1e329a] text-white px-3 py-1.5 rounded-lg transition font-medium"
            >
              Open in New Tab
            </a>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition px-2 py-1 text-lg font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Inline PDF Viewer (<object> ensures in-browser view without download) */}
        <div className="flex-1 w-full h-full bg-neutral-900">
          <object
            data={`${pdfUrl}#toolbar=1`}
            type="application/pdf"
            className="w-full h-full"
          >
            {/* Fallback if object fails */}
            <iframe
              src={`${pdfUrl}#toolbar=1`}
              className="w-full h-full border-none"
              title="PDF Inline"
            />
          </object>
        </div>
      </div>
    </div>
  );
}

export default PdfModal;
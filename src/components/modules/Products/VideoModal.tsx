"use client"
import { FilePlay } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const VideoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const videoId = "fq9S_OyIgmg";

  // Outside click detect
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-2 py-1 cursor-pointer  text-red-600 font-bold rounded-sm shadow-md "
      >
        <FilePlay className="w-5 h-5" />
      </button>

      {/* Full Page Modal - Using Portal to render at body level */}
      {isOpen && createPortal(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
          {/* Modal Container */}
          <div
            ref={modalRef}
            className="relative w-full max-w-3xl mx-4 bg-black rounded-lg overflow-hidden"
          >
            {/* Close Button - Top Right */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 z-10 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 text-base font-bold cursor-pointer transition-colors"
            >
              ✕
            </button>

            {/* Video Container - Full width responsive */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default VideoModal;
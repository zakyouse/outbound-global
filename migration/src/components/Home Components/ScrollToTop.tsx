"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Button appears when top is NOT visible
        setVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
      },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Invisible element at the top */}
      <div ref={sentinelRef} className="absolute top-0 h-px w-full" />

      {/* Scroll button */}
      {visible && (
        <button
          aria-label="Scroll to top"
          className="
            fixed bottom-6 right-6 z-50
            rounded-full bg-mygreen text-white
            p-3 shadow-lg
            transition-all duration-300
            hover:scale-110 hover:bg-mygreen/90
            focus:outline-none cursor-pointer
          "
          onClick={scrollToTop}
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
}

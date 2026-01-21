import { useEffect } from "react";
import { createPortal } from "react-dom";

export function Popup({ isOpen, onClose, title, content }) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 bg-gray-900/90 z-[9999] flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-2xl p-6 w-1/3 transform transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-all p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          {content || "No content provided"}
        </p>

        <p className="bg-black text-white inline-block rounded-3xl p-4 py-0 cursor-pointer text-base mb-6">
          Resources
        </p>

        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
        >
          Close
        </button> */}
      </div>
    </div>,
    document.body
  );
}

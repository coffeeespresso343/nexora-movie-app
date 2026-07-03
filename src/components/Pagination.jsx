import React from "react";
import { getPageNumbers } from "../utils/getPageNumbers";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const pages = getPageNumbers(page, totalPages);

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="py-1 bg-gray-700 text-white rounded disabled:opacity-40 hover:bg-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Numbers */}
      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(p)}
            className={`cursor-pointer px-3 py-1 rounded ${
              p === page
                ? "bg-linear-to-r from-purple-500 to-pink-400 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange((p) => p + 1)}
        disabled={page === totalPages}
        className="py-1 bg-gray-700 text-white rounded disabled:opacity-40 hover:bg-gray-600 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;

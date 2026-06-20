import React from "react";
import { getPageNumbers } from "../utils/getPageNumbers";

const Pagination = ({ page, totalPages, setPage }) => {
  const pages = getPageNumbers(page, totalPages);

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
      {/* Prev */}
      <button
        onClick={() => setPage((p) => p - 1)}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40 hover:bg-gray-600"
      >
        Prev
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
            onClick={() => setPage(p)}
            className={`cursor-pointer px-3 py-1 rounded ${
              p === page
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40 hover:bg-gray-600 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

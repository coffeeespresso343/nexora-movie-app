import React from "react";

const ErrorMessage = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-red-400"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>

      <p className="text-sm text-gray-300">{errorMessage}</p>
      <p className="text-sm text-gray-400">Please try again.</p>
    </div>
  );
};

export default ErrorMessage;

import React from "react";

const Error = ({ errorMessage }) => {
  return (
    <div className="place-items-center ">
      <div
        className="flex flex-col items-center gap-5 p-4 mb-4 text-sm text-fg-warning rounded-base bg-warning-soft"
        role="alert"
      >
        <div className="text-5xl mb-2">⚠️</div>
        <p className="text-lg text-red-400">{errorMessage}</p>
        <p className="text-gray-400 text-sm mt-2">
          Try searching for another movie.
        </p>
      </div>
    </div>
  );
};

export default Error;

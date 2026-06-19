import React from "react";

const Error = ({ errorMessage }) => {
  return (
    <div className="place-items-center ">
      <div
        className="flex flex-col items-center gap-5 p-4 mb-4 text-sm text-fg-warning rounded-base bg-warning-soft"
        role="alert"
      >
        <div className="text-5xl">⚠️</div>
        <p className="text-xs text-red-400">{errorMessage}</p>
      </div>
    </div>
  );
};

export default Error;

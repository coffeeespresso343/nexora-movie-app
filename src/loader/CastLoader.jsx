import React from "react";

const CastLoader = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <div key={index} className="animate-pulse">
      <div className="h-62.5 w-full rounded-lg bg-gray-700"></div>
      <div className="mx-auto mt-3 h-4 w-3/4 rounded bg-gray-700"></div>
      <div className="mx-auto mt-2 h-3 w-1/2 rounded bg-gray-800"></div>
    </div>
  ));
};

export default CastLoader;

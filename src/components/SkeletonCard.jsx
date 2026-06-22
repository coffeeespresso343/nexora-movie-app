import React from "react";

const SkeletonCard = () => {
  return (
    <li className="list-none">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <div className="relative aspect-[2/3] w-full animate-pulse bg-white/10">
          {/* Mirrors the rating badge position on SeriesCard */}
          <div className="absolute right-2 top-2 h-5 w-10 animate-pulse rounded-full bg-white/20" />
        </div>

        <div className="px-3 py-3">
          {/* Mirrors the title line */}
          <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />

          {/* Mirrors the language • year metadata line */}
          <div className="mt-2 flex items-center gap-1.5">
            <div className="h-3 w-6 animate-pulse rounded bg-white/10" />
            <span className="h-3 w-1 rounded bg-white/10" />
            <div className="h-3 w-8 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default SkeletonCard;

import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  } = movie;

  return (
    <li className="list-none">
      <Link
        to={`/movie/${id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-sm bg-[#1A1A20] transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
          {/* Sprocket-hole strip, revealed on hover like a film cell catching light */}
          <div className="absolute inset-x-0 top-0 z-10 flex justify-between px-2 pt-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#0B0B0F]" />
            ))}
          </div>

          <div className="relative aspect-2/3 w-full overflow-hidden">
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : "/no-movie.png"
              }
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0B0B0F] via-transparent to-transparent opacity-60" />
          </div>

          <div className="px-3 py-3">
            <h3 className="truncate font-[Bebas_Neue] text-lg leading-tight tracking-wide text-[#F5F1E8]">
              {title}
            </h3>

            <div className="mt-1.5 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#8B8378]">
              <span className="flex items-center gap-1 text-[#D4AF37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
                {vote_average ? vote_average.toFixed(1) : "N/A"}
              </span>
              <span className="text-[#8B8378]/50">·</span>
              <span>{original_language?.toUpperCase() ?? "N/A"}</span>
              <span className="text-[#8B8378]/50">·</span>
              <span>{release_date ? release_date.split("-")[0] : "N/A"}</span>
            </div>
          </div>

          {/* Velvet-red edge, the one bold accent, appears on hover only */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#C81E3A] transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </div>
      </Link>
    </li>
  );
};

export default MovieCard;

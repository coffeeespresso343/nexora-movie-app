import React from "react";
import { Link } from "react-router-dom";

const SeriesCard = ({ series }) => {
  const {
    id,
    name,
    vote_average,
    poster_path,
    first_air_date,
    original_language,
  } = series;

  return (
    <Link
      to={`/series/${id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="group block"
    >
      <div
        className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all
             duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-purple-500/40 group-hover:shadow-lg group-hover:shadow-purple-500/20"
      >
        <div className="realtive aspect-2/3 w-full overflow-hidden">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : "/no-movie.png"
            }
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute right-2 inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-70"></div>

          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-2 py-1 text-xs font-semibold text-white shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="gold"
              stroke="gold"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
            {vote_average ? vote_average.toFixed(1) : "N/A"}
          </div>
        </div>

        <div className="px-3 py-3">
          <h3 className="truncate text-sm font-semibold text-white">{name}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
            <span>{original_language?.toUpperCase() ?? "N/A"}</span>

            <span className="text-gray-600">●</span>
            <span>{first_air_date ? first_air_date.split("-")[0] : "N/A"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SeriesCard;

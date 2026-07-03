import React from "react";
import { Link } from "react-router-dom";

const TrendingCard = ({ item }) => {
  const isMovie = item.media_type === "movie";

  const title = isMovie ? item.title : item.name;
  const year = isMovie
    ? item.release_date?.split("-")[0]
    : item.first_air_date?.split("-")[0];

  const to = isMovie ? `/movie/${item.id}` : `/series/${item.id}`;

  return (
    <div className="list-none">
      <Link
        to={to}
        onClick={() => window.scrollTo(0, 0)}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-purple-500/40 group-hover:shadow-lg group-hover:shadow-purple-500/20">
          <div className="relative aspect-2/3 w-full overflow-hidden">
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                  : "/no-movie.png"
              }
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-70" />

            {/* Rating badge */}
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
              </svg>{" "}
              {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
            </div>

            {/* Media type badge */}
            <div className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-gray-300 backdrop-blur-sm">
              {isMovie ? "Movie" : "Series"}
            </div>
          </div>

          <div className="px-3 py-3">
            <h3 className="truncate text-sm font-semibold text-white">
              {title}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
              <span>{item.original_language?.toUpperCase() ?? "N/A"}</span>
              <span className="text-gray-600">•</span>
              <span>{year ?? "N/A"}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TrendingCard;

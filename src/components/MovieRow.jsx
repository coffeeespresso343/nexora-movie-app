import React, { useRef } from "react";
import { Link } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";
import MovieCard from "./MovieCard";

const MovieRow = ({ title, movies, isLoading, seeAllPath }) => {
  if (!isLoading && movies.length === 0) return null;

  const scrollRef = useRef(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-14">
      <div className="flex gap-3 items-baseline justify-self-center">
        <h2 className="text-2xl font-[Bebas_Neue] tracking-wider font-bold text-white">
          {title}
        </h2>

        {seeAllPath && (
          <Link
            to={seeAllPath}
            onClick={() => window.scrollTo(0, 0)}
            className="text-sm font-medium text-gray-400 transition hover:text-purple-400"
          >
            See all →
          </Link>
        )}
      </div>

      <div className="relative">
        <ul
          ref={scrollRef}
          className="mt-6 flex gap-5 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
        >
          {isLoading
            ? Array.from({ length: 7 }).map((_, i) => (
                <li key={i} className="w-40 shrink-0 list-none sm:w-44">
                  <SkeletonCard />
                </li>
              ))
            : movies.map((movie) => (
                <li key={movie.id} className="w-40 shrink-0 list-none sm:w-44">
                  <MovieCard movie={movie} />
                </li>
              ))}
        </ul>

        <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-linear-to-l from-black/60 to-transparent" />

        <button
          onClick={scrollRight}
          className="absolute right-0.5 top-1/2 -translate-y-1/2  bg-white/40 hover:bg-white/50 text-black rounded-full p-2 shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
    </section>
  );
};

export default MovieRow;

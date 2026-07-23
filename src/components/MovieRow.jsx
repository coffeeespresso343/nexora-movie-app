import { useRef } from "react";
import { Link } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";
import MovieCard from "./MovieCard";
import ErrorMessage from "./ErrorMessage";
import { ChevronRight } from "lucide-react";

const MovieRow = ({ title, movies, isLoading, seeAllPath }) => {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current?.scrollBy({
      left: 300,
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-14 border-b border-b-gray-800 pb-5">
      <div className="flex gap-3 items-baseline justify-self-center">
        <h2 className="text-2xl font-[Bebas_Neue] tracking-wider font-semibold text-white">
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
        {isLoading ? (
          <ul
            ref={scrollRef}
            className="mt-6 flex gap-2 md:gap-4 overflow-x-auto scrollbar-none scroll-smooth"
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <li key={index} className="w-40 shrink-0 list-none">
                <SkeletonCard />
              </li>
            ))}
          </ul>
        ) : movies.length === 0 ? (
          <ErrorMessage errorMessage={"No movies available"} />
        ) : (
          <ul
            ref={scrollRef}
            className="mt-6 flex gap-2 md:gap-4 overflow-x-auto scrollbar-none scroll-smooth"
          >
            {movies.map((movie) => (
              <li key={movie.id} className="w-40 shrink-0 list-none">
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        )}

        {movies.length > 0 && (
          <>
            <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-linear-to-l from-black/60 to-transparent" />

            <button
              onClick={scrollRight}
              className="absolute right-0.5 top-1/2 -translate-y-1/2  bg-white/40 hover:bg-white/50 text-black rounded-full p-2 shadow"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default MovieRow;

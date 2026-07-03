import { useEffect, useRef, useState } from "react";
import { getTrendingMovies } from "../appwrite";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const TrendingMovies = ({}) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [disabled, setDisabled] = useState(false);
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: 300,
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let ignore = false;

    setIsTrendingLoading(true);
    setDisabled(false);
    setErrorMessage("");

    const loadTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies();

        if (!movies || movies.length === 0) {
          setDisabled(true);
          setErrorMessage("Failed to load trending movies.");
          return;
        }

        if (ignore) return;

        setTrendingMovies(movies);
      } catch (error) {
        console.error(error);
        if (!ignore) {
          setDisabled(true);
          setErrorMessage("Error loading trending movies.");
        }
      } finally {
        if (!ignore) {
          setIsTrendingLoading(false);
        }
      }
    };

    loadTrendingMovies();

    return () => (ignore = true);
  }, []);
  return (
    <section className="mt-20 border-b border-b-gray-800 pb-5">
      <h2 className="mt-5 text-2xl font-[Bebas_Neue] tracking-wide font-bold text-white text-center">
        Trending{" "}
        <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Now
        </span>
      </h2>

      <div className="relative">
        <ul
          ref={scrollRef}
          className=" mt-6 flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-none"
        >
          {isTrendingLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="relative w-36 shrink-0 list-none">
                <div className="h-56 w-36 animate-pulse rounded-xl bg-white/10"></div>
              </li>
            ))
          ) : errorMessage ? (
            <div className="flex-1 basis-8/8">
              <ErrorMessage errorMessage={errorMessage} />
            </div>
          ) : (
            trendingMovies.map((movie, index) => (
              <li key={movie.$id} className="relative shrink-0 list-none">
                <span className="absolute -left-2 -top-2 z-10 flex h-10 w-8 items-center justify-center rounded-br-xl bg-gray-900  text-4xl font-bold text-gray-600 shadow-md shadow-purple-500/30">
                  {index + 1}
                </span>
                <Link
                  to={`/movie/${movie.movie_id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group block"
                >
                  <img
                    src={movie.poster_url}
                    alt={
                      movie.title || movie.searchTerm || "Trending movie poster"
                    }
                    loading="lazy"
                    className="h-56 w-36 rounded-xl border border-white/10 object-cover transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-purple-500/40"
                  />
                </Link>
              </li>
            ))
          )}
        </ul>

        <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-linear-to-l from-black/60 to-transparent" />

        <button
          onClick={scrollRight}
          disabled={disabled}
          className="absolute right-0.5 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/50 text-black rounded-full p-2 shadow disabled:opacity-0"
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

export default TrendingMovies;

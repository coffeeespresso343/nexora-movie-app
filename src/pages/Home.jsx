import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import Movies from "./Movie";
import Series from "./Series";
import { getTrendingMovies } from "../appwrite";
import { Link } from "react-router-dom";
import MovieRow from "../components/MovieRow";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const ROWS = [
  { title: "Popular Movies", endpoint: "/movie/popular", seeAllPath: "/movie" },
  { title: "Top Rated", endpoint: "/movie/top_rated", seeAllPath: "/movie" },
  {
    title: "Now Playing",
    endpoint: "/movie/now_playing",
    seeAllPath: "/movie",
  },
  { title: "Upcoming", endpoint: "/movie/upcoming", seeAllPath: "/movie" },
];

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);

  const [rowData, setRowData] = useState(() =>
    Object.fromEntries(
      ROWS.map((r) => [r.endpoint, { movies: [], isLoadig: true }]),
    ),
  );

  const scrollRef = useRef(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies();

        if (!ignore) {
          setTrendingMovies(movies || []);
        }
      } catch (error) {
        console.error(`Error fetching tending movies: ${error}`);
      } finally {
        if (!ignore) {
          setIsTrendingLoading(false);
        }
      }
    };

    loadTrendingMovies();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    ROWS.forEach(({ endpoint }) => {
      const fetchRow = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}${endpoint}?page=1`,
            API_OPTIONS,
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint}`);
          }

          const data = await response.json();

          if (ignore) return;

          setRowData((prev) => ({
            ...prev,
            [endpoint]: { movies: data.results || [], isLoadig: false },
          }));
        } catch (error) {
          console.error(error);
          if (!ignore) {
            setRowData((prev) => ({
              ...prev,
              [endpoint]: { movies: [], isLoadig: false },
            }));
          }
        }
      };

      fetchRow();
    });

    return () => (ignore = true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F5F1E8]">
      {/* <Hero /> */}

      <div className="mx-auto max-w-7xl px-6 pb-20">
        {(isTrendingLoading || trendingMovies.length > 0) && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-white">
              Trending{" "}
              <span
                className="
              bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              >
                Now
              </span>
            </h2>

            <div className="relative">
              <ul
                ref={scrollRef}
                className=" mt-6 flex gap-5 overflow-x-auto pb-4 scrollbar-none"
              >
                {isTrendingLoading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <li key={i} className="relative w-36 shrink-0 list-none">
                        <div className="h-56 w-36 animate-pulse rounded-xl bg-white/10"></div>
                      </li>
                    ))
                  : trendingMovies.map((movie, index) => (
                      <li
                        key={movie.movie_id}
                        className="relative shrink-0 list-none"
                      >
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
                              movie.title ||
                              movie.searchTerm ||
                              "Trending movie poster"
                            }
                            className="h-56 w-36 rounded-xl border border-white/10 object-cover transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-purple-500/40"
                          />
                        </Link>
                      </li>
                    ))}
              </ul>
              <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-linear-to-l from-black/60 to-transparent" />

              <button
                onClick={scrollRight}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/50 text-black rounded-full p-2 shadow"
              >
                {">"}
              </button>
            </div>
          </section>
        )}

        {ROWS.map(({ title, endpoint, seeAllPath }) => (
          <MovieRow
            key={endpoint}
            title={title}
            movies={rowData[endpoint].movies}
            isLoading={rowData[endpoint].isLoadig}
            seeAllPath={seeAllPath}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

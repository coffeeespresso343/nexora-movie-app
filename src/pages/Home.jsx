import { useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";
import Search from "../components/Search";
import MovieCard from "../components/MovieCard";
import ErrorMessage from "../components/ErrorMessage";
import { getTrendingMovies, updateSearchCount } from "../appwrite";
import SkeletonGrid from "../components/SkeletonGrid";
import Pagination from "../components/Pagination";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// TMDB caps total_pages at 500 regardless of what it reports
const MAX_TMDB_PAGES = 500;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const moviesRef = useRef(null);
  const isFirstLoad = useRef(true);
  const isUserPaginating = useRef(false);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm]);

  const handlePageChange = (newPage) => {
    isUserPaginating.current = true;
    setPage(newPage);
  };

  useEffect(() => {
    // Prevent browser from restoring scroll position on reload
    // if ("scrollRestoration" in window.history) {
    //   window.history.scrollRestoration = "manual";
    // }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    let ignore = false;

    const fetchMovies = async (query, pageNum) => {
      setLoading(true);
      setErrorMessage("");

      try {
        const endPoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${pageNum}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${pageNum}`;

        const response = await fetch(endPoint, API_OPTIONS);

        if (!response.ok) {
          throw new Error("Error fetching movies.");
        }

        const data = await response.json();

        if (ignore) return;

        if (!data.results || data.results.length === 0) {
          setMovieList([]);
          setTotalPages(1);
          setErrorMessage(`No movies found for "${query}"`);
          return;
        }

        setMovieList(data.results);
        setTotalPages(Math.min(data.total_pages || 1, MAX_TMDB_PAGES));

        if (query && data.results.length > 0) {
          await updateSearchCount(query, data.results[0]);
        }
      } catch (error) {
        console.error(error);
        if (!ignore) {
          setErrorMessage("Error fetching movies. Please try again.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchMovies(debouncedSearchTerm, page);

    return () => {
      ignore = true;
    };
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error(`Error fetching trending movies: ${error}`);
        // Deliberately not surfacing this to the user — a trending-section
        // failure shouldn't block or alarm them about the main movie list.
      }
    };

    loadTrendingMovies();
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (!isUserPaginating.current) return;

    moviesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    isUserPaginating.current = false;
  }, [page]);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F5F1E8]">
      <Hero />

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        {trendingMovies.length > 0 && (
          <section className="mt-14 trending">
            <div className="flex items-baseline gap-3 border-b border-[#8B8378]/20 pb-3">
              <h2 className=" text-3xl tracking-wide text-[#F5F1E8]">
                Now Trending
              </h2>
              <span className="text-xs uppercase tracking-widest text-[#8B8378]">
                This week
              </span>
            </div>

            <ul className="gap-1">
              {trendingMovies.map((movie, index) => (
                <li key={index} className="ml-0 cursor-pointer">
                  <p className="text-transparent">{index + 1}</p>

                  <Link
                    to={`/movie/${movie.movie_id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="group block"
                  >
                    <img
                      className="h-45 w-35 rounded-xl border border-white/10 object-cover transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-purple-500/40"
                      src={movie.poster_url}
                      alt={movie.title}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-14">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <section ref={moviesRef} className="mt-12 scroll-mt-24">
          <div className="flex items-baseline gap-3 border-b border-[#8B8378]/20 pb-3">
            <h1 className="text-2xl font-bold text-white">
              {debouncedSearchTerm ? (
                <>
                  Results for{" "}
                  <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    "{debouncedSearchTerm}"
                  </span>
                </>
              ) : (
                "All Movies"
              )}
            </h1>

            {debouncedSearchTerm && (
              <span className="font-mono text-xs uppercase tracking-widest text-[#8B8378]">
                "{debouncedSearchTerm}"
              </span>
            )}
          </div>

          <div className="mt-8">
            {isLoading ? (
              <SkeletonGrid count={8} />
            ) : errorMessage ? (
              <ErrorMessage errorMessage={errorMessage} />
            ) : movieList.length === 0 ? (
              <p className="mt-4 font-mono text-sm text-[#8B8378]">
                No movies available.
              </p>
            ) : (
              <>
                <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>

                <div className="mt-10">
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

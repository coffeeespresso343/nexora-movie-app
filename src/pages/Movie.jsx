import React, { useEffect, useRef, useState } from "react";
import SkeletonGrid from "../components/SkeletonGrid";
import Error from "../components/ErrorMessage";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "../appwrite";
import Spinner from "../components/Spinner";
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

const MAX_TMDB_PAGES = 500;

const Movies = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const isUserPaginating = useRef(false);
  const movieRef = useRef(null);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const fetchMovies = async (query = "", pageNum = 1) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${pageNum}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${pageNum}`;

      const response = await fetch(endPoint, API_OPTIONS);

      if (!response.ok) {
        setErrorMessage("Failed to fetch movies.");
        throw new Error("Failed to fetch movies.");
      }

      const data = await response.json();

      if (!data.results) {
        setMovies([]);
        setErrorMessage("No movies found!");
        throw new Error("No movies found!");
      }

      setMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages || 1, MAX_TMDB_PAGES));

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    isUserPaginating.current = true;
    setPage(newPage);
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log("Error loading trending movies.");
    }
  };

  useEffect(() => {
    // if ("scrollRestoration" in window.history) {
    //   window.history.scrollRestoration = "manual";
    // }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm, page);
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    if (!isUserPaginating.current) return;

    movieRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    isUserPaginating.current = false;
  }, [page]);

  return (
    <>
      <div className="min-h-screen bg-[#0B0B0F] text-[#F5F1E8]">
        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
          {trendingMovies.length > 0 && (
            <section className="mt-20 trending">
              <div className="flex items-baseline gap-3 border-b border-[#8B8378]/20 pb-3">
                <h2 className="font-[Bebas_Neue] text-3xl tracking-wide text-[#F5F1E8]">
                  Now Trending
                </h2>
                <span className="font-mono text-xs uppercase tracking-widest text-[#8B8378]">
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

          <section ref={movieRef} className="mt-12 scroll-mt-24">
            <div className="flex items-baseline gap-3 border-b border-[#8B8378]/20 pb-3">
              <h1 className="font-[Bebas_Neue] text-3xl tracking-wide text-[#F5F1E8]">
                {debouncedSearchTerm ? "Results" : "All Movies"}
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
              ) : movies.length === 0 ? (
                <p className="mt-4 font-mono text-sm text-[#8B8378]">
                  No movies available. Please try again.
                </p>
              ) : (
                <>
                  <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {movies.map((movie) => (
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
    </>
  );
};

export default Movies;

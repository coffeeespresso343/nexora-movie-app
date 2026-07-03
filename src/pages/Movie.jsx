import { useEffect, useRef, useState } from "react";
import SkeletonGrid from "../components/SkeletonGrid";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { useDebounce } from "react-use";
import { updateSearchCount } from "../appwrite";
import ErrorMessage from "../components/ErrorMessage";
import TrendingMovies from "../components/TrendingMovies";
import { useLocation } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSearchError, setIsSearchError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const isUserPaginating = useRef(false);
  const movieRef = useRef(null);
  const searchRef = useRef(null);
  const resultRef = useRef(null);

  const location = useLocation();

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);

      if (searchTerm.trim()) {
        setPage(1);
      }
    },
    800,
    [searchTerm],
  );

  const handlePageChange = (newPage) => {
    isUserPaginating.current = true;
    setPage(newPage);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let ignore = false;

    setIsLoading(true);
    setErrorMessage("");
    setIsSearchError(false);

    const fetchMovies = async (query = "", pageNum = 1) => {
      setIsLoading(true);
      setErrorMessage("");
      setIsSearchError(false);

      try {
        const endPoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${pageNum}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${pageNum}`;

        const response = await fetch(endPoint, API_OPTIONS);

        if (!response.ok) {
          setIsSearchError(false);
          setErrorMessage("Failed to load movies.");
          throw new Error("Failed to fetch movies.");
        }

        const data = await response.json();

        if (ignore) return;

        if (!data.results || data.results.length === 0) {
          setMovies([]);
          setTotalPages(1);
          setIsSearchError(true);
          setErrorMessage(`No movies found for "${query}"`);
          return;
        }

        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages || 1, MAX_TMDB_PAGES));

        if (query && data.results.length > 0) {
          await updateSearchCount(query, data.results[0]);
        }
      } catch (error) {
        console.error(error);
        if (!ignore) {
          setErrorMessage("Error loading movies.");
          setIsSearchError(false);
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchMovies(debouncedSearchTerm, page);

    return () => (ignore = true);
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    if (location.state?.focusSearch) {
      searchRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        searchRef.current?.focus();
        window.history.replaceState({}, document.title);
      }, 500);
    }
  }, [location]);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) return;
    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    window.history.replaceState({}, document.title);
  }, [debouncedSearchTerm]);

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
        <div className="mx-auto max-w-7xl px-6 pb-20 sm:px-6 lg:px-8">
          <TrendingMovies />

          <div className="mt-5">
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchRef={searchRef}
              placeholder="Search through thousands of movies..."
            />
          </div>

          <section ref={movieRef} className="mt-5 scroll-mt-24">
            <div
              ref={resultRef}
              className="flex flex-col border-b border-[#8B8378]/20 pb-2"
            >
              <h1 className=" font-[Bebas_Neue] text-3xl text-center  tracking-wide text-[#F5F1E8]">
                {debouncedSearchTerm ? "Results" : "All Movies"}
              </h1>
              {debouncedSearchTerm && (
                <span className="text-center font-mono text-xs uppercase tracking-widest text-[#8B8378]">
                  "{debouncedSearchTerm}"
                </span>
              )}
            </div>

            <div className="mt-5">
              {isLoading ? (
                <SkeletonGrid count={10} />
              ) : errorMessage ? (
                <ErrorMessage
                  errorMessage={errorMessage}
                  isSearchError={isSearchError}
                />
              ) : movies.length === 0 ? (
                <p className="mt-8 text-center text-gray-400">
                  No movies available
                </p>
              ) : (
                <>
                  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
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

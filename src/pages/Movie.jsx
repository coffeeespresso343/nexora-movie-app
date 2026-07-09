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
import TrendingCard from "../components/TrendingCard";

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
  const [isTVFallback, setIsTVFallback] = useState(false);

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

  //  Debounce search input - reset to page 1 on new query
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

  // Fetch movies - /search/movie for queries, /discover/movie for browse.
  // If a search returns no movies results, silently retries with /search/tv
  // and flags isTVFallback so the UI can explain what happened
  useEffect(() => {
    let ignore = false;

    const fetchMovies = async (query, pageNum) => {
      setIsLoading(true);
      setErrorMessage("");
      setIsSearchError(false);
      setIsTVFallback(false);

      try {
        const endPoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${pageNum}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${pageNum}`;

        const response = await fetch(endPoint, API_OPTIONS);

        if (!response.ok) {
          throw new Error("Failed to fetch movies.");
        }

        const data = await response.json();

        if (ignore) return;

        // No movie results - retry with TV search if there is a query
        if ((!data.results || data.results.length === 0) && query) {
          const tvResponse = await fetch(
            `${API_BASE_URL}/search/tv?query=${encodeURIComponent(query)}&page=${pageNum}`,
            API_OPTIONS,
          );

          if (!tvResponse.ok) throw new Error("Failed to fetch series.");

          const tvData = await tvResponse.json();

          if (ignore) return;

          if (!tvData.results || tvData.results.length === 0) {
            setMovies([]);
            setTotalPages(1);
            setIsSearchError(true);
            setErrorMessage(
              query ? `No results found for "${query}"` : "No result found",
            );
            return;
          }

          // Add media type, so that TrendingCard knows how to render and route there
          const tvResults = tvData.results.map((item) => ({
            ...item,
            media_type: "tv",
          }));

          setMovies(tvResults);
          setTotalPages(Math.min(tvData.total_pages || 1, MAX_TMDB_PAGES));
          setIsTVFallback(true);
          return;
        }

        if (!data.results || data.results.length === 0) {
          setMovies([]);
          setTotalPages(1);
          setIsSearchError(true);
          setErrorMessage(
            query ? `No results found for "${query}"` : "No movies available",
          );
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
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchMovies(debouncedSearchTerm, page);

    return () => (ignore = true);
  }, [debouncedSearchTerm, page]);

  // Focus search bar when navigated here via the navbar search button
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

  // Scroll results into view when a new search completes
  useEffect(() => {
    if (!debouncedSearchTerm.trim()) return;

    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    window.history.replaceState({}, document.title);
  }, [debouncedSearchTerm]);

  // Scroll into grid on pagination
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
              <h2 className="text-xl text-center font-bold text-white">
                {debouncedSearchTerm ? (
                  <>
                    Result for{" "}
                    <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      "{debouncedSearchTerm}"
                    </span>
                  </>
                ) : (
                  "All Movies"
                )}
              </h2>
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
                  {isTVFallback && (
                    <div className="mb-6 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-sm text-amber-300">
                      No movies match with "{debouncedSearchTerm}" - showing
                      series results instead.
                    </div>
                  )}
                  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                    {movies.map((movie) => (
                      <li key={movie.id} className="list-none">
                        {isTVFallback ? (
                          <TrendingCard item={movie} />
                        ) : (
                          <MovieCard movie={movie} />
                        )}
                      </li>
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

import React, { useEffect, useRef, useState } from "react";
import SeriesCard from "../components/SeriesCard";
import { useDebounce } from "react-use";
import Search from "../components/Search";
import SkeletonGrid from "../components/SkeletonGrid";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";
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

const Series = () => {
  const [seriesList, setSeriesList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const location = useLocation();

  const seriesRef = useRef(null);
  const searchRef = useRef(null);
  const resultRef = useRef(null);
  const isFirstLoad = useRef(true);
  const isUserPaginating = useRef(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm]);

  const handlePageChange = (newPage) => {
    isUserPaginating.current = true;
    setPage(newPage);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) return;

    setPage(1);

    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    window.history.replaceState({}, document.title);
  }, [debouncedSearchTerm]);

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
    let ignore = false;

    const fetchSeries = async (query, pageNum) => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const endPoint = query
          ? `${API_BASE_URL}/search/tv?query=${encodeURIComponent(query)}&page=${pageNum}`
          : `${API_BASE_URL}/discover/tv?sort_by=popularity.desc&page=${pageNum}`;

        const response = await fetch(endPoint, API_OPTIONS);

        if (!response.ok) throw new Error("Error fetching series.");

        const data = await response.json();

        if (ignore) return;

        if (!data.results || data.results.length === 0) {
          setSeriesList([]);
          setTotalPages(1);
          setErrorMessage(`No series found for "${query}"`);
          return;
        }

        setSeriesList(data.results);
        setTotalPages(Math.min(data.total_pages || 1, MAX_TMDB_PAGES));
      } catch (error) {
        console.error(error);
        if (!ignore) {
          setErrorMessage("Error fetching series. Please try again.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchSeries(debouncedSearchTerm, page);

    return () => {
      ignore = true;
    };
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (!isUserPaginating.current) return;

    seriesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    isUserPaginating.current = false;
  }, [page]);

  return (
    <div className="mt-16 min-h-screen bg-black  text-white">
      <section className="relative flex h-[50vh] min-h-60 w-full items-center overflow-hidden ">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.35), transparent 75%), radial-gradient(circle at 80% 70%, rgba(236,72,153,0.3), transparent 75%), #000",
          }}
        />
        <svg
          className="absolute inset-x-0 bottom-0 h-10 w-full opacity-20"
          viewBox="0 0 800 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <rect
              key={i}
              x={i * 20 + 6}
              y="14"
              width="8"
              height="12"
              rx="2"
              fill="white"
            />
          ))}
        </svg>

        <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-black/40"></div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <h1 className=" text-4xl text-center font-bold md:text-5xl">
            Browse by{" "}
            <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Series
            </span>
          </h1>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchRef={searchRef}
            placeholder="Search through thousands of series..."
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-10">
        <section ref={seriesRef} className="mt-10 scroll-mt-24">
          <div
            ref={resultRef}
            className="flex flex-col border-b border-[#8B8378]/20 pb-2"
          >
            <h1 className="font-[Bebas_Neue] text-3xl text-center  tracking-wide text-[#F5F1E8]">
              {debouncedSearchTerm ? "Results" : "All Series"}
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
              <ErrorMessage errorMessage={errorMessage} />
            ) : seriesList.length === 0 ? (
              <p className="mt-4 text-gray-400">No series available</p>
            ) : (
              <>
                <ul className="grid grid-cols-2 gap-2 md:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {seriesList.map((series) => (
                    <SeriesCard key={series.id} series={series} />
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
export default Series;

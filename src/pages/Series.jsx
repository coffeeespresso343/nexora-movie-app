import React, { useEffect, useRef, useState } from "react";
import SeriesCard from "../components/SeriesCard";
import { useDebounce } from "react-use";
import Search from "../components/Search";
import SkeletonGrid from "../components/SkeletonGrid";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";

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

  const seriesRef = useRef(null);
  const isFirstLoad = useRef(true);
  const isUserPaginating = useRef(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm]);

  const handlePageChange = (newPage) => {
    isUserPaginating.current = true;
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

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

  (useEffect(() => {
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
  }),
    [page]);

  return (
    <div className="min-h-screen bg-black pt-28 text-white">
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <h1 className="text-3xl font-bold text-white">
          Browse{" "}
          <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Series
          </span>
        </h1>

        <div className="mt-8">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <section ref={seriesRef} className="mt-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-white">
            {debouncedSearchTerm ? (
              <>
                Results for{" "}
                <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  "{debouncedSearchTerm}"
                </span>
              </>
            ) : (
              "All Series"
            )}
          </h2>

          <div className="mt-8">
            {isLoading ? (
              <SkeletonGrid count={8} />
            ) : errorMessage ? (
              <ErrorMessage errorMessage={errorMessage} />
            ) : seriesList.length === 0 ? (
              <p className="mt-4 text-gray-400">No series available</p>
            ) : (
              <>
                <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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

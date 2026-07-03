import { useState, useRef, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "../components/Search";
import TrendingCard from "../components/TrendingCard";
import Pagination from "../components/Pagination";
import ErrorMessage from "../components/ErrorMessage";
import SkeletonGrid from "../components/SkeletonGrid";
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

const NewAndPopular = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const gridRef = useRef(null);
  const isFirstLoad = useRef(true);
  const isUserPaginating = useRef(false);
  const searchRef = useRef(null);

  const location = useLocation();

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
    setPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    let ignore = false;

    const fetchItems = async (query, pageNum) => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const endpoint = query
          ? `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
              query,
            )}&page=${pageNum}`
          : `https://api.themoviedb.org/3/trending/all/week?page=${pageNum}`;

        const response = await fetch(endpoint, API_OPTIONS);
        if (!response.ok) {
          throw new Error("Failed to fetch movies and series.");
        }

        const data = await response.json();

        if (ignore) return;

        const filtered = (data.results || []).filter(
          (item) => item.media_type === "movie" || item.media_type === "tv",
        );

        if (filtered.length === 0) {
          setItems([]);
          setTotalPages(1);
          setErrorMessage(
            query
              ? `No results found for "${query}"`
              : "No trending content available at the moment.",
          );
          return;
        }

        setItems(filtered);
        setTotalPages(Math.min(data.total_pages, MAX_TMDB_PAGES));
      } catch (error) {
        console.error(error);
        if (!ignore) {
          setErrorMessage("Error loading movies and series.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchItems(debouncedSearchTerm, page);

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

    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  return (
    <div className="min-h-screen bg-black pt-28 text-white">
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl text-center font-bold">
            New &{" "}
            <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Popular
            </span>
          </h1>
          <p className="text-center">
            Discover the latest and most popular movies and TV shows. Stay up to
            date with the hottest releases and trending content in the
            entertainment world.
          </p>
        </div>

        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchRef={searchRef}
        />

        <section ref={gridRef} className="mt-10 scroll-mt-24">
          <h2 className="text-xl font-bold text-white">
            {debouncedSearchTerm ? (
              <>
                Result for{" "}
                <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  "{debouncedSearchTerm}"
                </span>
              </>
            ) : (
              "Trending This Week"
            )}
          </h2>

          <div className="mt-8">
            {isLoading ? (
              <SkeletonGrid count={12} />
            ) : errorMessage ? (
              <ErrorMessage errorMessage={errorMessage} />
            ) : (
              <>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                  {items.map((item) => (
                    <TrendingCard key={item.id} item={item} />
                  ))}
                </ul>

                <div>
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

export default NewAndPopular;

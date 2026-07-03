import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieRow from "../components/MovieRow";
import TrendingMovies from "../components/TrendingMovies";
import ErrorMessage from "../components/ErrorMessage";

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
  const [showTrendingMovies, setShowTrendingMovies] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rowData, setRowData] = useState(() =>
    Object.fromEntries(
      ROWS.map((r) => [r.endpoint, { movies: [], isLoading: true }]),
    ),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let ignore = false;

    setErrorMessage("");
    setShowTrendingMovies(true);

    ROWS.forEach(({ endpoint }) => {
      const fetchRow = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}${endpoint}?page=1`,
            API_OPTIONS,
          );

          if (!response.ok) {
            if (!ignore) {
              setErrorMessage("Failed to load movies.");
            }
            setRowData((prev) => ({
              ...prev,
              [endpoint]: { movies: [], isLoading: false },
            }));
            return;
          }

          const data = await response.json();

          if (ignore) return;

          setRowData((prev) => ({
            ...prev,
            [endpoint]: { movies: data.results || [], isLoading: false },
          }));
        } catch (error) {
          console.error(error);
          if (!ignore) {
            setRowData((prev) => ({
              ...prev,
              [endpoint]: { movies: [], isLoading: false },
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
      <div className="mx-auto max-w-7xl px-6">
        {showTrendingMovies && <TrendingMovies />}

        {errorMessage ? (
          <ErrorMessage errorMessage={errorMessage} isSearchError={false} />
        ) : (
          ROWS.map(({ title, endpoint, seeAllPath }) => (
            <MovieRow
              key={endpoint}
              title={title}
              movies={rowData[endpoint].movies}
              isLoading={rowData[endpoint].isLoading}
              seeAllPath={seeAllPath}
            />
          ))
        )}
        <div className="mt-10 flex items-center justify-center">
          <Link
            to="/movie"
            className="flex items-center gap-1 font-medium text-gray-400  hover:text-purple-400 transition-colors duration-300"
          >
            Browse All Movies
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 5H19V11" />
              <path d="M19 5L5 19" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

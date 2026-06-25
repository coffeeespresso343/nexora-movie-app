import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import Movies from "./Movie";
import Series from "./Series";
import { getTrendingMovies } from "../appwrite";
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rowData, setRowData] = useState(() =>
    Object.fromEntries(
      ROWS.map((r) => [r.endpoint, { movies: [], isLoadig: true }]),
    ),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let ignore = false;
    setShowTrendingMovies(true);
    setErrorMessage("");

    ROWS.forEach(({ endpoint }) => {
      const fetchRow = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}${endpoint}?page=1`,
            API_OPTIONS,
          );

          if (!response.ok) {
            setErrorMessage(`Failed to fetch ${endpoint}`);
            return;
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
      <div className="mx-auto max-w-7xl px-6 pb-20">
        {showTrendingMovies && <TrendingMovies />}

        {errorMessage ? (
          <ErrorMessage errorMessage={errorMessage} />
        ) : (
          ROWS.map(({ title, endpoint, seeAllPath }) => (
            <MovieRow
              key={endpoint}
              title={title}
              movies={rowData[endpoint].movies}
              isLoading={rowData[endpoint].isLoadig}
              seeAllPath={seeAllPath}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

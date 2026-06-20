import React, { useEffect, useRef, useState } from "react";
import SkeletonGrid from "../components/SkeletonGrid";
import Error from "../components/Error";
import MovieCard from "../components/MovieCard";
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

const Movies = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const isUserPaginating = useRef(false);
  const movieRef = useRef();

  const fetchMovies = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const endPoint = `${API_BASE_URL}/discover/movie?page=${page}`;

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
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const hadlePageChange = (newPage) => {
    isUserPaginating.current = true;
    setPage(newPage);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  useEffect(() => {
    movieRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page]);

  return (
    <>
      <div className="pattern"></div>
      <div className="wrapper">
        <section ref={movieRef} className="all-movies mt-10 scroll-mt-20">
          <div className="flex flex-col items-start mt-0 mb-0">
            <h1 className="text-xl ml-0">Movies</h1>
          </div>

          {isLoading ? (
            <SkeletonGrid />
          ) : errorMessage ? (
            <Error errorMessage={errorMessage} />
          ) : movies.length === 0 ? (
            <p className="text-gray-400 mt-4">No movies available!</p>
          ) : (
            <>
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={hadlePageChange}
              />
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Movies;

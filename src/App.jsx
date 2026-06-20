import { useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Error from "./components/Error";
import { getTrendingMovies, updateSearchCount } from "./appwrite";
import Footer from "./components/Footer";
import SkeletonGrid from "./components/SkeletonGrid";
import Pagination from "./components/Pagination";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const moviesRef = useRef(null);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "", pageNum = 1) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${pageNum}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${pageNum}`;

      const response = await fetch(endPoint, API_OPTIONS);

      if (!response.ok) {
        setErrorMessage(data.Error || "Failed to fetch movies.");
        throw new Error("Error fetching movies.");
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setMovieList([]);
        setErrorMessage(`No movies found for "${query}"`);

        return;
      }

      setMovieList(data.results || []);
      setTotalPages(data.total_pages);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error fetching movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
      // setErrorMessage("Error fetching trending movies. Please try again later");
    }
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm, page);
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    if (moviesRef) {
      moviesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [page]);

  return (
    <main>
      <Navbar />
      <Hero />

      <div className="pattern" />
      <div className="wrapper">
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-100"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section ref={moviesRef} className="all-movies scroll-mt-20">
          <div className="flex flex-col items-start mt-0 mb-0">
            <h1 className="text-xl ml-0">All movies</h1>
          </div>

          {isLoading ? (
            <>
              {/* <Spinner /> */}
              <SkeletonGrid count={8} />
            </>
          ) : errorMessage ? (
            <Error errorMessage={errorMessage} />
          ) : movieList.length === 0 ? (
            <p className="text-gray-400 mt-4">No movies available!</p>
          ) : (
            <>
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>

              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}

export default App;

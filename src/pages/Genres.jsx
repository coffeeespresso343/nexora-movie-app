import { useEffect, useRef, useState } from "react";
import SkeletonGrid from "../components/SkeletonGrid";
import ErrorMessage from "../components/ErrorMessage";
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

const MAX_TMDB_PAGES = 500;

const Genres = () => {
  const [genres, setGeneres] = useState([]);
  const [genresError, setGenresError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const isUserPaginating = useRef(false);
  const isFirstLoad = useRef(true);
  const moviesRef = useRef(null);

  const handlePageChange = (newPage) => {
    isUserPaginating.current = true;
    setPage(newPage);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);

    setPage(1);

    moviesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchGenres = async () => {
      const endPoint = `${API_BASE_URL}/genre/movie/list`;

      try {
        const response = await fetch(endPoint, API_OPTIONS);

        if (!response.ok) throw new Error("Failed to load genres.");

        const data = await response.json();

        if (ignore) return;

        setGeneres(data.genres || []);
      } catch (error) {
        console.error(error);
        if (!ignore) {
          setGenresError("Couldn't load genres.");
          return;
        }
      }
    };

    fetchGenres();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedGenre) return;

    let ignore = false;

    const fetchMovieByGenre = async (genreId, pageNum) => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const endPoint = `${API_BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${pageNum}`;

        const response = await fetch(endPoint, API_OPTIONS);

        if (!response.ok) {
          throw new Error("Error loading movies.");
        }

        const data = await response.json();

        if (ignore) return;

        if (!data.results || data.results.length === 0) {
          setMovieList([]);
          setTotalPages(1);
          setErrorMessage(`No movie found for "${selectedGenre.name}"`);
          return;
        }

        setMovieList(data.results);
        setTotalPages(Math.min(data.total_pages || 1, MAX_TMDB_PAGES));
      } catch (error) {
        console.error(error);
        if (!ignore) setErrorMessage("Error fetching movies.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchMovieByGenre(selectedGenre.id, page);

    return () => {
      ignore = true;
    };
  }, [selectedGenre, page]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (!isUserPaginating.current) return;

    moviesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    isUserPaginating.current = false;
  }, [page]);

  return (
    <div className="min-h-screen bg-black mt-12 text-white">
      <section className="relative flex h-[60vh] min-h-70 w-full items-center overflow-hidden pt-1.5">
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
          <h1 className="text-4xl text-center font-bold md:text-5xl">
            Browse by{" "}
            <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Genre
            </span>
          </h1>

          <div className="mt-8">
            {genresError ? (
              <ErrorMessage errorMessage={genresError} />
            ) : (
              <div className="flex flex-wrap gap-3">
                {genres.map((genre) => {
                  const isActive = selectedGenre?.id === genre.id;
                  return (
                    <button
                      key={genre.id}
                      type="button"
                      onClick={() => {
                        handleGenreSelect(genre);
                      }}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 cursor-pointer  ${
                        isActive
                          ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/30"
                          : "border border-white/15 text-gray-300 hover:border-purple-500/40 hover:text-white"
                      }`}
                    >
                      {genre.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className=" mx-auto  max-w-7xl px-6 pb-20">
        <section ref={moviesRef} className="mt-10 scroll-mt-24">
          {selectedGenre ? (
            <>
              <h2 className="text-2xl font-bold text-white">
                <span className="font-[Bebas_Neue] tracking-wider bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {selectedGenre.name}{" "}
                </span>
                Movies
              </h2>

              <div className="mt-8">
                {isLoading ? (
                  <SkeletonGrid count={8} />
                ) : errorMessage ? (
                  <ErrorMessage errorMessage={errorMessage} />
                ) : movieList.length === 0 ? (
                  <p className="mt-4 text-gray-400">No movie available!</p>
                ) : (
                  <>
                    <ul className="grid grid-cols-2 gap-2 md:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {movieList.map((movie) => (
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
            </>
          ) : (
            <p className="mt-4 text-gray-400 text-center">
              Pick a genre above to see what's available
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Genres;

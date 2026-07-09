import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
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

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  const [isTrailerLoading, setIsTrailerLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [detailErrorMsg, setDetailErrorMsg] = useState("");

  const navigate = useNavigate();

  const closeTrailer = () => {
    setShowTrailer(false);
    setIsTrailerLoading(false);
  };

  useEffect(() => {
    if (!showTrailer) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeTrailer();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showTrailer]);

  useEffect(() => {
    let ignore = false;

    const fetchMovie = async () => {
      setIsLoading(true);
      setDetailErrorMsg("");

      // Reset stale state from any previously viewed movie
      setMovie(null);
      setTrailer(null);
      setCast([]);
      closeTrailer();

      const endPoint = `${API_BASE_URL}/movie/${id}`;

      try {
        const [movieResult, videoResult, castResult] = await Promise.all([
          fetch(`${endPoint}`, API_OPTIONS),
          fetch(`${endPoint}/videos`, API_OPTIONS),
          fetch(`${endPoint}/credits`, API_OPTIONS),
        ]);

        if (!movieResult.ok) {
          throw new Error("Failed to load movie details.");
        }

        if (!videoResult.ok) {
          throw new Error("Failed to load trailer video.");
        }

        if (!castResult.ok) {
          throw new Error("Failed to load top cast.");
        }

        const [movieData, videoData, castData] = await Promise.all([
          movieResult.json(),
          videoResult.json(),
          castResult.json(),
        ]);

        if (ignore) return;

        setMovie(movieData);

        const trailerVideo = videoData.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube",
        );
        setTrailer(trailerVideo ?? null);

        setCast(castData.cast?.slice(0, 10) ?? []); // Top 10 cast
      } catch (error) {
        console.error(error);
        if (!ignore) {
          setDetailErrorMsg(error.message || "Something went wrong.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchMovie();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (!movie)
    return (
      <div className="mt-50">
        {isLoading && <Spinner />}
        {detailErrorMsg && <ErrorMessage errorMessage={detailErrorMsg} />}
      </div>
    );

  return (
    <>
      <div className="relative text-white mt-14">
        <div
          className="relative w-full min-h-screen bg-cover bg-center pt-10 pb-10"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          }}
        >
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="absolute  top-6 left-6 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

          <div
            className="relative flex flex-col md:flex-row sm:flex-row gap-8 items-center 
          md:items-end px-6 md:px-10 pt-5 md:absolute md:bottom-20 md:left-10 md:right-10"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-40 sm:w-48 md:w-56 rounded-lg shadow-lg"
            />

            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold ">{movie.title}</h1>

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-300">
                <span className="flex items-center gap-1 bg-white/10 rounded-2xl px-2 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="gold"
                    stroke="gold"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>{" "}
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>

                <span>●</span>

                <span className="bg-white/10 rounded-2xl px-2 py-1">
                  {movie.release_date?.split("-")[0] ?? "N/A"}
                </span>

                <span>●</span>

                <span className="bg-white/10 rounded-2xl px-2 py-1">
                  {movie.original_language?.toUpperCase() ?? "N/A"}
                </span>
              </div>

              <p className="mt-4 text-gray-300 leading-relaxed">
                {movie.overview}
              </p>

              <div className="flex flex-wrap gap-2 mt-4 text-sm">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="text-sm mr-2 border px-2 py-1 rounded-full border-white/10 bg-white/10"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {trailer && (
                <button
                  type="button"
                  onClick={() => {
                    (setIsTrailerLoading(true), setShowTrailer(true));
                  }}
                  className="flex items-center gap-2 mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/200/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                  Play Trailer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div
          onClick={closeTrailer}
          className="mt-14 fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div
            className="relative w-[90%] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeTrailer}
              className="absolute -top-10 right-0 text-white text-xl cursor-pointer"
            >
              ✕
            </button>

            <div className="aspect-video relative">
              {isTrailerLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black rounded-lg">
                  <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <iframe
                className="w-full h-60 md:h-112 rounded-lg"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
                onLoad={() => setIsTrailerLoading(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Top 10 casts */}
      <div className="px-6 md:px-12 py-10">
        <h2 className="text-2xl text-white font-bold mb-6">Top Cast</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
          {cast.length === 0 ? (
            <p className="text-gray-400 text-sm col-span-full text-center">
              No cast information available.
            </p>
          ) : (
            cast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w300/${actor.profile_path}`
                      : "/no-profile.png"
                  }
                  alt={actor.name}
                  className="w-full h-62.5 object-cover rounded-lg"
                />

                <p className="mt-2 font-semibold text-gray-400">{actor.name}</p>
                <p className="text-sm text-gray-400">{actor.character}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
export default MovieDetails;

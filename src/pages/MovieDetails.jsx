import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  const [isLoading, setIsLoading] = useState(false);
  const [detailErrorMsg, setDetailErrorMsg] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchMovie = async () => {
      setIsLoading(true);
      setDetailErrorMsg("");

      // Reset stale state from any previously viewed movie
      setMovie(null);
      setTrailer(null);
      setCast([]);
      setShowTrailer(false);

      const endPoint = `${API_BASE_URL}/movie/${id}`;

      try {
        const [movieResult, videoResult, castResult] = await Promise.all([
          fetch(`${endPoint}`, API_OPTIONS),
          fetch(`${endPoint}/videos`, API_OPTIONS),
          fetch(`${endPoint}/credits`, API_OPTIONS),
        ]);

        if (!movieResult.ok || !videoResult.ok || !castResult.ok) {
          throw new Error("Failed to load movie details.");
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
      <div className="text-white mt-16">
        <div
          className="relative w-full h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent"></div>

          <div className="absolute bottom-30 left-10 right-10 flex flex-col md:flex-row gap-8 items-end">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.name}
              className="w-48 rounded-lg shadow-lg"
            />

            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold">{movie.name}</h1>

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-300">
                <span className="flex items-center gap-1 bg-white/10 rounded-2xl px-2 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
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
                  onClick={() => setShowTrailer(true)}
                  className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition cursor-pointer"
                >
                  ▶ Play Trailer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-[90%] md:w-200">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-xl cursor-pointer"
            >
              ✕
            </button>

            <iframe
              className="w-full h-112.5 rounded-lg"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Top 10 casts */}
      <div className="px-6 md:px-12 py-10">
        <h2 className="text-2xl font-bold mb-6">Top Cast</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {cast.map((actor) => (
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
              <p className="text-sm text-gray-400">({actor.character})</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;

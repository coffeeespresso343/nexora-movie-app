import React from "react";
import Spinner from "./Spinner";

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="movie-card transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-100">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <h3>⭐</h3>
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>●</span>
          <p className="lang">{original_language}</p>
          <span>●</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

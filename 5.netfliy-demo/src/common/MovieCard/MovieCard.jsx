import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { data: genreData } = useMovieGenreQuery();

  const goToDetail = () => {
    navigate(`/movies/${movie.id}`);
  };

  const showGenreNames = (genreIdList) => {
    if (!Array.isArray(genreIdList) || !genreData) return [];

    return genreIdList
      .map((id) => {
        const genreObj = genreData.find((genre) => genre.id === id);
        return genreObj ? genreObj.name : null;
      })
      .filter(Boolean);
  };

  const formatPopularity = (popularity) => {
    return popularity >= 1000
      ? (popularity / 1000).toFixed(1) + "K+"
      : Math.round(popularity);
  };

  const getPopularityLabel = (popularity) => {
    if (popularity >= 2000) return "🔥 Mega Hit";
    if (popularity >= 1000) return "⭐ Blockbuster";
    if (popularity >= 300) return "🎬 Popular";
    if (popularity >= 50) return "📺 Moderate";
    return "🫥 Hidden Gem";
  };

  const posterUrl = movie.poster_path
    ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
    : "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=600&h=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";

  return (
    <div className="movie-card-container">
      <div
        className="movie-card"
        onClick={goToDetail}
        style={{ backgroundImage: `url(${posterUrl})` }}
      >
        {!movie.poster_path && (
          <div className="no-image-text">
            No image...
            <br />
            <div>Title: {movie.title}</div>
          </div>
        )}

        <div className="overlay">
          <h4 className="overlay-title">{movie.title}</h4>

          {showGenreNames(movie.genre_ids).slice(0, 3).map((name, idx) => (
            <Badge key={idx} bg="danger" className="custom-overlay-badge-id badge-group">
              {name}
            </Badge>
          ))}

          <div className="mt-2">
            <div>
              <Badge
                bg="warning"
                text="light"
                className="custom-overlay-badge-rating badge-group"
              >
                TMDB
              </Badge>{" "}
              {movie.vote_average?.toFixed(1)}
            </div>

            <div>
              <FontAwesomeIcon icon={faUsers} />{" "}
              {formatPopularity(movie.popularity)} ({getPopularityLabel(movie.popularity)})
            </div>

            <div className={`custom-overlay-${movie.adult ? "over18" : "under18"}`}>
              {movie.adult ? "Adult" : "Under 18"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

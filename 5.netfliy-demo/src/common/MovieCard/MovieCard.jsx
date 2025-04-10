import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card-container">
      <div
        style={{
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
            ")",
        }}
        className="movie-card"
      >
        <div className="overlay">
          <h4>{movie.title}</h4>
          {movie.genre_ids.map((id) => (
            <Badge key={id} bg="danger" className="custom-overlay-badge-id">
              {id}
            </Badge>
          ))}
          <div>
            <div>
              <Badge
                bg="warning"
                text="light"
                className="custom-overlay-badge-rating"
              >
                {" "}
                TDMB
              </Badge>{" "}
              {movie.vote_average}
            </div>
            <div>
              <FontAwesomeIcon icon={faUsers} /> {movie.popularity}
            </div>
            <div
              className={`custom-overlay-${movie.adult ? "over18" : "under18"}`}
            >
              {movie.adult ? "Adult" : "Under 18"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

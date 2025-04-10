import React from "react";
import "./MovieSlider.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieSlider.style.css"

const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <div className="carousel-wrapper">
      <h3 className="carousel-title">{title}</h3>
      <Carousel
        infinite={true}
        // centerMode={true}
        itemClass="movie-slider"
        containerClass="carousel-container"
        responsive={responsive}
        partialVisible={false}
      >
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;

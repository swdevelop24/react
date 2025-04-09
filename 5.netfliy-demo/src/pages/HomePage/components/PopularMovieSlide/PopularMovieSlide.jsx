import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PopularMovieSlide.style.css";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading... </h1>;
  }
  if (isError) {
    return <Alert>{error.message}</Alert>;
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="carousel-wrapper">
      <h3>Popular Movies</h3>
      <Carousel
        infinite={true}
        // centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
        partialVisible={false}
      >
        {data?.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default PopularMovieSlide;

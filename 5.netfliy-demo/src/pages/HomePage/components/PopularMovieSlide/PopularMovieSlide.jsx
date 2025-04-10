import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading... </h1>;
  }
  if (isError) {
    return <Alert>{error.message}</Alert>;
  }

  return (
    <MovieSlider
      title="Popular Movies"
      movies={data.results}
      responsive={responsive}
    />
  );
};

export default PopularMovieSlide;

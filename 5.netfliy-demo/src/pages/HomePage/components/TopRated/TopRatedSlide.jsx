import React from "react";
import { useTopMoviesQuery } from "../../../../hooks/useTopMovies";
import { Alert } from "bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopRatedSlide = () => {
  const { data, isLoading, isError, error } = useTopMoviesQuery();

  if (isLoading) {
    return <h1>Loading... </h1>;
  }
  if (isError) {
    return <Alert>{error.message}</Alert>;
  }

  return (
    <MovieSlider
      title="Top Movies"
      movies={data.results}
      responsive={responsive}
    />
  );
};

export default TopRatedSlide;

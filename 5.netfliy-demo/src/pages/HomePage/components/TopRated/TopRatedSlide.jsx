import React from "react";
import { useTopMoviesQuery } from "../../../../hooks/useTopMovies";
import { Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopRatedSlide = () => {
  const { data, isLoading, isError, error } = useTopMoviesQuery();

  // if (isLoading) {
  //   return <h1>Loading... </h1>;
  // }
  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="light"
          style={{width:"5rem", height:"5rem" }}
        />
      </div>
    )
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

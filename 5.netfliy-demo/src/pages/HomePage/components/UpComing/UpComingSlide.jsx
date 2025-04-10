import React from "react";
import { useUpComingQuery } from "../../../../hooks/useUpComing";
import { Alert } from "bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";



const UpComingSlide = () => {
  const { data, isLoading, isError, error } = useUpComingQuery();

  if (isLoading) {
    return <h1>Loading... </h1>;
  }
  if (isError) {
    return <Alert>{error.message}</Alert>;
  }

  return (
    <MovieSlider
    title="Upcoming Movies"
    movies={data.results}
    responsive={responsive}
  />
  );
};

export default UpComingSlide;

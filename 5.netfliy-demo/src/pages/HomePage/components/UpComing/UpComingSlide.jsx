import React from "react";
import { useUpComingQuery } from "../../../../hooks/useUpComing";
import { Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpComingSlide = () => {
  const { data, isLoading, isError, error } = useUpComingQuery();

  // if (isLoading) {
  //   return <h1>Loading... </h1>;
  // }
  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="light"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
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

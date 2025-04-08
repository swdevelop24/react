import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log(data);
  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (isError) {
    return <Alert variant="danger"> {error.message} </Alert>;
  }
  if (!data?.results?.[0]?.backdrop_path) {
    return <h1>No image available</h1>;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1280${data?.results[0].backdrop_path})`,
      }}
    >
      <div className="text-white banner-text-area">
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;

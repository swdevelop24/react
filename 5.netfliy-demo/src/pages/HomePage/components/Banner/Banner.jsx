import React, { useState } from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { useMovieTrailerQuery } from "../../../../hooks/useMovieTrailer";

import { Alert, Spinner, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log(data);
  // if (isLoading) {
  //   return <h1>Loading....</h1>;
  // }

  const movieId = data?.results[0]?.id;
  const {
    data: videos,
    isLoading: isVideoLoading,
    isError: isVideoError,
    error: videoError,
  } = useMovieTrailerQuery(movieId);

  console.log("trailer_data", videos);

  const [showModal, setShowModal] = useState(false);
  const [videoKey, setVideoKey] = useState("");

  const openModal = (key) => {
    setVideoKey(key);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoKey("");
  };

  const trailer = videos?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const teaser = videos?.find(
    (v) => v.type === "Teaser" && v.site === "YouTube"
  );
  const featurette = videos?.find(
    (v) => v.type === "Featurette" && v.site === "YouTube"
  );

  if (isLoading || isVideoLoading) {
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
    return <Alert variant="danger"> {error.message} </Alert>;
  }

  if (isVideoError) {
    return <Alert variant="danger"> {videoError.message} </Alert>;
  }
  if (!data?.results?.[0]?.backdrop_path) {
    return <h1>No image available</h1>;
  }

  return (
    <div
      className="banner banner-animated-background"
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1280${data?.results[0].backdrop_path})`,
      }}
    >
      <div className="text-white banner-text-area">
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
        {/* 버튼 조건별 렌더링 */}
        {trailer && (
          <Button
            className="me-2"
            variant="danger"
            onClick={() => openModal(trailer.key)}
          >
            🎞 예고편 보기
          </Button>
        )}
        {!trailer && teaser && (
          <Button
            className="me-2"
            variant="secondary"
            onClick={() => openModal(teaser.key)}
          >
            🔥 티저 보기
          </Button>
        )}
        {!trailer && !teaser && featurette && (
          <Button variant="warning" onClick={() => openModal(featurette.key)}>
            🎬 제작기 보기
          </Button>
        )}
        {!trailer && !teaser && !featurette && (
          <div className="mt-3 text-light">관련 영상이 없습니다.</div>
        )}
      </div>
      {/* 영상 모달 */}
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{data?.results[0]?.title} : 영상 감상중❤️ </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="YouTube trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Banner;

{
  /* <div className="banner-video-container">
  <video autoPlay muted loop className="banner-video">
    <source src="https://www.w3schools.com/howto/rain.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="banner-overlay">
    <h1>{data?.results[0].title}</h1>
    <p>{data?.results[0].overview}</p>
  </div>
</div> */
}

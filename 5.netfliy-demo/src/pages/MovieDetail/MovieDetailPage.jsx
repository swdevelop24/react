import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useMovieTrailerQuery } from "../../hooks/useMovieTrailer";
import NotFoundPage from "../NotFound/NotFoundPage";

import {
  Spinner,
  Container,
  Row,
  Col,
  Badge,
  Modal,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  const { id } = useParams();

  if (!/^\d+$/.test(id)) {
    return <NotFoundPage />;
  }

  const { data, isLoading, isError, error } = useMovieDetailQuery(id);
  const {
    data: trailerData,
    isLoading: trailerIsLoading,
    isError: trailerIsError,
    error: trailerError,
  } = useMovieTrailerQuery(id);

  const [showModal, setShowModal] = useState(false);
  const [videoKey, setVideoKey] = useState("");

  if (isLoading || trailerIsLoading) {
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

  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (trailerIsError)
    return <Alert variant="danger">{trailerError.message}</Alert>;

  const { title, poster_path, genres, budget, release_date, overview } = data;

  const trailer = trailerData?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const teaser = trailerData?.find(
    (v) => v.type === "Teaser" && v.site === "YouTube"
  );
  const featurette = trailerData?.find(
    (v) => v.type === "Featurette" && v.site === "YouTube"
  );
  const selectedVideo = trailer || teaser || featurette;

  const openModal = (key) => {
    setVideoKey(key);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoKey("");
  };

  return (
    <div className="movie-detail-page">
      <div className="container-first-title">
        <h2> 🎈 영화 정보 </h2>
      </div>

      <Container>
        <Row className="movie-detail-content">
          <Col xl={5} md={5} xs={12} className="poster-col">
            <img
              className="movie-poster"
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={title}
            />
          </Col>

          <Col xl={7} md={7} xs={12} className="info-col">
            <h2 className="movie-title">{title}</h2>
            <div className="genre-badges">
              {genres.map((genre) => (
                <Badge bg="danger" className="p-2" key={genre.id}>
                  {genre.name}
                </Badge>
              ))}
            </div>
            <p>
              <strong>Budget:</strong> ${budget.toLocaleString()}
            </p>
            <p>
              <strong>Release Date:</strong> {release_date}
            </p>
            <p>
              <strong>Overview:</strong> {overview}
            </p>
          </Col>
        </Row>

        {/* 트레일러 섹션 */}
        <div className="trailer-section">
          <h2>🎬 관련 영상 </h2>
          {selectedVideo ? (
            <div
              className="video-thumbnail-box"
              onClick={() => openModal(selectedVideo.key)}
            >
              <img
                className="trailer-thumbnail-img"
                src={`https://img.youtube.com/vi/${selectedVideo.key}/0.jpg`}
                alt="trailer thumbnail"
              />
            </div>
          ) : (
            <p className="no-video">관련 영상이 없습니다 😢</p>
          )}
        </div>

        {/* 모달 */}
        <Modal show={showModal} onHide={closeModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>영상 감상중 🎬</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="YouTube trailer"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
      </Container>
    </div>
  );
};

export default MovieDetailPage;

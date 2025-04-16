import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useMovieTrailerQuery } from "../../hooks/useMovieTrailer";
import { useMovieReviewQuery } from "../../hooks/useMovieReview";
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

  // 세부 정보 관련
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);

  // 트레일러 관련
  const {
    data: trailerData,
    isLoading: trailerIsLoading,
    isError: trailerIsError,
    error: trailerError,
  } = useMovieTrailerQuery(id);

  //리뷰관련
  const {
    data: reviewData,
    isLoading: reviewIsLoading,
    isError: reviewIsError,
    error: reviewError,
  } = useMovieReviewQuery(id);

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

  // 상세 클릭한 데이터 아이디 동일한지 체크 & 데이터 잘 오는지 체크
  console.log("detailid", id);
  console.log("trailerid", id);
  console.log("reviewid", id);
  console.log("detaildata", data);
  console.log("trailerdata", trailerData);
  console.log("reviewdata", reviewData);

  const {
    title,
    poster_path,
    genres,
    budget,
    release_date,
    overview,
    vote_average,
    vote_count,
  } = data;

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

  // 리뷰관련
  const topReviews = reviewData?.slice(0, 5);

  // 각 리뷰 id별로 펼침 여부 저장
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReview = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isExpanded = (id) => expandedReviews[id];
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
              <strong>Rating:</strong> ⭐ {vote_average.toFixed(1)} / 10 (
              {vote_count.toLocaleString()} votes)
            </p>
            <p>
              <strong>Budget:</strong>{" "}
              {budget === 0 ? "N/A" : `$${budget.toLocaleString()}`}
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

        <Row>
          <Col>
            {/* 리뷰 섹션 */}
            <div className="review-section">
              <h2>⚱️관련 리뷰 </h2>
            </div>
            <div className="review-container">
              {topReviews?.length > 0 ? (
                topReviews.map((review) => (
                  <div key={review.id} className="single-review">
                    <p className="review-author">
                      <strong>{review.author}</strong>
                    </p>
                    <p className="review-content">
                      {review.content.length > 300 && !isExpanded(review.id)
                        ? review.content.slice(0, 300) + "..."
                        : review.content}
                    </p>

                    {review.content.length > 300 && (
                      <button
                        className="toggle-button"
                        onClick={() => toggleReview(review.id)}
                      >
                        {isExpanded(review.id) ? "접기 ▲" : "더보기 ▼"}
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>리뷰가 없습니다.😢</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetailPage;

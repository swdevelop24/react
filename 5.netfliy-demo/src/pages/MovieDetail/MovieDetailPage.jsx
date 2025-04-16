import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import NotFoundPage from "../NotFound/NotFoundPage";

import { Spinner, Container, Row, Col, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  const { id } = useParams(); // URL의 :id 값 받아오기
  // 아이디가 숫자가 아니면 404
  if (!/^\d+$/.test(id)) {
    return <NotFoundPage />;
  }

  const { data, isLoading, isError, error } = useMovieDetailQuery(id); // id로 API 호출

  console.log("id", id);

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

  const { title, poster_path, genres, budget, release_date, overview } = data;
  return (
    <div className="movie-detail-page">
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
                <Badge bg="secondary" key={genre.id}>
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
          <h3>Trailer</h3>
          <div className="trailer-video-box">영상은 여기에...</div>
        </div>
      </Container>
    </div>
  );
};

export default MovieDetailPage;

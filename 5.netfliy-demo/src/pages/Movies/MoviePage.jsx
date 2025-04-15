// pages/Movies/MoviePage.js
import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Spinner, Alert, Container, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieCard from "../../common/MovieCard/MovieCard";
import "./MoviePage.style.css";

const MOVIES_PER_PAGE = 18;

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  const keyword = query.get("q") || "";
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState(query.get("sort") || "popularity.desc");
  const [genreFilter, setGenreFilter] = useState(query.get("genre") || "");

  useEffect(() => {
    setPage(1);
  }, [keyword, sortOption, genreFilter]);

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sortOption,
    genreFilter,
  });

  const {
    data: genres,
    isLoading: isGenreLoading,
    isError: isGenreError,
    error: genreError,
  } = useMovieGenreQuery();

  if (isLoading || isGenreLoading) {
    return (
      <div className="spinner-area">
        <Spinner animation="border" variant="light" style={{ width: "5rem", height: "5rem" }} />
      </div>
    );
  }

  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (isGenreError) return <Alert variant="danger">{genreError.message}</Alert>;

  let results = data?.results || [];

  if (keyword) {
    if (genreFilter) {
      results = results.filter((movie) =>
        movie.genre_ids.includes(Number(genreFilter))
      );
    }

    results.sort((a, b) => {
      if (sortOption === "popularity.desc") return b.popularity - a.popularity;
      if (sortOption === "popularity.asc") return a.popularity - b.popularity;
      return 0;
    });
  }

  const visibleResults = results.slice(0, MOVIES_PER_PAGE);
  const totalPageCount = Math.min(Math.ceil(data?.total_results / MOVIES_PER_PAGE), 500);
  const noResult = keyword && visibleResults.length === 0;

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoBack = () => {
    setSortOption("popularity.desc");
    setGenreFilter("");
    navigate(`/movies?q=${keyword}`);
  };

  const handleGoToMovies = () => {
    navigate("/movies");
    setQuery({});
    setSortOption("popularity.desc");
    setGenreFilter("");
  };

  return (
    <Container fluid className="px-4 px-md-5">
      {noResult ? (
        <div className="text-center text-white mt-5">
          <div className="fs-4 mb-3">검색 결과가 없습니다!</div>
          <div className="d-flex justify-content-center gap-3 mt-3">
            {keyword && (genreFilter || sortOption !== "popularity.desc") && (
              <button className="btn btn-outline-light" onClick={handleGoBack}>
                ← Go Back
              </button>
            )}
            <button className="btn btn-danger" onClick={handleGoToMovies}>
              Go to Movies
            </button>
          </div>
        </div>
      ) : (
        <Row className="gx-4 gy-4">
          <Col lg={4} xs={12}>
            <h5 className="mt-5 text-white">인기별 정렬</h5>
            <div className="d-flex gap-2 mb-3">
              <Button
                variant={sortOption === "popularity.desc" ? "danger" : "outline-light"}
                onClick={() => setSortOption("popularity.desc")}
              >
                인기 많은 순
              </Button>
              <Button
                variant={sortOption === "popularity.asc" ? "danger" : "outline-light"}
                onClick={() => setSortOption("popularity.asc")}
              >
                인기 적은 순
              </Button>
            </div>

            <h5 className="mt-5 text-white">장르별 필터</h5>
            <div className="d-flex flex-wrap gap-2">
              <Button
                variant={genreFilter === "" ? "primary" : "outline-light"}
                onClick={() => setGenreFilter("")}
              >
                전체보기
              </Button>
              {genres?.map((genre) => (
                <Button
                  key={genre.id}
                  variant={genreFilter === String(genre.id) ? "primary" : "outline-light"}
                  onClick={() => setGenreFilter(String(genre.id))}
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          </Col>

          <Col lg={8} xs={12}>
            <Row className="gx-4 gy-4">
              {visibleResults.map((movie, index) => (
                <Col key={index} lg={4} md={6} sm={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>

            {totalPageCount >= 1 && visibleResults.length > 0 && (
              <ReactPaginate
                nextLabel="next >"
                previousLabel="< prev"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPageCount}
                forcePage={page - 1}
                containerClassName="custom-pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MoviePage;
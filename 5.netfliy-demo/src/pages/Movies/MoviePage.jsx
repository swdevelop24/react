import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Spinner, Alert, Container, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieCard from "../../common/MovieCard/MovieCard";
import "./MoviePage.style.css";

const MOVIES_PER_PAGE = 18;

const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get("q");

  const [sortOption, setSortOption] = useState("popularity.desc");
  const [genreFilter, setGenreFilter] = useState("");

  // 필터, 정렬, 검색어 바뀌면 page 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword, sortOption, genreFilter]);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useSearchMovieQuery({ keyword, page, sortOption, genreFilter });

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

  // TMDb는 20개 보내주지만 우리는 18개만 보여줌
  const results = data?.results?.slice(0, MOVIES_PER_PAGE) || [];

  // 페이지 수 계산 (total_results 기준)
  const totalPageCount = Math.ceil(data?.total_results / MOVIES_PER_PAGE);

  const noResult = keyword && results.length === 0;

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 스크롤 맨 위로
  };

  return (
    <Container fluid className="px-4 px-md-5">
      <Row className="gx-4 gy-4">
        <Col lg={4} xs={12}>

        <div className="d-flex gap-2 mb-3">
          <Button 
            variant={sortOption === "popularity.desc" ? "danger" : "outline-light"}
            onClick={() => setSortOption("popularity.desc")
            }
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
          <h5 className="mt-4">장르별 필터</h5>
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
          {noResult ? (
            <div className="text-white mt-5">
              <div className="fs-4 mb-3">검색 결과가 없습니다!!</div>
              <button className="btn btn-outline-light" onClick={() => window.history.back()}>
                ← Go Back
              </button>
            </div>
          ) : (
            <>
              <Row className="gx-4 gy-4">
                {results.map((movie, index) => (
                  <Col key={index} lg={4} md={6} sm={12}>
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>

              {totalPageCount > 1 && (
                <ReactPaginate
                  nextLabel="next >"
                  previousLabel="< previous"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={Math.min(totalPageCount, 500)} // TMDb는 최대 500
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
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;

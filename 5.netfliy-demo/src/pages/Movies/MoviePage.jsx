import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";

import { Spinner, Alert, Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieCard from "../../common/MovieCard/MovieCard";
import "./MoviePage.style.css";

//경로 2가지
//navbar 에서 무비즈 탭을 클릭해서 온경우 => popularMovie 보여주기
//keyword를 입력해서 온경우 => keyword와 관련된 영화들을 보여줌

//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할때마다 page 바꿔주기
//page 값이 바뀔때마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  // url에 q 지우고 popular movie 오는지도 테스트해보기

  const [page, setPage] = useState(1);
  const keyword = query.get("q");

  //{keyword} object로 받는거 hook에서도 일치시키기! 헷갈리기 쉬움
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [keyword]);

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
    return <Alert variant="danger"> {error.message} </Alert>;
  }

  console.log("ddd", data);

  const handlePageClick = ({ selected }) => {
    console.log("page", page);
    setPage(selected + 1);
  };

    // 검색어는 있는데 결과가 없는 경우
    const noResult = keyword && data?.results?.length === 0;

  return (

    // <Container fluid className="px-4 px-md-5">
    //   <Row className="gx-4 gy-4">
    //     <Col lg={4} xs={12}>
    //       <div className="text-white">필터</div>
    //     </Col>

    //     <Col lg={8} xs={12}>
    //       <Row className="gx-4 gy-4">
    //         {data?.results.map((movie, index) => (
    //           <Col key={index} lg={4} md={6} sm={12}>
    //             <MovieCard movie={movie} />
    //           </Col>
    //         ))}
    //       </Row>
    //       <ReactPaginate
    //         nextLabel="next >"
    //         onPageChange={handlePageClick}
    //         pageRangeDisplayed={3}
    //         marginPagesDisplayed={2}
    //         pageCount={data?.total_pages} //전체페이지가 몇개인지 알려줌
    //         previousLabel="< previous"
    //         pageClassName="page-item"
    //         pageLinkClassName="page-link"
    //         previousClassName="page-item"
    //         previousLinkClassName="page-link"
    //         nextClassName="page-item"
    //         nextLinkClassName="page-link"
    //         breakLabel="..."
    //         breakClassName="page-item"
    //         breakLinkClassName="page-link"
    //         containerClassName="custom-pagination"
    //         activeClassName="active"
    //         renderOnZeroPageCount={null}
    //         forcePage={data?.page ? page - 1 : 0}  // fallback to 0
    //       />
    //     </Col>
    //   </Row>
    // </Container>
    <Container fluid className="px-4 px-md-5">
    <Row className="gx-4 gy-4">
      <Col lg={4} xs={12}>
        <div className="text-white">필터</div>
      </Col>

      <Col lg={8} xs={12}>
        {noResult ? (
          <div className="text-white mt-5">
            <div className="fs-4 mb-3 ">검색 결과가 없습니다!!</div>
            <button
              className="btn btn-outline-light"
              onClick={() => window.history.back()}
            >
              ← Go Back
            </button>
          </div>
        ) : (
          <>
            <Row className="gx-4 gy-4">
              {data?.results.map((movie, index) => (
                <Col key={index} lg={4} md={6} sm={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>

            {data?.total_pages > 0 && (
              <ReactPaginate
                nextLabel="next >"
                previousLabel="< previous"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={data?.total_pages}
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
                forcePage={data?.page ? page - 1 : 0}
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

import React from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Spinner, Alert, Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieCard from "../../common/MovieCard/MovieCard";
import "./MoviePage.style.css"

//경로 2가지
//navbar 에서 무비즈 탭을 클릭해서 온경우 => popularMovie 보여주기
//keyword를 입력해서 온경우 => keyword와 관련된 영화들을 보여줌
const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  // url에 q 지우고 popular movie 오는지도 테스트해보기
  const keyword = query.get("q");

  //{keyword} object로 받는거 hook에서도 일치시키기! 헷갈리기 쉬움
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });

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
  return (
    // <Container >
    //   <Row   >
    //     <Col lg={5} xs={12}>
    //       필터
    //     </Col>
    //     <Col lg={7} xs={12}>
    //       <Row  className="gy-4">
    //         {data?.results.map((movie, index) => (
    //           <Col key={index} lg={4} xs={12}>
    //             <MovieCard movie={movie} />
    //           </Col>
    //         ))}
    //       </Row>
    //     </Col>
    //   </Row>
    // </Container>
    <Container fluid className="px-4 px-md-5">
  <Row className="gx-4 gy-4">
    <Col lg={4} xs={12}>
      <div className="text-white">필터</div>
    </Col>

    <Col lg={8} xs={12}>
      <Row className="gx-4 gy-4">
        {data?.results.map((movie, index) => (
          <Col key={index} lg={4} md={6} sm={12}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Col>
  </Row>
</Container>

  );
};

export default MoviePage;

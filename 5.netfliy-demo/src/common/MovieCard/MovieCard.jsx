import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  // 전체 장르정보 api로 받아온것 (객체배열로 아이디와 장르르이름이 존재함)
  const { data: genreData } = useMovieGenreQuery();
  // data가 다 나오니까 장르만 나오게 해보기 (결과물 많이 나오지만 리액트 쿼리가 뭉쳐서 하나만 호출 -network창 확인!)
  console.log("ggg", genreData);

  const navigate = useNavigate(); 
  

   // 클릭 시 상세페이지 이동
   const goToDetail = () => {
    navigate(`/movies/${movie.id}`);
  };

  //  장르 아이디(숫자)들만 모여있는 리스트를 받아서 장르 api데이터(아이디 & 장르이름)와 비교해서서 장르르이름으로 바꿔주는 과정
  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    // 장르 이름만 모여있는 문자열 배열 리턴턴
    return genreNameList;
  };

  return (
    <div className="movie-card-container">
      <div
        style={{
          backgroundImage: `url(${
            movie.poster_path
              ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
              : "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=600&h=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bm8lMjBpbWFnZXxlbnwwfHwwfHx8Mg%3D%3D" 
          })`,
        }}
        className="movie-card"
        onClick={goToDetail}
      >
        {!movie.poster_path && <div className="no-image-text">No image...<br/> <div>Title: {movie.title}</div></div>}
        <div className="overlay">
          <h4 className="overlay-title">{movie.title}</h4>
          {/* 아래에서 id는 장르이름을 의미함.. => genreName으로 바꿔줘도 됨..  */}
          {showGenre(movie.genre_ids).slice(0,3).map((id) => (
            <Badge key={id} bg="danger" className="custom-overlay-badge-id badge-group">
              {id}
            </Badge>
          ))}
          <div>
            <div>
              <Badge
                bg="warning"
                text="light"
                className="custom-overlay-badge-rating badge-group"
              >
                {" "}
                TDMB
              </Badge>{" "}
              {movie.vote_average}
            </div>
            <div>
              <FontAwesomeIcon icon={faUsers} /> {movie.popularity}
            </div>
            <div
              className={`custom-overlay-${movie.adult ? "over18" : "under18"}`}
            >
              {movie.adult ? "Adult" : "Under 18"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

import React from "react";
import "./NotFoundPage.style.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); //바로 전 페이지로 이동
  };
  return (
    <div className="background">
      <div className="container">
        <p>Nothing...</p>
        <button onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
};

export default NotFoundPage;

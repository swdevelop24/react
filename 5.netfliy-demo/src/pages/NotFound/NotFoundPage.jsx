import React from "react";
import "./NotFoundPage.style.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/"); //홈페이지로 이동
  };
  return (
    <div className="background">
      <div className="container">
        <p>Nothing...</p>
        <button onClick={handleBackClick}>Back to Home</button>
      </div>
    </div>
  );
};

export default NotFoundPage;

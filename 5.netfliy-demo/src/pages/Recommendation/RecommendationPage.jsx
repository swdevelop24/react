import { useEffect, useState } from "react";
import { useRecommend } from "../../hooks/useRecommend";
import { useNavigate } from "react-router-dom";
import "./RecommendationPage.style.css";

const weatherTypes = [
  { type: "clear", label: "☀️ 맑음" },
  { type: "clouds", label: "☁️ 흐림" },
  { type: "rain", label: "☔️ 비" },
  { type: "snow", label: "❄️ 눈" },
  { type: "thunderstorm", label: "⛈️ 천둥" },
];

const emojiMap = {
  clear: "☀️",
  clouds: "☁️",
  rain: "☔️",
  snow: "❄️",
  thunderstorm: "⛈️",
};

const weatherDescMap = {
  clear: "맑음",
  clouds: "흐림",
  rain: "비",
  snow: "눈",
  thunderstorm: "천둥",
};

const genreNameMap = {
  clear: "코미디",
  clouds: "스릴러",
  rain: "로맨스",
  snow: "판타지",
  thunderstorm: "공포",
  none: "미스터리",
  default: "액션",
};

const RecommendationPage = () => {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [selectedWeather, setSelectedWeather] = useState(null);
  const navigate = useNavigate();

  // 🔥 body.no-scroll 제거됨

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("위치 에러:", err);
      }
    );
  }, []);

  const { weather, movies, loading, error } = useRecommend(
    coords.lat,
    coords.lon,
    selectedWeather
  );

  const weatherMain =
    selectedWeather ?? weather?.weather?.[0]?.main?.toLowerCase() ?? "";

  const weatherDesc = selectedWeather
    ? weatherDescMap[selectedWeather] || "정보 없음"
    : weather?.weather?.[0]?.description ?? "정보 없음";

  const emoji = emojiMap[weatherMain] || "🌐";
  const genreKey = weatherMain || "none";
  const genreName = genreNameMap[genreKey] || genreNameMap["default"];

  const handleSelect = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const visibleMovies = movies?.results?.slice(0, 7) || [];

  if (loading) return <p className="recommend-center">로딩 중...</p>;
  if (error) return <p className="recommend-center">문제가 발생했습니다 🥲</p>;

  return (
    <div className="recommend-page-wrapper">
      <div className="recommendation-page">
        <div className="recommend-top-row">
          <h2 className="recommend-weather-title">
            {selectedWeather ? "다른 날씨" : "오늘 날씨"}: {weatherDesc} {emoji}
          </h2>
        </div>

        <h3 className="recommend-center">
          🎬 {selectedWeather ? "다른 날씨엔?" : "오늘 날씨엔?"} ({genreName})
        </h3>

        <div className="recommend-weather-buttons">
          {weatherTypes.map((w) => (
            <button
              key={w.type}
              className={`recommend-weather-btn ${
                selectedWeather === w.type ? "active" : ""
              }`}
              onClick={() => setSelectedWeather(w.type)}
            >
              {w.label}
            </button>
          ))}
        </div>

        {selectedWeather && (
          <div className="recommend-reset-button-container">
            <button 
              className="recommend-reset-button"
              onClick={() => setSelectedWeather(null)}
            >
              🔄 오늘 날씨로 보기
            </button>
          </div>
        )}
        <button
          className="recommend-go-movie-button"
          onClick={() => navigate("/movies")}
        >
          🎬 장르별
        </button>

        <div className="recommend-film-container">
          <div className="recommend-film-track">
            {[...visibleMovies, ...visibleMovies].map((movie, index) => (
              <div
                className="recommend-movie-card"
                key={index}
                onClick={() => handleSelect(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;

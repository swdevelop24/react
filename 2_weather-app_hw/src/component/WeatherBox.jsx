import React from "react";

const WeatherBox = ({ weather, apiError }) => {
  // /* {weather && weather.name} */
  return (
    <div className="weather-box">
      <div>
        <h2>{(weather && weather.name) || <h4>도시이름 로딩 실패</h4>} </h2>
      </div>
      <h2>
        {weather?.main?.temp !== undefined ? (
          `${weather.main.temp}°C / ${(
            (weather.main.temp * 9) / 5 +
            32
          ).toFixed(1)}°F`
        ) : (
          <h4>온도정보 로딩 실패</h4>
        )}
      </h2>
      <h3>
        {weather?.weather?.[0]?.description || <h4>날씨 정보 로딩 실패</h4>}
      </h3>
    </div>
  );
};

export default WeatherBox;

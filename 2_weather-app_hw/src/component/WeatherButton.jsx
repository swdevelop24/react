import React from "react";
import { Button } from "react-bootstrap";

// 숙제 1 :current Location 에 onClick에 setCity("") 추가
const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
  // console.log("cities?", cities);
  return (
    <div className="weather-button-container">
      <Button
        variant={`${
          selectedCity === "current" || selectedCity == null ? "dark" : "light"
        }`}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </Button>
      <div className="button-group">
        {cities.map((city) => (
          <Button
            key={city} // 각 버튼에 고유한 key 추가
            variant={`${selectedCity === city ? "dark" : "light"}`}
            onClick={() => handleCityChange(city)}
          >
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;

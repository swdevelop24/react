import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";


import ClipLoader from "react-spinners/ClipLoader";


const API_KEY = "24ee19012620ceecb014d7640b1874a9"

//1.앱이 실행되자마자 현재위치기반이 날씨가 보인다
//2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태
//3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른 도시 )
//4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다. 
//5.현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다. 
//6.데이터를 들고오는 동안 로딩 스피너가 돈다. 


const cities = ['Paris', 'New York', 'Tokyo', 'Seoul', 'Seattle', '앨리스 원더랜드']

function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true)
  const [apiError, setAPIError] = useState(""); //숙제 3: 에이피아이 에러 설정 

  const getWeatherByCurrentLocation = async (lat, lon) => {
    setWeather(null);  // 기존 데이터 초기화
    setAPIError(null); // 기존 에러 초기화
    setLoading(true);
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url)
      let data = await response.json();
      // console.log("data", data);
      setWeather(data);
      setLoading(false);
    }
    catch (err) {
      // console.error("현재 api 위치 날씨 정보를 가져오는 데 실패했습니다!!!.");
      setAPIError(err.message);
      setLoading(false);
      setWeather(null);  // weather 초기화
    }

  };
  //w3에서 자바스크립트로 geo location 찾는법 가져옴
  const getCurrentLocation = () => {

    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon)
    });
  };

  const getWeatherByCity = async (lat, lon) => {

    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      setLoading(true);
      let response = await fetch(url)
      let data = await response.json()
      setWeather(data);
      setLoading(false);
    }
    catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }

  }



  useEffect(() => {
    if (city === "current" || city == null) {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);


  // setCity를 weatherButton으로 넘겨주는 대신  
  // current와 아닌걸로 구분하는 handleCityChange 함수 보내기 
  const handleCityChange = async (city) => {
    if (city === "current") {
      setCity("current");  // current 선택 시 ""로 변경
      getCurrentLocation();

    } else {
      setCity(city);
    }
  };

  // useEffect(()=>{
  //   // console.log("city?", city);
  //   getWeahterByCity()
  // },[city]);
  // 처음에 ''로 인식되어서 에러 생김 => useEffect를 그래서 하나로 호출해줘야함. 
  // return <div>
  //   {loading ? (
  //     <div className="container">
  //       <ClipLoader color="#f88c6b" loading={loading} size={150}
  //         aria-label="Loading Spinner" data-testid="loader" />
  //     </div>
  //   ) : apiError ? (
  //     <div className="container">
  //       <h3>{apiError}</h3>
  //     </div>
  //   ) : (
  //     <div className="container">
  //       <WeatherBox weather={weather} selectedCity={city} />
  //       <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
  //     </div>
  //   )}
  // </div>;



  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#f88c6b"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : apiError ? (
        <div className="container">
          <h3 style={{ color: "red" }}>현재 API 오류로 날씨 정보를 가져오는 데 실패했습니다.</h3>
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} selectedCity={city} />
          <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
        </div>
      )}
    </div>
  );

}

export default App;

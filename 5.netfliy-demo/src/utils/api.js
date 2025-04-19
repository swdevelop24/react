import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

// TMDb용 인스턴스
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// OpenWeatherMap용 인스턴스
const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

// 요청/응답 인터셉터 함수
const attachInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      // 요청 전 작업
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // 응답 후 작업
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// 각각의 인스턴스에 인터셉터 적용
attachInterceptors(api);
attachInterceptors(weatherApi);

// 기존 default 유지 (기존 코드 그대로 사용 가능)
export default api;

// 새 기능용 named export
export { api as movieApi, weatherApi };

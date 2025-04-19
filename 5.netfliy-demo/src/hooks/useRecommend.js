// ✅ hooks/useRecommend.js
import { useQuery } from "@tanstack/react-query";
import { weatherApi, movieApi } from "../utils/api";

const getGenreByWeather = (condition) => {
    if (!condition) return 9648; //미스테리

    const lower = condition.toLowerCase();

    if (lower.includes("clear")) return 35;           // ☀️ 맑음 → 코미디
    if (lower.includes("cloud")) return 53;         // ☁️ 흐림 → 스릴러
    if (lower.includes("rain")) return 10749;         // ☔️ 비 → 로맨스
    if (lower.includes("snow")) return 14;            // ❄️ 눈 → 판타지
    if (lower.includes("thunderstorm")) return 27;    // ⛈️ 천둥 → 공포

    return 28; // 기본 → 액션
};

export const useRecommend = (lat, lon, selectedWeather) => {
    const { data: weather, isLoading: weatherLoading, error: weatherError } = useQuery({
        queryKey: ["weather", lat, lon],
        queryFn: async () => {
            const res = await weatherApi.get("/weather", {
                params: {
                    lat,
                    lon,
                    appid: import.meta.env.VITE_WEATHER_API_KEY,
                    units: "metric",
                    lang: "kr",
                },
            });
            return res.data;
        },
        enabled: !!lat && !!lon && !selectedWeather, // 버튼 선택 안했을 때만 호출
    });

    const effectiveWeather = selectedWeather ?? weather?.weather?.[0]?.main;
    const genreId = getGenreByWeather(effectiveWeather);

    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    const todayStr = today.toISOString().split("T")[0];
    const oneMonthAgoStr = oneMonthAgo.toISOString().split("T")[0];

    const { data: movies, isLoading: moviesLoading, error: moviesError } = useQuery({
        queryKey: ["recommend-movies", genreId],
        queryFn: async () => {
            const res = await movieApi.get("/discover/movie", {
                params: {
                    with_genres: genreId,
                    sort_by: "popularity.desc",
                    release_date_gte: oneMonthAgoStr,
                    release_date_lte: todayStr,
                    vote_average_gte: 6.5,
                    vote_count_gte: 100,
                    include_adult: false,
                },
            });
            const filtered = res.data.results.filter((movie) => movie.poster_path);
            return { results: filtered };
        },
        enabled: !!genreId,
    });

    return {
        weather,
        movies,
        loading: weatherLoading || moviesLoading,
        error: weatherError || moviesError,
    };
};

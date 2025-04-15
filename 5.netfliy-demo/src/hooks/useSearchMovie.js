// hooks/useSearchMovie.js
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = async ({ keyword, page, sortOption, genreFilter }) => {
  let url = "";

  if (keyword) {
    // 검색 모드: 정렬/필터는 클라이언트에서 처리
    url = `/search/movie?query=${encodeURIComponent(keyword)}&page=${page}`;
  } else {
    // 인기순/장르 필터는 서버에서 처리
    url = `/discover/movie?sort_by=${sortOption}&page=${page}&vote_count.gte=10`;
    if (genreFilter) {
      url += `&with_genres=${genreFilter}`;
    }
  }

  const response = await api.get(url);
  return response.data;
};

export const useSearchMovieQuery = ({ keyword, page, sortOption, genreFilter }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, sortOption, genreFilter }],
    queryFn: () => fetchSearchMovie({ keyword, page, sortOption, genreFilter }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
};

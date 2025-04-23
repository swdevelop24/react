import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = async ({ keyword, maxPages = 1 }) => {
  let allResults = [];
  let page = 1;

  while (page <= maxPages) {
    const response = await api.get(
      `/search/movie?query=${encodeURIComponent(keyword)}&page=${page}`
    );

    allResults.push(...response.data.results);

    if (page >= response.data.total_pages) break;
    page++;
  }

  return {
    results: allResults,
    total_results: allResults.length,
  };
};

const fetchDiscoverMovie = async ({ page, sortOption, genreFilter }) => {
  let url = `/discover/movie?sort_by=${sortOption}&page=${page}&vote_count.gte=10`;
  if (genreFilter) {
    url += `&with_genres=${genreFilter}`;
  }

  const response = await api.get(url);
  return response.data;
};

export const useSearchMovieQuery = ({ keyword, page, sortOption, genreFilter }) => {
  const isSearch = !!keyword;

  return useQuery({
    queryKey: ["movie-search", { keyword, page, sortOption, genreFilter }],
    queryFn: () =>
      isSearch
        ? fetchSearchMovie({ keyword, maxPages: 30 })
        : fetchDiscoverMovie({ page, sortOption, genreFilter }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
};

// import { useQuery } from "@tanstack/react-query"
// import api from "../utils/api";

// const fetchSearchMovie = ({ keyword, page}) => {
//     return keyword
//         ? api.get(`/search/movie?query=${keyword}&page=${page}`)
//         : api.get(`/movie/popular?page=${page}`)
// };
// export const useSearchMovieQuery = ({keyword, page}) => {
//     return useQuery({
//         queryKey: ['movie-search', {keyword, page}],
//         queryFn: () => fetchSearchMovie({ keyword, page }),
//         select: (result) => result.data,
//     })
// }


import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sortOption, genreFilter }) => {
  let url = "";

  if (keyword) {
    url = `/search/movie?query=${keyword}&page=${page}`;
  } else {
    url = `/discover/movie?sort_by=${sortOption}&page=${page}&vote_count.gte=10`;
    if (genreFilter) {
      url += `&with_genres=${genreFilter}`;
    }
  }

  return api.get(url);
};

export const useSearchMovieQuery = ({ keyword, page, sortOption, genreFilter }) => {
  return useQuery({
    queryKey: ['movie-search', { keyword, page, sortOption, genreFilter }],
    queryFn: () => fetchSearchMovie({ keyword, page, sortOption, genreFilter }),
    select: (result) => result.data,
  });
};

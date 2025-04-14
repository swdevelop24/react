import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieTrailer = async (movie_id) => {
    const res = await api.get(`/movie/${movie_id}/videos`);
    const videos = res.data.results;

    return videos;

}

export const useMovieTrailerQuery = (movie_id) => {
    return useQuery({
        queryKey: ['movie-trailer', movie_id],
        queryFn: ()=>fetchMovieTrailer(movie_id),
        enabled: !!movie_id,
        staleTime: 300000, //5분
    })

}
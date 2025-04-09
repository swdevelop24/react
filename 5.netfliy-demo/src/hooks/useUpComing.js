import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpComing = () => {

    return api.get(`/movie/upcoming`)
}
export const useUpComingQuery = () => {
    return useQuery({
        queryKey: ['movie-upcoming'],
        queryFn: fetchUpComing,
        select: (result) => result.data, 
    })
}
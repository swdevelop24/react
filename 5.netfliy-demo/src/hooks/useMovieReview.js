import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";


const fetchMovieReview=(id) =>{
    return api.get(`/movie/${id}/reviews`)
}


export const useMovieReviewQuery=() =>{
    return useQuery({
        queryKey: ['movie-review', id], 
        queryFn: ()=>fetchMovieReview(id), 
        select:(res) => res.data.results, 
        staleTime: 300000,
    })
}; 
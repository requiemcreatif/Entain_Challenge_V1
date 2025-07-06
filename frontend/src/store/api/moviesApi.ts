import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  MovieDetails,
  Genre,
  ApiResponse,
  MoviesListResponse,
  SearchMoviesResponse,
  DiscoverMoviesResponse,
  SearchParams,
  DiscoverParams,
} from "../../types/movie.types";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Movie", "Movies", "Genres"],
  endpoints: (builder) => ({
    // Get popular movies
    getPopularMovies: builder.query<
      ApiResponse<MoviesListResponse>,
      number | void
    >({
      query: (page = 1) => `movies?page=${page}`,
      providesTags: ["Movies"],
    }),

    // Search movies
    searchMovies: builder.query<
      ApiResponse<SearchMoviesResponse>,
      SearchParams
    >({
      query: ({ query, page = 1, include_adult = false }) => {
        const params = new URLSearchParams({
          q: query || "",
          page: page.toString(),
          include_adult: include_adult.toString(),
        });
        return `movies/search?${params.toString()}`;
      },
      providesTags: ["Movies"],
    }),

    // Get movie details
    getMovieDetails: builder.query<ApiResponse<MovieDetails>, number>({
      query: (movieId) => `movies/${movieId}`,
      providesTags: (result, error, movieId) => [
        { type: "Movie", id: movieId },
      ],
    }),

    // Get genres
    getGenres: builder.query<ApiResponse<Genre[]>, void>({
      query: () => "movies/genres",
      providesTags: ["Genres"],
    }),

    // Discover movies with filters
    discoverMovies: builder.query<
      ApiResponse<DiscoverMoviesResponse>,
      DiscoverParams
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params.page) searchParams.append("page", params.page.toString());
        if (params.with_genres)
          searchParams.append("with_genres", params.with_genres);
        if (params.sort_by) searchParams.append("sort_by", params.sort_by);
        if (params.release_date_gte)
          searchParams.append("release_date_gte", params.release_date_gte);
        if (params.release_date_lte)
          searchParams.append("release_date_lte", params.release_date_lte);

        return `movies/discover?${searchParams.toString()}`;
      },
      providesTags: ["Movies"],
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetGenresQuery,
  useDiscoverMoviesQuery,
  useLazySearchMoviesQuery,
  useLazyDiscoverMoviesQuery,
} = moviesApi;

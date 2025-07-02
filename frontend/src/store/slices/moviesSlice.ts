import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieDetails, Genre } from "../../types/movie.types";

interface MoviesState {
  selectedMovie: MovieDetails | null;
  favorites: Movie[];
  genres: Genre[];
  currentSearchQuery: string;
  viewMode: "grid" | "list";
  selectedGenres: number[];
  sortBy: string;
  releaseYear: number | null;
  minRating: number;
}

const initialState: MoviesState = {
  selectedMovie: null,
  favorites: [],
  genres: [],
  currentSearchQuery: "",
  viewMode: "grid",
  selectedGenres: [],
  sortBy: "popularity.desc",
  releaseYear: null,
  minRating: 0,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<MovieDetails | null>) => {
      state.selectedMovie = action.payload;
    },

    addToFavorites: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const existingIndex = state.favorites.findIndex(
        (fav) => fav.id === movie.id
      );
      if (existingIndex === -1) {
        state.favorites.push(movie);
      }
    },

    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      state.favorites = state.favorites.filter((fav) => fav.id !== movieId);
    },

    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const existingIndex = state.favorites.findIndex(
        (fav) => fav.id === movie.id
      );

      if (existingIndex === -1) {
        state.favorites.push(movie);
      } else {
        state.favorites.splice(existingIndex, 1);
      }
    },

    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
    },

    setCurrentSearchQuery: (state, action: PayloadAction<string>) => {
      state.currentSearchQuery = action.payload;
    },

    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },

    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },

    clearSearch: (state) => {
      state.currentSearchQuery = "";
    },

    setSelectedGenres: (state, action: PayloadAction<number[]>) => {
      state.selectedGenres = action.payload;
    },

    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },

    setReleaseYear: (state, action: PayloadAction<number | null>) => {
      state.releaseYear = action.payload;
    },

    setMinRating: (state, action: PayloadAction<number>) => {
      state.minRating = action.payload;
    },

    clearFilters: (state) => {
      state.selectedGenres = [];
      state.sortBy = "popularity.desc";
      state.releaseYear = null;
      state.minRating = 0;
    },
  },
});

export const {
  setSelectedMovie,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  setGenres,
  setCurrentSearchQuery,
  setViewMode,
  clearSelectedMovie,
  clearSearch,
  setSelectedGenres,
  setSortBy,
  setReleaseYear,
  setMinRating,
  clearFilters,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const selectSelectedMovie = (state: { movies: MoviesState }) =>
  state.movies.selectedMovie;
export const selectFavorites = (state: { movies: MoviesState }) =>
  state.movies.favorites;
export const selectGenres = (state: { movies: MoviesState }) =>
  state.movies.genres;
export const selectCurrentSearchQuery = (state: { movies: MoviesState }) =>
  state.movies.currentSearchQuery;
export const selectViewMode = (state: { movies: MoviesState }) =>
  state.movies.viewMode;
export const selectIsFavorite =
  (movieId: number) => (state: { movies: MoviesState }) =>
    state.movies.favorites.some((fav) => fav.id === movieId);

export const selectSelectedGenres = (state: { movies: MoviesState }) =>
  state.movies.selectedGenres;
export const selectSortBy = (state: { movies: MoviesState }) =>
  state.movies.sortBy;
export const selectReleaseYear = (state: { movies: MoviesState }) =>
  state.movies.releaseYear;
export const selectMinRating = (state: { movies: MoviesState }) =>
  state.movies.minRating;

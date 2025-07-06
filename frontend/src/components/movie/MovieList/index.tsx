import React from "react";
import { Typography } from "@mui/material";
import { Movie } from "types/movie.types";
import MovieCard from "../MovieCard";
import {
  MovieListContainer,
  LoadingContainer,
  MovieGrid,
  MovieListView,
  ErrorContainer,
  ErrorAlert,
  EmptyStateContainer,
  SkeletonCard,
  SkeletonImage,
  SkeletonText,
  SkeletonTextShort,
} from "./styles";

interface MovieListProps {
  movies: Movie[];
  isLoading?: boolean;
  error?: string | null;
  onMovieClick?: (movie: Movie) => void;
  viewMode?: "grid" | "list";
  emptyMessage?: string;
}

// Loading skeleton item component
const SkeletonItem: React.FC = () => (
  <SkeletonCard>
    <SkeletonImage variant="rectangular" height={200} />
    <SkeletonText variant="text" height={24} />
    <SkeletonTextShort variant="text" height={16} />
    <SkeletonText variant="text" height={40} />
  </SkeletonCard>
);

// Movies renderer component
const MoviesRenderer: React.FC<{
  movies: Movie[];
  viewMode: "grid" | "list";
  onMovieClick?: (movie: Movie) => void;
}> = ({ movies, viewMode, onMovieClick }) => {
  const movieCards = movies.map((movie) => (
    <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
  ));

  const Container = viewMode === "grid" ? MovieGrid : MovieListView;

  return (
    <MovieListContainer>
      <Container>{movieCards}</Container>
    </MovieListContainer>
  );
};

const MovieList: React.FC<MovieListProps> = ({
  movies,
  isLoading = false,
  error = null,
  onMovieClick,
  viewMode = "grid",
  emptyMessage = "No movies found",
}) => {
  // Loading state
  if (isLoading) {
    return (
      <LoadingContainer>
        <MovieGrid>
          {Array.from({ length: 9 }, (_, index) => (
            <SkeletonItem key={index} />
          ))}
        </MovieGrid>
      </LoadingContainer>
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorContainer>
        <ErrorAlert severity="error">
          <Typography variant="h6" gutterBottom>
            Error Loading Movies
          </Typography>
          <Typography variant="body2">{error}</Typography>
        </ErrorAlert>
      </ErrorContainer>
    );
  }

  // Empty state
  if (!movies || movies.length === 0) {
    return (
      <EmptyStateContainer>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {emptyMessage}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try adjusting your search or filters
        </Typography>
      </EmptyStateContainer>
    );
  }

  // Render movies
  return (
    <MoviesRenderer
      movies={movies}
      viewMode={viewMode}
      onMovieClick={onMovieClick}
    />
  );
};

export default MovieList;

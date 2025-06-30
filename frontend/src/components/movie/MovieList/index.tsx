import React from "react";
import { Box, Typography, Alert, Skeleton } from "@mui/material";
import { Movie } from "types/movie.types";
import MovieCard from "../MovieCard";

interface MovieListProps {
  movies: Movie[];
  isLoading?: boolean;
  error?: string | null;
  onMovieClick?: (movie: Movie) => void;
  viewMode?: "grid" | "list";
  emptyMessage?: string;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  isLoading = false,
  error = null,
  onMovieClick,
  viewMode = "grid",
  emptyMessage = "No movies found",
}) => {
  if (isLoading) {
    return (
      <Box sx={{ py: 4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <Box key={index}>
              <Skeleton
                variant="rectangular"
                height={200}
                sx={{ borderRadius: 1, mb: 1 }}
              />
              <Skeleton variant="text" height={24} />
              <Skeleton variant="text" height={16} width="60%" />
              <Skeleton variant="text" height={40} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Error Loading Movies
          </Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </Box>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {emptyMessage}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try adjusting your search or filters
        </Typography>
      </Box>
    );
  }

  // Grid view
  if (viewMode === "grid") {
    return (
      <Box sx={{ py: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
          ))}
        </Box>
      </Box>
    );
  }

  // List view
  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </Box>
    </Box>
  );
};

export default MovieList;

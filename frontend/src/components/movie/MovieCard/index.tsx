import React from "react";
import {
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Rating,
  Tooltip,
  Chip,
} from "@mui/material";
import { Favorite, FavoriteBorder, Info } from "@mui/icons-material";
import { Movie } from "types/movie.types";
import { getImageUrl, formatYear, formatRating, truncateText } from "utils";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  toggleFavorite,
  selectIsFavorite,
  selectGenres,
} from "store/slices/moviesSlice";
import { openMovieModal } from "store/slices/uiSlice";
import { MovieCardContainer } from "./styles";

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  showFavoriteButton?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  showFavoriteButton = true,
}) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(movie.id));
  const genres = useAppSelector(selectGenres);

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean) as string[];
  };

  const movieGenres = getGenreNames(movie.genre_ids);
  const primaryGenre = movieGenres[0];

  const handleCardClick = () => {
    dispatch(openMovieModal(movie.id));
    if (onClick) {
      onClick(movie);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie));
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openMovieModal(movie.id));
  };

  return (
    <MovieCardContainer onClick={handleCardClick}>
      <Box sx={{ position: "relative", width: 120, flexShrink: 0 }}>
        <CardMedia
          component="img"
          height="180"
          image={getImageUrl(movie.poster_path)}
          alt={movie.title}
          sx={{
            objectFit: "contain",
            backgroundColor: "#f5f5f5",
            width: "100%",
          }}
        />

        {/* Overlay with action buttons */}
        <Box
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          {showFavoriteButton && (
            <Tooltip
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <IconButton
                onClick={handleFavoriteClick}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(0, 0, 0, 0.8)"
                      : "rgba(255, 255, 255, 0.9)",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.2)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(0, 0, 0, 0.9)"
                        : "rgba(255, 255, 255, 1)",
                    transform: "scale(1.1)",
                  },
                }}
                size="small"
              >
                {isFavorite ? (
                  <Favorite sx={{ color: "#dc2626" }} />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="View details">
            <IconButton
              onClick={handleInfoClick}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(0, 0, 0, 0.8)"
                    : "rgba(255, 255, 255, 0.9)",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.2)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(0, 0, 0, 0.9)"
                      : "rgba(255, 255, 255, 1)",
                  transform: "scale(1.1)",
                },
              }}
              size="small"
            >
              <Info />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Rating badge */}
        <Box
          sx={{
            position: "absolute",
            bottom: 4,
            left: 4,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderRadius: 1,
            px: 0.8,
            py: 0.3,
          }}
        >
          <Typography variant="caption" color="white" fontWeight="bold">
            ⭐ {formatRating(movie.vote_average)}
          </Typography>
        </Box>
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 1.5,
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="subtitle2"
          component="h2"
          sx={{
            fontWeight: "bold",
            lineHeight: 1.3,
            mb: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {movie.title}
        </Typography>

        {movie.release_date && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
            {formatYear(movie.release_date)}
          </Typography>
        )}

        {/* Genre Badge */}
        {primaryGenre && (
          <Box sx={{ mb: 0.5 }}>
            <Chip
              label={primaryGenre}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.7rem",
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                fontWeight: 500,
                "& .MuiChip-label": {
                  px: 1,
                },
              }}
            />
          </Box>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            flexGrow: 1,
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.3,
          }}
        >
          {truncateText(movie.overview, 120)}
        </Typography>

        {/* Rating stars */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: "auto" }}
        >
          <Rating
            value={movie.vote_average / 2}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.7rem" }}
          >
            ({movie.vote_count})
          </Typography>
        </Box>
      </CardContent>
    </MovieCardContainer>
  );
};

export default MovieCard;

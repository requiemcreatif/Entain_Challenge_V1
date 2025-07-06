import React from "react";
import { CardMedia, Typography, Box, Rating, Tooltip } from "@mui/material";
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
import {
  MovieCardContainer,
  OverlayContainer,
  RatingBadge,
  MovieCardContent,
  MovieIconButton,
  MovieTitle,
  GenreBadge,
  MovieOverview,
} from "./styles";

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
        <OverlayContainer>
          {showFavoriteButton && (
            <Tooltip
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <MovieIconButton onClick={handleFavoriteClick} size="small">
                {isFavorite ? (
                  <Favorite sx={{ color: "#dc2626" }} />
                ) : (
                  <FavoriteBorder />
                )}
              </MovieIconButton>
            </Tooltip>
          )}

          <Tooltip title="View details">
            <MovieIconButton onClick={handleInfoClick} size="small">
              <Info />
            </MovieIconButton>
          </Tooltip>
        </OverlayContainer>

        {/* Rating badge */}
        <RatingBadge>
          <Typography variant="caption" color="white" fontWeight="bold">
            ⭐ {formatRating(movie.vote_average)}
          </Typography>
        </RatingBadge>
      </Box>

      <MovieCardContent>
        <MovieTitle variant="subtitle2">{movie.title}</MovieTitle>

        {movie.release_date && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
            {formatYear(movie.release_date)}
          </Typography>
        )}

        {/* Genre Badge */}
        {primaryGenre && (
          <Box sx={{ mb: 0.5 }}>
            <GenreBadge label={primaryGenre} size="small" />
          </Box>
        )}

        <MovieOverview variant="caption" color="text.secondary">
          {truncateText(movie.overview, 120)}
        </MovieOverview>

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
      </MovieCardContent>
    </MovieCardContainer>
  );
};

export default MovieCard;

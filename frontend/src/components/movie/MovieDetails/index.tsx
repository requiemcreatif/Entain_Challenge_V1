import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Divider,
  Stack,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  Close,
  Favorite,
  FavoriteBorder,
  CalendarToday,
  Schedule,
  Language,
  AttachMoney,
  Star,
} from "@mui/icons-material";
import { MovieDetails as MovieDetailsType } from "types/movie.types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { toggleFavorite, selectIsFavorite } from "store/slices/moviesSlice";
import { getImageUrl, formatDate, formatRating, getRatingColor } from "utils";

interface MovieDetailsProps {
  movie: MovieDetailsType;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(movie.id));

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(movie));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getRatingPercentage = (rating: number) => {
    return (rating / 10) * 100;
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
        p: 2,
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 3,
          maxWidth: 900,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
          boxShadow: 24,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            zIndex: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <Close />
        </IconButton>

        {/* Hero Section */}
        <Box
          sx={{
            position: "relative",
            height: 300,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${getImageUrl(
              movie.backdrop_path,
              "original"
            )})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "flex-end",
            p: 3,
            borderRadius: "12px 12px 0 0",
          }}
        >
          <Box sx={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
            {/* Poster */}
            <Box
              component="img"
              src={getImageUrl(movie.poster_path, "w500")}
              alt={movie.title}
              sx={{
                width: 150,
                height: 225,
                borderRadius: 2,
                boxShadow: 3,
                border: "3px solid white",
              }}
            />

            {/* Title and Basic Info */}
            <Box sx={{ color: "white", flex: 1 }}>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                gutterBottom
              >
                {movie.title}
              </Typography>

              {movie.original_title !== movie.title && (
                <Typography variant="h6" sx={{ opacity: 0.8, mb: 1 }}>
                  {movie.original_title}
                </Typography>
              )}

              <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                {movie.tagline}
              </Typography>

              {/* Quick Stats */}
              <Stack direction="row" spacing={3} alignItems="center">
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Star sx={{ color: "#ffd700", fontSize: 20 }} />
                  <Typography variant="h6" fontWeight="bold">
                    {formatRating(movie.vote_average)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    ({movie.vote_count.toLocaleString()})
                  </Typography>
                </Box>

                {movie.runtime && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Schedule sx={{ fontSize: 18 }} />
                    <Typography variant="body2">
                      {formatRuntime(movie.runtime)}
                    </Typography>
                  </Box>
                )}

                <IconButton
                  onClick={handleFavoriteClick}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  {isFavorite ? (
                    <Favorite sx={{ color: "#dc2626" }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Genres */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  size="small"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    fontWeight: 500,
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Rating Progress */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              User Score
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={getRatingPercentage(movie.vote_average)}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "grey.300",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: getRatingColor(movie.vote_average),
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" fontWeight="bold">
                {Math.round(getRatingPercentage(movie.vote_average))}%
              </Typography>
            </Box>
          </Box>

          {/* Overview */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {movie.overview}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Details Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            {/* Left Column */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Release Date
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday
                      sx={{ fontSize: 16, color: "text.secondary" }}
                    />
                    <Typography variant="body2">
                      {formatDate(movie.release_date)}
                    </Typography>
                  </Box>
                </Box>

                {movie.original_language && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Original Language
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Language
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="body2">
                        {movie.original_language.toUpperCase()}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {movie.budget > 0 && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Budget
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AttachMoney
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="body2">
                        {formatCurrency(movie.budget)}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {movie.revenue > 0 && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Revenue
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AttachMoney
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="body2">
                        {formatCurrency(movie.revenue)}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Stack>
            </Box>

            {/* Right Column */}
            <Box>
              {movie.production_companies.length > 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Production Companies
                  </Typography>
                  <Stack spacing={1}>
                    {movie.production_companies.slice(0, 5).map((company) => (
                      <Box
                        key={company.id}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {company.logo_path ? (
                          <Avatar
                            src={getImageUrl(company.logo_path, "w92")}
                            alt={company.name}
                            sx={{ width: 24, height: 24 }}
                          />
                        ) : (
                          <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                            {company.name.charAt(0)}
                          </Avatar>
                        )}
                        <Typography variant="body2">{company.name}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetails;

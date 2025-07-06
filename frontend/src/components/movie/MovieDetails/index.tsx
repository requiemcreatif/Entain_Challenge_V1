import React from "react";
import { Box, Typography, Divider, Stack, Avatar } from "@mui/material";
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
import {
  CloseButton,
  MovieDetailsContainer,
  MovieDetailsContent,
  PosterImage,
  HeroSection,
  HeroContent,
  MovieInfo,
  ContentSection,
  SectionBox,
  StatItem,
  DetailItem,
  DetailsGrid,
  FavoriteButton,
  GenreChip,
  RatingProgress,
  CompanyItem,
} from "./styles";

interface MovieDetailsProps {
  movie: MovieDetailsType;
  onClose: () => void;
}

// Helper component for detail items
const DetailItemComponent: React.FC<{
  label: string;
  value: string;
  icon: React.ReactElement;
}> = ({ label, value, icon }) => (
  <Box>
    <Typography variant="subtitle2" color="text.secondary">
      {label}
    </Typography>
    <DetailItem>
      <Box sx={{ fontSize: 16, color: "text.secondary" }}>{icon}</Box>
      <Typography variant="body2">{value}</Typography>
    </DetailItem>
  </Box>
);

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
    <MovieDetailsContainer onClick={onClose}>
      <MovieDetailsContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>

        <HeroSection
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${getImageUrl(
              movie.backdrop_path,
              "original"
            )})`,
          }}
        >
          <HeroContent>
            <PosterImage
              src={getImageUrl(movie.poster_path, "w500")}
              alt={movie.title}
            />

            <MovieInfo>
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

              <Stack direction="row" spacing={3} alignItems="center">
                <StatItem>
                  <Star sx={{ color: "#ffd700", fontSize: 20 }} />
                  <Typography variant="h6" fontWeight="bold">
                    {formatRating(movie.vote_average)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    ({movie.vote_count.toLocaleString()})
                  </Typography>
                </StatItem>

                {movie.runtime && (
                  <StatItem>
                    <Schedule sx={{ fontSize: 18 }} />
                    <Typography variant="body2">
                      {formatRuntime(movie.runtime)}
                    </Typography>
                  </StatItem>
                )}

                <FavoriteButton onClick={handleFavoriteClick}>
                  {isFavorite ? (
                    <Favorite sx={{ color: "#dc2626" }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </FavoriteButton>
              </Stack>
            </MovieInfo>
          </HeroContent>
        </HeroSection>

        <ContentSection>
          <SectionBox>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {movie.genres.map((genre) => (
                <GenreChip key={genre.id} label={genre.name} size="small" />
              ))}
            </Stack>
          </SectionBox>

          <SectionBox>
            <Typography variant="subtitle2" gutterBottom>
              User Score
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <RatingProgress
                  variant="determinate"
                  value={getRatingPercentage(movie.vote_average)}
                  sx={{
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: getRatingColor(movie.vote_average),
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" fontWeight="bold">
                {Math.round(getRatingPercentage(movie.vote_average))}%
              </Typography>
            </Box>
          </SectionBox>

          <SectionBox>
            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {movie.overview}
            </Typography>
          </SectionBox>

          <Divider sx={{ my: 3 }} />

          <DetailsGrid>
            <Box>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Stack spacing={2}>
                <DetailItemComponent
                  label="Release Date"
                  value={formatDate(movie.release_date)}
                  icon={<CalendarToday />}
                />

                {movie.original_language && (
                  <DetailItemComponent
                    label="Original Language"
                    value={movie.original_language.toUpperCase()}
                    icon={<Language />}
                  />
                )}

                {movie.budget > 0 && (
                  <DetailItemComponent
                    label="Budget"
                    value={formatCurrency(movie.budget)}
                    icon={<AttachMoney />}
                  />
                )}

                {movie.revenue > 0 && (
                  <DetailItemComponent
                    label="Revenue"
                    value={formatCurrency(movie.revenue)}
                    icon={<AttachMoney />}
                  />
                )}
              </Stack>
            </Box>

            <Box>
              {movie.production_companies.length > 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Production Companies
                  </Typography>
                  <Stack spacing={1}>
                    {movie.production_companies.slice(0, 5).map((company) => (
                      <CompanyItem key={company.id}>
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
                      </CompanyItem>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </DetailsGrid>
        </ContentSection>
      </MovieDetailsContent>
    </MovieDetailsContainer>
  );
};

export default MovieDetails;

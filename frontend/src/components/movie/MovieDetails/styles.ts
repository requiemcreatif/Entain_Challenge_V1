import { Box, IconButton, Chip, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MovieDetailsContainer = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  p: 2,
});

export const MovieDetailsContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(3),
  maxWidth: 900,
  width: "100%",
  maxHeight: "90vh",
  overflow: "auto",
  position: "relative",
  boxShadow: theme.shadows[24],
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  zIndex: 1,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
}));

export const PosterImage = styled("img")(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(22.5),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  border: `${theme.spacing(0.3)} solid white`,
}));

export const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  height: 300,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "flex-end",
  padding: theme.spacing(3),
  borderRadius: "12px 12px 0 0",
}));

export const HeroContent = styled(Box)({
  display: "flex",
  gap: 24,
  alignItems: "flex-end",
});

export const MovieInfo = styled(Box)({
  color: "white",
  flex: 1,
});

export const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const SectionBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const StatItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

export const DetailItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const DetailsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
  },
}));

export const FavoriteButton = styled(IconButton)({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

export const GenreChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 500,
}));

export const RatingProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[300],
  "& .MuiLinearProgress-bar": {
    borderRadius: 4,
  },
}));

export const CompanyItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const MovieCardContainer = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "row",
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: 4,
  },
});

export const OverlayContainer = styled(Box)({
  position: "absolute",
  top: 4,
  right: 4,
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
});

export const RatingBadge = styled(Box)({
  position: "absolute",
  bottom: 4,
  left: 4,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  borderRadius: 1,
  px: 0.8,
  py: 0.3,
});

export const MovieCardContent = styled(CardContent)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  p: 1.5,
  justifyContent: "space-between",
});

export const MovieIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.8)"
      : "rgba(255, 255, 255, 0.9)",
  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
  border:
    theme.palette.mode === "dark"
      ? "1px solid rgba(255, 255, 255, 0.2)"
      : "1px solid rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.9)"
        : "rgba(255, 255, 255, 1)",
  },
}));

export const MovieTitle = styled(Typography)({
  fontWeight: "bold",
  lineHeight: 1.3,
  mb: 0.5,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const GenreBadge = styled(Chip)({
  height: 20,
  fontSize: "0.7rem",
  backgroundColor: "primary.main",
  color: "primary.contrastText",
  fontWeight: 500,
});

export const MovieOverview = styled(Typography)({
  flexGrow: 1,
  mb: 1,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  lineHeight: 1.3,
});

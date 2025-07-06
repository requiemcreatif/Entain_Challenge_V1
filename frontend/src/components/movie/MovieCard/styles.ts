import { Card } from "@mui/material";
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

import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  size = "medium",
  fullScreen = false,
}) => {
  const getSize = () => {
    switch (size) {
      case "small":
        return 24;
      case "large":
        return 60;
      default:
        return 40;
    }
  };

  const containerStyles = fullScreen
    ? {
        position: "fixed" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
      }
    : {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      };

  return (
    <Box sx={containerStyles}>
      <CircularProgress size={getSize()} />
      {message && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;

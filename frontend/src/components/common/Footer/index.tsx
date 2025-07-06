import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Movie as MovieIcon,
  Favorite,
} from "@mui/icons-material";

interface FooterProps {
  showSocialLinks?: boolean;
  showTMDBCredit?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  showSocialLinks = true,
  showTMDBCredit = true,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 4,
        backgroundColor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-start" },
            gap: 3,
          }}
        >
          {/* Brand Section */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <MovieIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Movie Library
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 300 }}
            >
              Discover and explore your favorite movies with our modern,
              intuitive movie discovery platform.
            </Typography>
          </Box>

          {/* Links Section */}
          <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
            {showSocialLinks && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="text.primary"
                  sx={{ mb: 1, fontWeight: "medium" }}
                >
                  Connect
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent={{ xs: "center", md: "flex-end" }}
                >
                  <IconButton
                    size="small"
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.main",
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <GitHub fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.main",
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <LinkedIn fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>
            )}

            {showTMDBCredit && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Powered by
                </Typography>
                <Link
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "text.primary",
                    textDecoration: "none",
                    fontWeight: "medium",
                    "&:hover": {
                      color: "primary.main",
                      textDecoration: "underline",
                    },
                  }}
                >
                  The Movie Database (TMDB)
                </Link>
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Copyright Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            © {currentYear} Movie Library. Built for the Entain Challenge.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "text.secondary",
            }}
          >
            <Typography variant="body2">Made with</Typography>
            <Favorite sx={{ fontSize: 16, color: "error.main" }} />
            <Typography variant="body2">using React & TypeScript</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

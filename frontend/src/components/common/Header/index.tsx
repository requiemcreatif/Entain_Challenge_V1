import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Movie as MovieIcon,
  GridView,
  ViewList,
  Brightness4,
  Brightness7,
  FilterList,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setViewMode, selectViewMode } from "store/slices/moviesSlice";
import { toggleTheme, selectTheme, setSidebarOpen } from "store/slices/uiSlice";

interface HeaderProps {
  title?: string;
  showViewToggle?: boolean;
  showThemeToggle?: boolean;
  showFilterButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title = "Movie Library",
  showViewToggle = true,
  showThemeToggle = true,
  showFilterButton = true,
}) => {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector(selectViewMode);
  const theme = useAppSelector(selectTheme);

  const handleViewModeToggle = () => {
    dispatch(setViewMode(viewMode === "grid" ? "list" : "grid"));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleFilterToggle = () => {
    dispatch(setSidebarOpen(true));
  };

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        {/* Logo and Title */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <MovieIcon sx={{ mr: 2, fontSize: 28 }} />
          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {showFilterButton && (
            <Tooltip title="Open filters">
              <IconButton
                color="inherit"
                onClick={handleFilterToggle}
                aria-label="open filters"
              >
                <FilterList />
              </IconButton>
            </Tooltip>
          )}

          {showViewToggle && (
            <Tooltip
              title={`Switch to ${viewMode === "grid" ? "list" : "grid"} view`}
            >
              <IconButton
                color="inherit"
                onClick={handleViewModeToggle}
                aria-label="toggle view mode"
              >
                {viewMode === "grid" ? <ViewList /> : <GridView />}
              </IconButton>
            </Tooltip>
          )}

          {showThemeToggle && (
            <Tooltip
              title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            >
              <IconButton
                color="inherit"
                onClick={handleThemeToggle}
                aria-label="toggle theme"
              >
                {theme === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

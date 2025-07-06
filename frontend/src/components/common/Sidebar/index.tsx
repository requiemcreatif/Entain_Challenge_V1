import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
} from "@mui/material";
import {
  Close,
  FilterList,
  ExpandMore,
  Clear,
  Movie,
} from "@mui/icons-material";
import { Genre } from "types/movie.types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  selectSelectedGenres,
  selectSortBy,
  selectMinRating,
  setSelectedGenres,
  setSortBy,
  setMinRating,
  clearFilters,
} from "store/slices/moviesSlice";
import { selectSidebarOpen, setSidebarOpen } from "store/slices/uiSlice";

interface SidebarProps {
  genres: Genre[];
  isLoading?: boolean;
}

const DRAWER_WIDTH = 320;

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Popularity (High to Low)" },
  { value: "popularity.asc", label: "Popularity (Low to High)" },
  { value: "vote_average.desc", label: "Rating (High to Low)" },
  { value: "vote_average.asc", label: "Rating (Low to High)" },
  { value: "release_date.desc", label: "Release Date (Newest)" },
  { value: "release_date.asc", label: "Release Date (Oldest)" },
  { value: "title.asc", label: "Title (A-Z)" },
  { value: "title.desc", label: "Title (Z-A)" },
];

const Sidebar: React.FC<SidebarProps> = ({ genres, isLoading = false }) => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const selectedGenres = useAppSelector(selectSelectedGenres);
  const sortBy = useAppSelector(selectSortBy);
  const minRating = useAppSelector(selectMinRating);

  const handleClose = () => {
    dispatch(setSidebarOpen(false));
  };

  const handleGenreToggle = (genreId: number) => {
    const isSelected = selectedGenres.includes(genreId);
    if (isSelected) {
      dispatch(
        setSelectedGenres(selectedGenres.filter((id) => id !== genreId))
      );
    } else {
      dispatch(setSelectedGenres([...selectedGenres, genreId]));
    }
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters =
    selectedGenres.length > 0 || minRating > 0 || sortBy !== "popularity.desc";

  const sidebarContent = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterList color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Filters
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </Box>

      <Divider />

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Box sx={{ p: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={handleClearFilters}
            fullWidth
            size="small"
          >
            Clear All Filters
          </Button>
        </Box>
      )}

      {/* Scrollable Content */}
      <Box sx={{ flex: 1, overflow: "auto" }}>
        {/* Sort By */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Movie />
              <Typography variant="subtitle1" fontWeight="medium">
                Sort By
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {SORT_OPTIONS.map((option) => (
                <ListItem key={option.value} disablePadding>
                  <ListItemButton
                    selected={sortBy === option.value}
                    onClick={() => handleSortChange(option.value)}
                    sx={{ borderRadius: 1, mb: 0.5 }}
                  >
                    <ListItemText
                      primary={option.label}
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: sortBy === option.value ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Genres */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Movie />
              <Typography variant="subtitle1" fontWeight="medium">
                Genres
              </Typography>
              {selectedGenres.length > 0 && (
                <Chip
                  label={selectedGenres.length}
                  size="small"
                  color="primary"
                  sx={{ ml: "auto" }}
                />
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {isLoading ? (
              <Typography variant="body2" color="text.secondary">
                Loading genres...
              </Typography>
            ) : (
              <FormGroup>
                {genres.map((genre) => (
                  <FormControlLabel
                    key={genre.id}
                    control={
                      <Checkbox
                        checked={selectedGenres.includes(genre.id)}
                        onChange={() => handleGenreToggle(genre.id)}
                        size="small"
                      />
                    }
                    label={genre.name}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.875rem",
                      },
                    }}
                  />
                ))}
              </FormGroup>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Selected Filters Summary */}
      {hasActiveFilters && (
        <>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Active Filters
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {selectedGenres.length > 0 && (
                <Chip
                  label={`${selectedGenres.length} genre${
                    selectedGenres.length > 1 ? "s" : ""
                  }`}
                  size="small"
                  onDelete={() => dispatch(setSelectedGenres([]))}
                  color="primary"
                  variant="outlined"
                />
              )}

              {minRating > 0 && (
                <Chip
                  label={`Rating: ${minRating}+`}
                  size="small"
                  onDelete={() => dispatch(setMinRating(0))}
                  color="primary"
                  variant="outlined"
                />
              )}
              {sortBy !== "popularity.desc" && (
                <Chip
                  label={`Sort: ${
                    SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label
                  }`}
                  size="small"
                  onDelete={() => dispatch(setSortBy("popularity.desc"))}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={sidebarOpen}
      onClose={handleClose}
      variant="temporary"
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default Sidebar;

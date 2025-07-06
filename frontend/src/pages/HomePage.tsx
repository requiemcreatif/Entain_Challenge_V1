import React, { useState, useCallback, useEffect } from "react";
import { Container, Box, Typography, Pagination } from "@mui/material";
import { Movie } from "types/movie.types";
import { SearchBar, MovieList, MovieDetails, Sidebar } from "components";
import {
  useGetPopularMoviesQuery,
  useLazySearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetGenresQuery,
  useLazyDiscoverMoviesQuery,
} from "store/api/moviesApi";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  setCurrentSearchQuery,
  selectCurrentSearchQuery,
  selectViewMode,
  selectSelectedGenres,
  selectSortBy,
  selectReleaseYear,
  selectMinRating,
  setGenres,
} from "store/slices/moviesSlice";
import {
  setCurrentPage,
  selectCurrentPage,
  selectModalOpen,
  selectSelectedMovieId,
  closeModal,
} from "store/slices/uiSlice";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentSearchQuery = useAppSelector(selectCurrentSearchQuery);
  const viewMode = useAppSelector(selectViewMode);
  const currentPage = useAppSelector(selectCurrentPage);
  const modalOpen = useAppSelector(selectModalOpen);
  const selectedMovieId = useAppSelector(selectSelectedMovieId);
  const selectedGenres = useAppSelector(selectSelectedGenres);
  const sortBy = useAppSelector(selectSortBy);
  const releaseYear = useAppSelector(selectReleaseYear);
  const minRating = useAppSelector(selectMinRating);

  // State for managing search vs popular movies vs filtered movies
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isFilterMode, setIsFilterMode] = useState(false);

  // Genres query
  const { data: genresData, isLoading: isLoadingGenres } = useGetGenresQuery();

  // Popular movies query
  const {
    data: popularMoviesData,
    isLoading: isLoadingPopular,
    error: popularError,
  } = useGetPopularMoviesQuery(currentPage, {
    skip: isSearchMode || isFilterMode,
  });

  // Search movies query
  const [
    searchMovies,
    { data: searchMoviesData, isLoading: isLoadingSearch, error: searchError },
  ] = useLazySearchMoviesQuery();

  // Discover movies query
  const [
    discoverMovies,
    {
      data: discoverMoviesData,
      isLoading: isLoadingDiscover,
      error: discoverError,
    },
  ] = useLazyDiscoverMoviesQuery();

  // Movie details query
  const { data: movieDetailsData } = useGetMovieDetailsQuery(selectedMovieId!, {
    skip: !selectedMovieId || !modalOpen,
  });

  // Handle search
  const handleSearch = useCallback(
    (query: string) => {
      dispatch(setCurrentSearchQuery(query));

      if (query.trim()) {
        setIsSearchMode(true);
        setIsFilterMode(false);
        dispatch(setCurrentPage(1)); // Reset to first page
        searchMovies({
          query: query.trim(),
          page: 1,
        });
      } else {
        setIsSearchMode(false);
        if (
          selectedGenres.length > 0 ||
          releaseYear ||
          minRating > 0 ||
          sortBy !== "popularity.desc"
        ) {
          setIsFilterMode(true);
          dispatch(setCurrentPage(1));
          discoverMovies({
            page: 1,
            with_genres: selectedGenres.join(","),
            sort_by: sortBy,
            release_date_gte: releaseYear ? `${releaseYear}-01-01` : undefined,
            "vote_average.gte":
              minRating > 0 ? minRating.toString() : undefined,
          });
        }
      }
    },
    [
      dispatch,
      searchMovies,
      discoverMovies,
      selectedGenres,
      releaseYear,
      minRating,
      sortBy,
    ]
  );

  // Handle pagination
  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      dispatch(setCurrentPage(page));

      if (isSearchMode && currentSearchQuery) {
        searchMovies({
          query: currentSearchQuery,
          page,
        });
      } else if (isFilterMode) {
        discoverMovies({
          page,
          with_genres:
            selectedGenres.length > 0 ? selectedGenres.join(",") : undefined,
          sort_by: sortBy,
          release_date_gte: releaseYear ? `${releaseYear}-01-01` : undefined,
          "vote_average.gte": minRating > 0 ? minRating.toString() : undefined,
        });
      }
      // Popular movies will refetch automatically due to currentPage dependency
    },
    [
      dispatch,
      isSearchMode,
      isFilterMode,
      currentSearchQuery,
      searchMovies,
      discoverMovies,
      selectedGenres,
      sortBy,
      releaseYear,
      minRating,
    ]
  );

  const handleMovieClick = useCallback((movie: Movie) => {
    console.log("Movie clicked:", movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  useEffect(() => {
    if (genresData?.data) {
      dispatch(setGenres(genresData.data));
    }
  }, [genresData, dispatch]);

  useEffect(() => {
    if (!isSearchMode && !currentSearchQuery) {
      const hasFilters =
        selectedGenres.length > 0 ||
        releaseYear ||
        minRating > 0 ||
        sortBy !== "popularity.desc";

      if (hasFilters) {
        setIsFilterMode(true);
        dispatch(setCurrentPage(1));
        discoverMovies({
          page: 1,
          with_genres:
            selectedGenres.length > 0 ? selectedGenres.join(",") : undefined,
          sort_by: sortBy,
          release_date_gte: releaseYear ? `${releaseYear}-01-01` : undefined,
          "vote_average.gte": minRating > 0 ? minRating.toString() : undefined,
        });
      } else {
        setIsFilterMode(false);
      }
    }
  }, [
    selectedGenres,
    sortBy,
    releaseYear,
    minRating,
    isSearchMode,
    currentSearchQuery,
    dispatch,
    discoverMovies,
  ]);

  // Determine which data to show
  const isLoading = isSearchMode
    ? isLoadingSearch
    : isFilterMode
    ? isLoadingDiscover
    : isLoadingPopular;
  const error = isSearchMode
    ? searchError
    : isFilterMode
    ? discoverError
    : popularError;
  const movies = isSearchMode
    ? searchMoviesData?.data?.movies || []
    : isFilterMode
    ? discoverMoviesData?.data?.movies || []
    : popularMoviesData?.data?.movies || [];
  const pagination = isSearchMode
    ? searchMoviesData?.data?.pagination
    : isFilterMode
    ? discoverMoviesData?.data?.pagination
    : popularMoviesData?.data?.pagination;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isSearchMode
            ? `Search Results for "${currentSearchQuery}"`
            : isFilterMode
            ? "Filtered Movies"
            : "Popular Movies"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {isSearchMode
            ? `Found ${pagination?.totalResults || 0} movies`
            : isFilterMode
            ? `Found ${
                pagination?.totalResults || 0
              } movies with applied filters`
            : "Discover the most popular movies right now"}
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for movies..."
            isLoading={isLoading}
            initialValue={currentSearchQuery}
          />
        </Box>
      </Box>

      {/* Movies List */}
      <MovieList
        movies={movies}
        isLoading={isLoading}
        error={error ? "Failed to load movies. Please try again." : null}
        onMovieClick={handleMovieClick}
        viewMode={viewMode}
        emptyMessage={
          isSearchMode
            ? `No movies found for "${currentSearchQuery}"`
            : "No movies available"
        }
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pagination.totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Movie Details Modal */}
      {modalOpen && selectedMovieId && movieDetailsData?.data && (
        <MovieDetails
          movie={movieDetailsData.data}
          onClose={handleCloseModal}
        />
      )}

      {/* Sidebar */}
      <Sidebar genres={genresData?.data || []} isLoading={isLoadingGenres} />
    </Container>
  );
};

export default HomePage;

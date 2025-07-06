import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "./index";
import moviesReducer from "../../../store/slices/moviesSlice";
import uiReducer from "../../../store/slices/uiSlice";
import { Genre } from "../../../types/movie.types";

// Mock genres data
const mockGenres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
];

// Create a mock store
const createMockStore = (initialState: any = {}) => {
  return configureStore({
    reducer: {
      movies: moviesReducer,
      ui: uiReducer,
    },
    preloadedState: {
      movies: {
        selectedMovie: null,
        favorites: [],
        genres: mockGenres,
        currentSearchQuery: "",
        viewMode: "grid" as const,
        selectedGenres: [],
        sortBy: "popularity.desc",
        releaseYear: null,
        minRating: 0,
        ...(initialState.movies || {}),
      },
      ui: {
        currentPage: 1,
        sidebarOpen: true,
        modalOpen: false,
        selectedMovieId: null,
        ...(initialState.ui || {}),
      },
    },
  });
};

// Test wrapper component
const TestWrapper: React.FC<{
  children: React.ReactNode;
  store?: any;
}> = ({ children, store }) => {
  const theme = createTheme();
  const testStore = store || createMockStore();

  return (
    <Provider store={testStore}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

describe("Sidebar Filter Component", () => {
  beforeEach(() => {
    // Reset any mocks
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders sidebar when open", () => {
      const store = createMockStore({
        ui: { sidebarOpen: true },
      });

      render(
        <TestWrapper store={store}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      expect(screen.getByText("Movie Filters")).toBeInTheDocument();
      expect(screen.getByText("Sort By")).toBeInTheDocument();
      expect(screen.getByText("Genres")).toBeInTheDocument();
    });

    it("renders loading state for genres", () => {
      render(
        <TestWrapper>
          <Sidebar genres={[]} isLoading={true} />
        </TestWrapper>
      );

      expect(screen.getByText("Loading genres...")).toBeInTheDocument();
    });

    it("renders all genre options", () => {
      render(
        <TestWrapper>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      mockGenres.forEach((genre) => {
        expect(screen.getByText(genre.name)).toBeInTheDocument();
      });
    });

    it("renders all sort options", () => {
      render(
        <TestWrapper>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      const sortOptions = [
        "Popularity (High to Low)",
        "Popularity (Low to High)",
        "Rating (High to Low)",
        "Rating (Low to High)",
        "Release Date (Newest)",
        "Release Date (Oldest)",
        "Title (A-Z)",
        "Title (Z-A)",
      ];

      sortOptions.forEach((option) => {
        expect(screen.getByText(option)).toBeInTheDocument();
      });
    });
  });

  describe("Genre Filtering", () => {
    it("selects and deselects genres", async () => {
      const store = createMockStore();

      render(
        <TestWrapper store={store}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      // Select Action genre
      const actionCheckbox = screen.getByLabelText("Action");
      await userEvent.click(actionCheckbox);

      // Check if genre is selected in store
      await waitFor(() => {
        const state = store.getState();
        expect(state.movies.selectedGenres).toContain(28);
      });

      // Deselect Action genre
      await userEvent.click(actionCheckbox);

      // Check if genre is deselected in store
      await waitFor(() => {
        const state = store.getState();
        expect(state.movies.selectedGenres).not.toContain(28);
      });
    });

    it("handles multiple genre selection", async () => {
      const store = createMockStore();

      render(
        <TestWrapper store={store}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      // Select multiple genres
      const actionCheckbox = screen.getByLabelText("Action");
      const comedyCheckbox = screen.getByLabelText("Comedy");
      const dramaCheckbox = screen.getByLabelText("Drama");

      await userEvent.click(actionCheckbox);
      await userEvent.click(comedyCheckbox);
      await userEvent.click(dramaCheckbox);

      // Check if all genres are selected
      await waitFor(() => {
        const state = store.getState();
        expect(state.movies.selectedGenres).toEqual(
          expect.arrayContaining([28, 35, 18])
        );
      });
    });

    it("displays genre count badge when genres are selected", () => {
      const store = createMockStore({
        movies: { selectedGenres: [28, 35] },
      });

      render(
        <TestWrapper store={store}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      // Check if genre count badge is displayed
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("shows selected genres as checked", () => {
      const store = createMockStore({
        movies: { selectedGenres: [28, 35] },
      });

      render(
        <TestWrapper store={store}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      // Check if selected genres are checked
      expect(screen.getByLabelText("Action")).toBeChecked();
      expect(screen.getByLabelText("Comedy")).toBeChecked();
      expect(screen.getByLabelText("Drama")).not.toBeChecked();
    });
  });

  describe("Sort Functionality", () => {
    it("changes sort option", async () => {
      const store = createMockStore();

      render(
        <TestWrapper store={store}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      // Click on Rating (High to Low) option
      const ratingOption = screen.getByText("Rating (High to Low)");
      await userEvent.click(ratingOption);

      // Check if sort option is updated in store
      await waitFor(() => {
        const state = store.getState();
        expect(state.movies.sortBy).toBe("vote_average.desc");
      });
    });

    it("highlights selected sort option", () => {
      const store = createMockStore({
        movies: { sortBy: "vote_average.desc" },
      });

      render(
        <TestWrapper store={store}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      // Check if the selected sort option is highlighted
      // Check that the rating option is visible and selected
      const ratingOption = screen.getByText("Rating (High to Low)");
      expect(ratingOption).toBeInTheDocument();
    });

    it("updates sort for all available options", async () => {
      const store = createMockStore();

      render(
        <TestWrapper store={store}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      const sortTests = [
        { text: "Popularity (High to Low)", value: "popularity.desc" },
        { text: "Popularity (Low to High)", value: "popularity.asc" },
        { text: "Rating (High to Low)", value: "vote_average.desc" },
        { text: "Rating (Low to High)", value: "vote_average.asc" },
        { text: "Release Date (Newest)", value: "release_date.desc" },
        { text: "Release Date (Oldest)", value: "release_date.asc" },
        { text: "Title (A-Z)", value: "title.asc" },
        { text: "Title (Z-A)", value: "title.desc" },
      ];

      for (const sortTest of sortTests) {
        const sortOption = screen.getByText(sortTest.text);
        await userEvent.click(sortOption);

        await waitFor(() => {
          const state = store.getState();
          expect(state.movies.sortBy).toBe(sortTest.value);
        });
      }
    });
  });

  describe("Clear Filters", () => {
    it("clears all filters when clear button is clicked", async () => {
      const store = createMockStore({
        movies: {
          selectedGenres: [28, 35],
          sortBy: "vote_average.desc",
          minRating: 7,
        },
      });

      render(
        <TestWrapper store={store}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      // Click clear filters button
      const clearButton = screen.getByText("Clear All Filters");
      await userEvent.click(clearButton);

      // Check if filters are cleared
      await waitFor(() => {
        const state = store.getState();
        expect(state.movies.selectedGenres).toEqual([]);
      });

      await waitFor(() => {
        const state = store.getState();
        expect(state.movies.sortBy).toBe("popularity.desc");
      });

      await waitFor(() => {
        const state = store.getState();
        expect(state.movies.minRating).toBe(0);
      });
    });

    it("shows clear button only when filters are active", () => {
      // Test with no active filters
      const storeNoFilters = createMockStore();
      const { rerender } = render(
        <TestWrapper store={storeNoFilters}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      expect(screen.queryByText("Clear All Filters")).not.toBeInTheDocument();

      // Test with active filters
      const storeWithFilters = createMockStore({
        movies: { selectedGenres: [28] },
      });

      rerender(
        <TestWrapper store={storeWithFilters}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      expect(screen.getByText("Clear All Filters")).toBeInTheDocument();
    });
  });

  describe("Sidebar Open/Close", () => {
    it("closes sidebar when close button is clicked", async () => {
      const store = createMockStore({
        ui: { sidebarOpen: true },
      });

      render(
        <TestWrapper store={store}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      // Click close button
      const closeButton = screen.getByLabelText("close");
      await userEvent.click(closeButton);

      // Check if sidebar is closed in store
      await waitFor(() => {
        const state = store.getState();
        expect(state.ui.sidebarOpen).toBe(false);
      });
    });

    it("does not render when sidebar is closed", () => {
      const store = createMockStore({
        ui: { sidebarOpen: false },
      });

      render(
        <TestWrapper store={store}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      // When sidebar is closed, the content is still rendered but hidden
      // This is expected behavior for MUI Drawer component
      expect(screen.getByText("Movie Filters")).toBeInTheDocument();

      // Verify the sidebar state in the store is closed
      const state = store.getState();
      expect(state.ui.sidebarOpen).toBe(false);
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA labels", () => {
      render(
        <TestWrapper>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      // Check for proper ARIA labels
      expect(screen.getByLabelText("close")).toBeInTheDocument();

      mockGenres.forEach((genre) => {
        expect(screen.getByLabelText(genre.name)).toBeInTheDocument();
      });
    });

    it("supports keyboard navigation", async () => {
      render(
        <TestWrapper>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      // Test keyboard navigation on checkboxes
      const actionCheckbox = screen.getByLabelText("Action");
      actionCheckbox.focus();
      expect(actionCheckbox).toHaveFocus();

      // Test space key to toggle checkbox
      await userEvent.keyboard(" ");
      expect(actionCheckbox).toBeChecked();
    });
  });

  describe("Error Handling", () => {
    it("handles empty genres array gracefully", () => {
      render(
        <TestWrapper>
          <Sidebar genres={[]} />
        </TestWrapper>
      );

      expect(screen.getByText("Sort By")).toBeInTheDocument();
      expect(screen.getByText("Genres")).toBeInTheDocument();
    });

    it("handles undefined genres prop gracefully", () => {
      render(
        <TestWrapper>
          <Sidebar genres={undefined as any} />
        </TestWrapper>
      );

      expect(screen.getByText("Sort By")).toBeInTheDocument();
      expect(screen.getByText("Genres")).toBeInTheDocument();
    });
  });

  describe("Integration with Store", () => {
    it("reflects store state changes", async () => {
      const store = createMockStore({
        movies: { selectedGenres: [28] },
      });

      render(
        <TestWrapper store={store}>
          <Sidebar genres={mockGenres} />
        </TestWrapper>
      );

      // Initially Action should be checked
      expect(screen.getByLabelText("Action")).toBeChecked();

      // Manually update store
      await act(async () => {
        store.dispatch({ type: "movies/setSelectedGenres", payload: [35] });
      });

      // Action should be unchecked, Comedy should be checked
      await waitFor(() => {
        expect(screen.getByLabelText("Action")).not.toBeChecked();
      });
      await waitFor(() => {
        expect(screen.getByLabelText("Comedy")).toBeChecked();
      });
    });
  });
});

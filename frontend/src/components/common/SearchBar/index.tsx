import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useDebounce } from "hooks";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  suggestions?: string[];
  initialValue?: string;
  debounceMs?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search movies...",
  isLoading = false,
  suggestions = [],
  initialValue = "",
  debounceMs = 500,
}) => {
  const [searchValue, setSearchValue] = useState(initialValue);
  const debouncedSearchValue = useDebounce(searchValue, debounceMs);

  useEffect(() => {
    onSearch(debouncedSearchValue);
  }, [debouncedSearchValue, onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  const handleAutocompleteChange = (event: any, newValue: string | null) => {
    setSearchValue(newValue || "");
  };

  if (suggestions.length > 0) {
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <Autocomplete
          freeSolo
          options={suggestions}
          value={searchValue}
          onChange={handleAutocompleteChange}
          onInputChange={(event, newInputValue) => {
            setSearchValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              variant="outlined"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {searchValue && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClear}
                          edge="end"
                          size="small"
                          aria-label="clear search"
                        >
                          <Clear />
                        </IconButton>
                      </InputAdornment>
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <TextField
        value={searchValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                edge="end"
                size="small"
                aria-label="clear search"
                disabled={isLoading}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;

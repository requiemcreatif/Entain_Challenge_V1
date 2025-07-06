// Image URL utilities for TMDB
export const getImageUrl = (
  path: string | null,
  size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500"
): string => {
  if (!path) {
    return "/images/image_placeholder.jpg";
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Format date utilities
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatYear = (dateString: string): string => {
  const date = new Date(dateString);
  return date.getFullYear().toString();
};

// Rating utilities
export const formatRating = (rating: number): string => {
  return (Math.round(rating * 10) / 10).toString();
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 8) return "#4caf50"; // Green
  if (rating >= 6) return "#ff9800"; // Orange
  if (rating >= 4) return "#f44336"; // Red
  return "#9e9e9e"; // Gray
};

// Text utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Local storage utilities
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage errors silently
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle storage errors silently
    }
  },
};

// Genre utilities
export const getGenreNames = (
  genreIds: number[],
  allGenres: { id: number; name: string }[]
): string[] => {
  return genreIds
    .map((id) => allGenres.find((genre) => genre.id === id)?.name)
    .filter(Boolean) as string[];
};

export const formatGenres = (
  genreIds: number[],
  allGenres: { id: number; name: string }[]
): string => {
  const genreNames = getGenreNames(genreIds, allGenres);
  return genreNames.join(", ");
};

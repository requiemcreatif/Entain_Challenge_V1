// Movie interface matching backend response
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  video: boolean;
}

// Detailed movie interface
export interface MovieDetails extends Movie {
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}

// Genre interface
export interface Genre {
  id: number;
  name: string;
}

// Collection interface
export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

// Production company interface
export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

// Production country interface
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Spoken language interface
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// Pagination interface
export interface Pagination {
  page: number;
  totalPages: number;
  totalResults: number;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

// API response types for different endpoints
export interface MoviesListResponse {
  movies: Movie[];
  pagination: Pagination;
}

export interface SearchMoviesResponse extends MoviesListResponse {
  searchQuery: string;
}

export interface DiscoverMoviesResponse extends MoviesListResponse {
  filters: {
    genres?: string;
    sortBy?: string;
    releaseDateGte?: string;
    releaseDateLte?: string;
  };
}

// Search and filter params
export interface SearchParams {
  query?: string;
  page?: number;
  include_adult?: boolean;
}

export interface DiscoverParams {
  page?: number;
  with_genres?: string;
  sort_by?: string;
  release_date_gte?: string;
  release_date_lte?: string;
  "vote_average.gte"?: string;
}

// UI State interfaces
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

export interface MovieListProps {
  movies: Movie[];
  isLoading?: boolean;
  error?: string | null;
  onMovieClick?: (movie: Movie) => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

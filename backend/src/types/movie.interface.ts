// Base movie interface based on TMDB API response
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

// Detailed movie interface with additional fields
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

// TMDB API response wrapper
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Search query interface
export interface SearchQuery {
  query?: string;
  page?: number;
  include_adult?: boolean;
  region?: string;
  year?: number;
  with_genres?: string;
}

// Configuration interface for TMDB
export interface TMDBConfiguration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

// API response wrapper for our API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

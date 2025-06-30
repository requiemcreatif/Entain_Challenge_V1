import { Injectable, Logger } from '@nestjs/common';
import { TMDBService } from '../tmdb/tmdb.service';
import {
  Movie,
  MovieDetails,
  Genre,
  TMDBResponse,
  SearchQuery,
} from '../types/movie.interface';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(private readonly tmdbService: TMDBService) {}

  /**
   * Get popular movies from TMDB
   */
  async getPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    this.logger.log(`Fetching popular movies - page: ${page}`);
    return this.tmdbService.getPopularMovies(page);
  }

  /**
   * Search movies by title
   */
  async searchMovies(searchQuery: SearchQuery): Promise<TMDBResponse<Movie>> {
    this.logger.log(`Searching movies with query: "${searchQuery.query}"`);
    return this.tmdbService.searchMovies(searchQuery);
  }

  /**
   * Get movie details by ID
   */
  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    this.logger.log(`Fetching movie details for ID: ${movieId}`);
    return this.tmdbService.getMovieDetails(movieId);
  }

  /**
   * Get list of movie genres
   */
  async getGenres(): Promise<{ genres: Genre[] }> {
    this.logger.log('Fetching movie genres');
    return this.tmdbService.getGenres();
  }

  /**
   * Discover movies with filters
   */
  async discoverMovies(params: {
    page?: number;
    with_genres?: string;
    sort_by?: string;
    release_date_gte?: string;
    release_date_lte?: string;
  }): Promise<TMDBResponse<Movie>> {
    this.logger.log(`Discovering movies with filters:`, params);
    return this.tmdbService.discoverMovies(params);
  }

  /**
   * Get complete poster URL for a movie
   */
  async getMoviePosterUrl(
    posterPath: string,
    size: string = 'w500',
  ): Promise<string> {
    return this.tmdbService.getPosterUrl(posterPath, size);
  }

  /**
   * Get complete backdrop URL for a movie
   */
  async getMovieBackdropUrl(
    backdropPath: string,
    size: string = 'w1280',
  ): Promise<string> {
    return this.tmdbService.getBackdropUrl(backdropPath, size);
  }
}

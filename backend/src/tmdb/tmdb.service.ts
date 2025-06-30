import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  Movie,
  MovieDetails,
  Genre,
  TMDBResponse,
  TMDBConfiguration,
  SearchQuery,
} from '../types/movie.interface';

@Injectable()
export class TMDBService {
  private readonly logger = new Logger(TMDBService.name);
  private readonly httpClient: AxiosInstance;
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private configuration: TMDBConfiguration | null = null;

  constructor(private configService: ConfigService) {
    this.baseUrl =
      this.configService.get<string>('TMDB_BASE_URL') ||
      'https://api.themoviedb.org/3';
    this.apiKey = this.configService.get<string>('TMDB_API_KEY');

    if (!this.apiKey) {
      throw new Error('TMDB_API_KEY is required in environment variables');
    }

    // Setup axios instance with Bearer token authentication
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    // Request interceptor for logging
    this.httpClient.interceptors.request.use(
      (config) => {
        this.logger.log(`Making request to: ${config.url}`);
        return config;
      },
      (error) => {
        this.logger.error('Request error:', error);
        return Promise.reject(error);
      },
    );

    // Response interceptor for error handling
    this.httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        this.logger.error('API Error:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          throw new HttpException('Invalid API key', HttpStatus.UNAUTHORIZED);
        }
        if (error.response?.status === 404) {
          throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
        }
        throw new HttpException(
          'External API error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      },
    );
  }

  /**
   * Get TMDB configuration for image URLs and sizes
   */
  async getConfiguration(): Promise<TMDBConfiguration> {
    try {
      if (this.configuration) {
        return this.configuration;
      }

      const response: AxiosResponse<TMDBConfiguration> =
        await this.httpClient.get('/configuration');
      this.configuration = response.data;
      this.logger.log('TMDB configuration fetched successfully');
      return this.configuration;
    } catch (error) {
      this.logger.error('Failed to fetch TMDB configuration:', error);
      throw error;
    }
  }

  /**
   * Get popular movies from TMDB
   */
  async getPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    try {
      const response: AxiosResponse<TMDBResponse<Movie>> =
        await this.httpClient.get('/movie/popular', {
          params: { page },
        });

      this.logger.log(
        `Fetched popular movies - Page: ${page}, Results: ${response.data.results.length}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch popular movies:', error);
      throw error;
    }
  }

  /**
   * Search movies by title
   */
  async searchMovies(searchQuery: SearchQuery): Promise<TMDBResponse<Movie>> {
    try {
      const { query, page = 1, include_adult = false } = searchQuery;

      if (!query || query.trim().length === 0) {
        throw new HttpException(
          'Search query is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const response: AxiosResponse<TMDBResponse<Movie>> =
        await this.httpClient.get('/search/movie', {
          params: {
            query: query.trim(),
            page,
            include_adult,
          },
        });

      this.logger.log(
        `Search results for "${query}" - Page: ${page}, Results: ${response.data.results.length}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error('Failed to search movies:', error);
      throw error;
    }
  }

  /**
   * Get movie details by ID
   */
  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    try {
      const response: AxiosResponse<MovieDetails> = await this.httpClient.get(
        `/movie/${movieId}`,
      );

      this.logger.log(`Fetched movie details for ID: ${movieId}`);
      return response.data;
    } catch (error) {
      this.logger.error(
        `Failed to fetch movie details for ID ${movieId}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Get list of movie genres
   */
  async getGenres(): Promise<{ genres: Genre[] }> {
    try {
      const response: AxiosResponse<{ genres: Genre[] }> =
        await this.httpClient.get('/genre/movie/list');

      this.logger.log(`Fetched ${response.data.genres.length} movie genres`);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch movie genres:', error);
      throw error;
    }
  }

  /**
   * Discover movies with filters (including genre filtering)
   */
  async discoverMovies(params: {
    page?: number;
    with_genres?: string;
    sort_by?: string;
    release_date_gte?: string;
    release_date_lte?: string;
  }): Promise<TMDBResponse<Movie>> {
    try {
      const { page = 1, ...filterParams } = params;

      const response: AxiosResponse<TMDBResponse<Movie>> =
        await this.httpClient.get('/discover/movie', {
          params: {
            page,
            ...filterParams,
          },
        });

      this.logger.log(
        `Discovered movies - Page: ${page}, Results: ${response.data.results.length}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error('Failed to discover movies:', error);
      throw error;
    }
  }

  /**
   * Build complete image URL from TMDB path
   */
  async getImageUrl(imagePath: string, size: string = 'w500'): Promise<string> {
    if (!imagePath) {
      return '';
    }

    const config = await this.getConfiguration();
    return `${config.images.secure_base_url}${size}${imagePath}`;
  }

  /**
   * Build complete poster URL
   */
  async getPosterUrl(
    posterPath: string,
    size: string = 'w500',
  ): Promise<string> {
    return this.getImageUrl(posterPath, size);
  }

  /**
   * Build complete backdrop URL
   */
  async getBackdropUrl(
    backdropPath: string,
    size: string = 'w1280',
  ): Promise<string> {
    return this.getImageUrl(backdropPath, size);
  }
}

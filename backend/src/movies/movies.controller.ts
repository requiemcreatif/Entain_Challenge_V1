import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { MoviesService } from './movies.service';
import {
  Movie,
  MovieDetails,
  Genre,
  ApiResponse as ApiResponseType,
} from '../types/movie.interface';

@ApiTags('movies')
@Controller('movies')
@UseGuards(ThrottlerGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Get popular movies' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of popular movies retrieved successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getPopularMovies(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
  ): Promise<
    ApiResponseType<{
      movies: Movie[];
      pagination: {
        page: number;
        totalPages: number;
        totalResults: number;
      };
    }>
  > {
    try {
      const result = await this.moviesService.getPopularMovies(page);

      return {
        success: true,
        data: {
          movies: result.results,
          pagination: {
            page: result.page,
            totalPages: result.total_pages,
            totalResults: result.total_results,
          },
        },
      };
    } catch {
      throw new HttpException(
        'Failed to fetch popular movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  @ApiOperation({ summary: 'Search movies by title' })
  @ApiQuery({
    name: 'q',
    required: true,
    type: String,
    description: 'Search query',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'include_adult',
    required: false,
    type: Boolean,
    description: 'Include adult content (default: false)',
  })
  @ApiResponse({
    status: 200,
    description: 'Search results retrieved successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - missing search query',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async searchMovies(
    @Query('q') query: string,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('include_adult') includeAdult: boolean = false,
  ): Promise<
    ApiResponseType<{
      movies: Movie[];
      pagination: {
        page: number;
        totalPages: number;
        totalResults: number;
      };
      searchQuery: string;
    }>
  > {
    try {
      if (!query || query.trim().length === 0) {
        throw new HttpException(
          'Search query is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.moviesService.searchMovies({
        query: query.trim(),
        page,
        include_adult: includeAdult,
      });

      return {
        success: true,
        data: {
          movies: result.results,
          pagination: {
            page: result.page,
            totalPages: result.total_pages,
            totalResults: result.total_results,
          },
          searchQuery: query.trim(),
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to search movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('genres')
  @ApiOperation({ summary: 'Get list of movie genres' })
  @ApiResponse({
    status: 200,
    description: 'List of genres retrieved successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getGenres(): Promise<ApiResponseType<Genre[]>> {
    try {
      const result = await this.moviesService.getGenres();

      return {
        success: true,
        data: result.genres,
      };
    } catch {
      throw new HttpException(
        'Failed to fetch genres',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('discover')
  @ApiOperation({ summary: 'Discover movies with filters' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'with_genres',
    required: false,
    type: String,
    description: 'Comma-separated genre IDs',
  })
  @ApiQuery({
    name: 'sort_by',
    required: false,
    type: String,
    description: 'Sort order (e.g., popularity.desc)',
  })
  @ApiQuery({
    name: 'release_date_gte',
    required: false,
    type: String,
    description: 'Minimum release date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'release_date_lte',
    required: false,
    type: String,
    description: 'Maximum release date (YYYY-MM-DD)',
  })
  @ApiResponse({
    status: 200,
    description: 'Filtered movies retrieved successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async discoverMovies(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('with_genres') withGenres?: string,
    @Query('sort_by') sortBy?: string,
    @Query('release_date_gte') releaseDateGte?: string,
    @Query('release_date_lte') releaseDateLte?: string,
  ): Promise<
    ApiResponseType<{
      movies: Movie[];
      pagination: {
        page: number;
        totalPages: number;
        totalResults: number;
      };
      filters: {
        genres?: string;
        sortBy?: string;
        releaseDateGte?: string;
        releaseDateLte?: string;
      };
    }>
  > {
    try {
      const result = await this.moviesService.discoverMovies({
        page,
        with_genres: withGenres,
        sort_by: sortBy,
        release_date_gte: releaseDateGte,
        release_date_lte: releaseDateLte,
      });

      return {
        success: true,
        data: {
          movies: result.results,
          pagination: {
            page: result.page,
            totalPages: result.total_pages,
            totalResults: result.total_results,
          },
          filters: {
            genres: withGenres,
            sortBy,
            releaseDateGte,
            releaseDateLte,
          },
        },
      };
    } catch {
      throw new HttpException(
        'Failed to discover movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get movie details by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie details retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getMovieDetails(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseType<MovieDetails>> {
    try {
      const movie = await this.moviesService.getMovieDetails(id);

      return {
        success: true,
        data: movie,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch movie details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

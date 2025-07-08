# Movie Library Backend

NestJS backend service for the Movie Library application, providing a RESTful API that integrates with The Movie Database (TMDB) API.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **TMDB API Key** - Get one free at [themoviedb.org](https://www.themoviedb.org/documentation/api)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Configuration

Edit `.env` file and add your TMDB API key:

```env
TMDB_API_KEY=your_actual_api_key_here
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3001
TMDB_BASE_URL=https://api.themoviedb.org/3
```

### Running the Application

```bash
# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:
**http://localhost:3000/api/docs**

### Available Endpoints

#### Movies

- **GET** `/api/movies` - Get popular movies
  - Query params: `page` (optional, default: 1)
  - Response: Paginated list of movies

- **GET** `/api/movies/search` - Search movies by title
  - Query params: `query` (required), `page` (optional)
  - Response: Search results with pagination

- **GET** `/api/movies/:id` - Get detailed movie information
  - Path params: `id` (movie ID)
  - Response: Detailed movie object

- **GET** `/api/movies/genres` - Get available movie genres
  - Response: List of genre objects

- **GET** `/api/movies/discover` - Discover movies with filters
  - Query params: `with_genres`, `page`, `sort_by`, etc.
  - Response: Filtered movie results

#### Health Check

- **GET** `/` - Basic health check
  - Response: "Hello World!" message

## 🔧 Development

### Project Structure

```
backend/
├── src/
│   ├── movies/          # Movies module
│   │   ├── movies.controller.ts
│   │   ├── movies.service.ts
│   │   └── movies.module.ts
│   ├── tmdb/            # TMDB API integration
│   │   ├── tmdb.service.ts
│   │   └── tmdb.module.ts
│   ├── types/           # TypeScript interfaces
│   │   └── movie.interface.ts
│   ├── app.module.ts    # Root module
│   └── main.ts          # Application entry point
├── test/                # E2E tests
├── .env.example         # Environment template
└── package.json
```

## 🐳 Docker Support

### Using Docker

```bash
# Build image
docker build -t movie-backend .

# Run container
docker run -p 3000:3000 --env-file .env movie-backend
```

### Using Docker Compose (from project root)

```bash
# Run both backend and frontend
docker-compose up --build

# Backend only
docker-compose up backend
```

## 🔒 Security & Rate Limiting

The API includes:

- **CORS** protection (configurable origins)
- **Rate limiting** (100 requests per minute by default)
- **Input validation** using class-validator
- **Request sanitization**

## 🌍 Environment Variables

| Variable         | Description                  | Default                        |
| ---------------- | ---------------------------- | ------------------------------ |
| `TMDB_API_KEY`   | Your TMDB API key (required) | -                              |
| `NODE_ENV`       | Environment mode             | `development`                  |
| `PORT`           | Server port                  | `3000`                         |
| `FRONTEND_URL`   | Frontend URL for CORS        | `http://localhost:3001`        |
| `TMDB_BASE_URL`  | TMDB API base URL            | `https://api.themoviedb.org/3` |
| `RATE_LIMIT_TTL` | Rate limit window (seconds)  | `60`                           |
| `RATE_LIMIT_MAX` | Max requests per window      | `100`                          |


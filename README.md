# Entain Movie Library Challenge

Movie library application built with **NestJS** backend and **React TypeScript** frontend, integrating with The Movie Database (TMDB) API.

## Features

### Core Features

- **Movie Listing**: Browse a collection of popular movies
- **Movie Search**: Search for movies by title
- **Genre Filtering**: Filter movies by different genres (optional)
- **Responsive Design**: Mobile-first responsive interface

### Technical Features

- **NestJS Backend**: RESTful API with TypeScript
- **React Frontend**: Modern React with TypeScript
- **Material-UI**: Beautiful and accessible UI components
- **Redux Toolkit**: Efficient state management
- **RTK Query**: Data fetching and caching
- **React Hook Form**: Form handling and validation
- **Testing**: Comprehensive test coverage
- **Docker**: Containerized deployment (optional)

## Project Structure

```
entain_challenge/
├── backend/              # NestJS API server
│   ├── src/
│   │   ├── movies/      # Movie module
│   │   ├── tmdb/        # TMDB API integration
│   │   └── main.ts      # Application entry point
│   ├── .env.example     # Environment variables template
│   └── package.json
├── frontend/            # React TypeScript app
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux store
│   │   ├── services/    # API services
│   │   └── types/       # TypeScript types
│   └── package.json
├── docker-compose.yml   # Docker composition
└── package.json         # Root package management
```

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **TMDB API Key** (free registration at [themoviedb.org](https://www.themoviedb.org/documentation/api))

## ⚡ Quick Start

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd entain_challenge
npm run install:all
```

### 2. Configure Environment Variables

Create environment files for the backend:

```bash
# Backend configuration
cd backend
cp .env.example .env
```

Edit `backend/.env` and add your TMDB API key:

```env
TMDB_API_KEY=your_actual_api_key_here
```

### 3. Start Development Servers

From the root directory:

```bash
# Start both backend and frontend simultaneously
npm run dev
```

This will start:

- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:3001

### 4. Individual Server Commands

```bash
# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend
```

## Testing

```bash
# Run all tests
npm run test

# Backend tests only
npm run test:backend

# Frontend tests only
npm run test:frontend
```

## 🏗️ Building for Production

```bash
# Build both applications
npm run build

# Build individually
npm run build:backend
npm run build:frontend
```

## API Documentation

### Available Endpoints

```
GET /api/movies          # List popular movies
GET /api/movies/search   # Search movies by title
GET /api/movies/genres   # Get available genres
GET /api/movies/:id      # Get movie details
```

## Deployment

### GitHub Pages (Frontend)

The frontend is configured for GitHub Pages deployment:

```bash
npm run build:frontend
# Deploy to your GitHub Pages
```

## 🐳 Docker Support

```bash
# Build and run with Docker
docker-compose up --build

# Production build
docker-compose -f docker-compose.prod.yml up --build
```

## 🔧 Development Notes

Given more time, the following enhancements would be implemented:

- **User Authentication**: User accounts and personalized experiences
- **Advanced Filtering**: Multiple filter combinations and sorting options
- **Internationalization**: Multi-language support
- **Database Integration**: PostgreSQL for additional data storage

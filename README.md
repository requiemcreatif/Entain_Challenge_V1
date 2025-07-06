# Entain Movie Library Challenge

Movie library application built with **NestJS** backend and **React TypeScript** frontend, integrating with The Movie Database (TMDB) API.

> **📋 Note for Evaluators:** The frontend is deployed on GitHub Pages, but **movies won't load without the backend**. To test the full functionality, please clone the repository and run locally as described in the [Quick Start](#-quick-start) section below.

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
```

Edit `backend/.env` and add your TMDB API key:

```env
TMDB_API_KEY=your_actual_api_key_here
```

### 3. Set up the backend:

```bash
cd backend
cp .env.example .env
# Edit .env and add your TMDB API key:
# TMDB_API_KEY=your_actual_api_key_here
```

4. **Install dependencies and run:**

```bash
# From project root
npm run install:all
npm run dev
```

5. **Access the application:**
   - **Frontend**: http://localhost:3001
   - **Backend API**: http://localhost:3000/api
   - **API Documentation**: http://localhost:3000/api/docs

#### Alternative: Docker Setup

```bash
# Copy environment file
cp env.example .env
# Edit .env and add your TMDB API key

# Run with Docker
docker-compose up --build
```

### GitHub Pages (Frontend Only)

The frontend is automatically deployed to GitHub Pages, but **movies won't load without a backend**.

#### Automatic Deployment (Recommended)

The project includes GitHub Actions for automatic deployment:

1. **Enable GitHub Pages** in your repository settings:

   - Go to Settings → Pages
   - Source: "GitHub Actions"

2. **Add Repository Secrets** (if using external API):

   - Go to Settings → Secrets and variables → Actions
   - Add `REACT_APP_API_URL` with your backend URL

3. **Push to main/master branch** - deployment happens automatically!

#### Manual Deployment

```bash
# Make script executable
chmod +x deploy-github-pages.sh

# Deploy manually
./deploy-github-pages.sh
```

#### Alternative Manual Method

```bash
cd frontend
npm install --save-dev gh-pages
npm run build
npx gh-pages -d build
```

Your app will be available at: `https://[username].github.io/[repository-name]`

**Note:** The GitHub Pages deployment shows the UI but displays "Error Loading Movies" because there's no backend. For full functionality, clone and run locally as described above.

## 🚀 Deployment

### ⚠️ Important: Backend Deployment Required

**The GitHub Pages deployment only serves the frontend (React app).** To see the full functionality with movie data, you need to run the backend separately.

### Option 1: Full Vercel Deployment (Recommended)

Deploy both frontend and backend to Vercel for a complete, live application:

📋 **[See Complete Vercel Deployment Guide](VERCEL_DEPLOYMENT.md)**

**Quick Steps:**

1. Deploy backend to Vercel (set root directory to `backend`)
2. Deploy frontend to Vercel (set root directory to `frontend`)
3. Configure environment variables
4. Update CORS settings

**Result:** Fully functional live application with both UI and API

### Option 2: Local Development

#### For Users Wanting to Test the Full Application:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd entain_challenge
   ```

2. **Get a TMDB API key:**

   - Register for free at [themoviedb.org](https://www.themoviedb.org/documentation/api)
   - Get your API key from your account settings

3. **Set up the backend:**

   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and add your TMDB API key:
   # TMDB_API_KEY=your_actual_api_key_here
   ```

4. **Install dependencies and run:**

   ```bash
   # From project root
   npm run install:all
   npm run dev
   ```

5. **Access the application:**
   - **Frontend**: http://localhost:3001
   - **Backend API**: http://localhost:3000/api
   - **API Documentation**: http://localhost:3000/api/docs

#### Alternative: Docker Setup

```bash
# Copy environment file
cp env.example .env
# Edit .env and add your TMDB API key

# Run with Docker
docker-compose up --build
```

### Option 3: GitHub Pages (Frontend Only)

The frontend is automatically deployed to GitHub Pages, but **movies won't load without a backend**.

#### Automatic Deployment (Recommended)

The project includes GitHub Actions for automatic deployment:

1. **Enable GitHub Pages** in your repository settings:

   - Go to Settings → Pages
   - Source: "GitHub Actions"

2. **Add Repository Secrets** (if using external API):

   - Go to Settings → Secrets and variables → Actions
   - Add `REACT_APP_API_URL` with your backend URL

3. **Push to main/master branch** - deployment happens automatically!

#### Manual Deployment

```bash
# Make script executable
chmod +x deploy-github-pages.sh

# Deploy manually
./deploy-github-pages.sh
```

#### Alternative Manual Method

```bash
cd frontend
npm install --save-dev gh-pages
npm run build
npx gh-pages -d build
```

Your app will be available at: `https://[username].github.io/[repository-name]`

**Note:** The GitHub Pages deployment shows the UI but displays "Error Loading Movies" because there's no backend. For full functionality, clone and run locally as described above.

## 🐳 Docker Support

### Prerequisites for Docker

- **Docker** (v20.10 or higher)
- **Docker Compose** (v2.0 or higher)
- **TMDB API Key**

### Environment Setup

1. Copy the environment example file:

```bash
cp env.example .env
```

2. Edit `.env` and add your TMDB API key:

```env
TMDB_API_KEY=your_actual_api_key_here
```

### Running with Docker

```bash
# Build and run both services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Stop services
docker-compose down
```

### Docker Services

- **Backend**: http://localhost:3000 (NestJS API)
- **Frontend**: http://localhost:3001 (React App served by Nginx)
- **API Documentation**: http://localhost:3000/api/docs

### Individual Docker Commands

```bash
# Build backend only
docker build -t movie-backend ./backend

# Build frontend only
docker build -t movie-frontend ./frontend

# Run backend container
docker run -p 3000:3000 --env-file .env movie-backend

# Run frontend container
docker run -p 3001:80 movie-frontend
```

## 🔧 Development Notes

Given more time, the following enhancements would be implemented:

- **User Authentication**: User accounts and personalized experiences
- **Advanced Filtering**: Multiple filter combinations and sorting options
- **Internationalization**: Multi-language support
- **Database Integration**: PostgreSQL for additional data storage

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

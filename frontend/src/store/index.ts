import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { moviesApi } from "./api/moviesApi";
import moviesReducer from "./slices/moviesSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [moviesApi.reducerPath]: moviesApi.reducer,
    // Add other reducers
    movies: moviesReducer,
    ui: uiReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other useful features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  theme: "light" | "dark";
  sidebarOpen: boolean;
  modalOpen: boolean;
  selectedMovieId: number | null;
  currentPage: number;
  notifications: Notification[];
}

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  timestamp: number;
}

const initialState: UiState = {
  theme: "light",
  sidebarOpen: false,
  modalOpen: false,
  selectedMovieId: null,
  currentPage: 1,
  notifications: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },

    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },

    openMovieModal: (state, action: PayloadAction<number>) => {
      state.modalOpen = true;
      state.selectedMovieId = action.payload;
    },

    closeModal: (state) => {
      state.modalOpen = false;
      state.selectedMovieId = null;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, "id" | "timestamp">>
    ) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== notificationId
      );
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setSidebarOpen,
  toggleSidebar,
  setModalOpen,
  openMovieModal,
  closeModal,
  setCurrentPage,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;

export const selectTheme = (state: { ui: UiState }) => state.ui.theme;
export const selectSidebarOpen = (state: { ui: UiState }) =>
  state.ui.sidebarOpen;
export const selectModalOpen = (state: { ui: UiState }) => state.ui.modalOpen;
export const selectSelectedMovieId = (state: { ui: UiState }) =>
  state.ui.selectedMovieId;
export const selectCurrentPage = (state: { ui: UiState }) =>
  state.ui.currentPage;
export const selectNotifications = (state: { ui: UiState }) =>
  state.ui.notifications;

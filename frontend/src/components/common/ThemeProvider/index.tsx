import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useAppSelector } from "store/hooks";
import { selectTheme } from "store/slices/uiSlice";

interface AppThemeProviderProps {
  children: React.ReactNode;
}

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const themeMode = useAppSelector(selectTheme);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === "dark" ? "#ffffff" : "#000000",
        contrastText: themeMode === "dark" ? "#000000" : "#ffffff",
      },
      secondary: {
        main: "#dc2626",
      },
      background: {
        default: themeMode === "dark" ? "#000000" : "#ffffff",
        paper: themeMode === "dark" ? "#1a1a1a" : "#ffffff",
      },
      text: {
        primary: themeMode === "dark" ? "#ffffff" : "#000000",
        secondary: themeMode === "dark" ? "#b3b3b3" : "#666666",
      },
      divider: themeMode === "dark" ? "#333333" : "#e0e0e0",
      action: {
        hover:
          themeMode === "dark"
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(0, 0, 0, 0.04)",
        selected:
          themeMode === "dark"
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(0, 0, 0, 0.08)",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 500,
      },
      subtitle2: {
        fontWeight: 500,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: "thin",
            scrollbarColor:
              themeMode === "dark" ? "#333333 #1a1a1a" : "#e0e0e0 #ffffff",
            "&::-webkit-scrollbar": {
              width: 8,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: themeMode === "dark" ? "#1a1a1a" : "#ffffff",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: themeMode === "dark" ? "#333333" : "#e0e0e0",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: themeMode === "dark" ? "#404040" : "#cccccc",
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: `1px solid ${themeMode === "dark" ? "#333333" : "#e0e0e0"}`,
            boxShadow:
              themeMode === "dark"
                ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                : "0 2px 8px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 500,
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: themeMode === "dark" ? "#1a1a1a" : "#ffffff",
            color: themeMode === "dark" ? "#ffffff" : "#000000",
            boxShadow: `0 1px 3px ${
              themeMode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            }`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;

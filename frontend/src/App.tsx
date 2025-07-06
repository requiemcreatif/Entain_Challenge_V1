import React from "react";
import { Box } from "@mui/material";
import { Header, ErrorBoundary, Footer, ThemeProvider } from "components";
import { HomePage } from "pages";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Box
          sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <HomePage />
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

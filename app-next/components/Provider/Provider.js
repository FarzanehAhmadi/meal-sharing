"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "@/components/Navbar/Navbar";

const theme = createTheme();

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {children}
    </ThemeProvider>
  );
}

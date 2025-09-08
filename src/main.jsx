import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./ThemeProvider";
import { MainRoutes } from "./MainRoutes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <MainRoutes />
    </ThemeProvider>
  </StrictMode>
);

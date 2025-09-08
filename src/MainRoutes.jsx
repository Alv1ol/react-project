import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { App } from "./App";
import { MovieDetails } from "./MovieDetails";
import { Layout } from "./components/layout";

export function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

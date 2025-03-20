import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import { MovieCard } from "../components/MovieCard";

export function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className="favorites">
        <h2>Избранное</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>Нету избранных фильмов</h2>
      <p>Начните добавлять фильмы в избранное и они будут отображаться здесь</p>
    </div>
  );
}

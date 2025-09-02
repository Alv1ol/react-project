import { useEffect } from "react";
import { MovieCard } from "./MovieCard";
import { MOVIES } from "./movies.data";

export function App() {
  useEffect(() => { 
    
  }, [])

  return (
    <div className="min-h-screen w-full bg-black text-white px-6 py-5">
      <header className="mb-10 flex items-center">
        <img src="/netflix.png" alt="Netflix" className="h-8 w-auto" />
      </header>
      <main className="flex gap-6">
        {MOVIES.map((movie) => (
          <MovieCard
            key={movie.name}
            image={movie.image}
            rating={movie.rating}
          /> 
        ))}
      </main>
    </div>
  );
}

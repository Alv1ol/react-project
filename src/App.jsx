import { MovieCard } from "./MovieCard";

export function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white px-6 py-5">
      <header className="mb-10 flex items-center">
        <img 
          src="/netflix.png"
          alt="Netflix" 
          className="h-8 w-auto"
         />
      </header>
      <main className="flex gap-6">
        <MovieCard image="/fightclub.png" rating={8.8} />
      </main>
    </div>
  );
}

export function MovieCard({ image, rating }) {
  return (
    <div className="relative w-[200px] rounded-2xl overflow-hidden bg-neutral-900 shadow-lg hover:scale-105 transition-transform will-change-transform duration-300">
      <img className="w-full h-auto object-cover" src={image} alt="poster" width={200} />
      <div className="absolute bottom-0 left-0 w-full 
      bg-gradient-to-t from-black/80 to-transparent p-2 text-sm
      text-white font-semibold">IMDb rating: {rating}</div>
    </div>
  );
}

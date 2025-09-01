import { useState } from "react"

export function FavouriteButton() {
  const [isFavourite, setIsFavorite] = useState(false)

  return (
    <button onClick={() => setIsFavorite(!isFavourite)}>
      {isFavourite ? '💖' : '🤍'}
    </button>
  )
}
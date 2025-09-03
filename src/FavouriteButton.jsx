import { memo, useState } from "react"

function FavouriteButton() {
  const [isFavourite, setIsFavorite] = useState(false)

  return (
    <button onClick={() => setIsFavorite(!isFavourite)}>
      {isFavourite ? '💖' : '🤍'}
    </button>
  )
}

export default memo(FavouriteButton)
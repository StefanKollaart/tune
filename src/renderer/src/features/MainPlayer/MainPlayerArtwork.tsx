function MainPlayerArtwork({
  artwork,
  title
}: {
  artwork?: string
  title?: string
}): React.JSX.Element {
  return artwork ? (
    <img src={artwork} alt={title || ''} className="w-30 h-30 rounded object-cover" />
  ) : (
    <div className="w-30 h-30 bg-stone-700 rounded flex items-center justify-center text-gray-400"></div>
  )
}

export default MainPlayerArtwork

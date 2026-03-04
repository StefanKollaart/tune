import PlaylistItem from './PlaylistItem'
import { usePlayer } from '@renderer/context/MainPlayerContext'
import { useDrop } from './hooks/useDrop'
import { useDrag } from './hooks/useDrag'
function Playlist(): React.JSX.Element {
  const {
    playlist,
    playerA,
    playerB,
    addToPlaylist,
    addRandomSongs,
    moveItem,
    toggleSegue,
    toggleActiveTrackSegue
  } = usePlayer()
  const { isDragging, dropProps } = useDrop(addToPlaylist)
  const { draggedItem, setDraggedItem, dropTarget, setDropTarget, handleDrop } = useDrag(moveItem)

  const activeTracks = [playerA, playerB]
    .filter((p) => p.currentTrack !== null && p.loadedAt !== null)
    .sort((a, b) => a.loadedAt! - b.loadedAt!)

  return (
    <div
      className={`bg-stone-800 rounded-lg p-4 flex-1 overflow-auto min-h-0 border-2 ${isDragging ? 'border-dashed border-stone-500' : 'border-transparent'}`}
      {...dropProps}
    >
      {activeTracks.map((player) => {
        const song = player.currentTrack!.song
        return (
          <PlaylistItem
            key={`active-${player.id}`}
            id={player.id}
            title={song.title}
            artist={song.artist}
            duration={song.duration}
            artwork={song.artwork || ''}
            segue={player.currentTrack!.segue ?? false}
            onToggleSegue={() => toggleActiveTrackSegue(player.id)}
            mainPlayer={player.id}
            progress={player.duration > 0 ? player.currentTime / player.duration : 0}
          />
        )
      })}

      {playlist.map((playlistItem) => {
        const song = playlistItem.song
        return (
          <PlaylistItem
            key={playlistItem.id}
            id={playlistItem.id}
            title={song.title}
            artist={song.artist}
            duration={song.duration}
            artwork={song.artwork || ''}
            segue={playlistItem.segue ?? false}
            onToggleSegue={() => toggleSegue(playlistItem.id)}
            showDropIndicator={dropTarget === playlistItem.id}
            isDragging={draggedItem === playlistItem.id}
            onDragOver={() => setDropTarget(playlistItem.id)}
            setDrag={setDraggedItem}
            onDrop={handleDrop}
          />
        )
      })}
      {import.meta.env.DEV && (
        <button
          onClick={addRandomSongs}
          className="mb-2 px-3 py-1 text-xs bg-stone-700 hover:bg-stone-600 text-stone-300 rounded cursor-pointer"
        >
          [DEV] Voeg random liedjes toe
        </button>
      )}
    </div>
  )
}

export default Playlist

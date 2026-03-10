import PlaylistItem from './PlaylistItem'
import { usePlaylistContext } from '@renderer/context/PlaylistContext'
import { usePlayersContext } from '@renderer/context/PlayersContext'
import { useDrop } from './hooks/useDrop'
import { useDrag } from './hooks/useDrag'

function Playlist(): React.JSX.Element {
  const { playlist, addToPlaylist, addRandomSongs, moveItem, toggleSegue } = usePlaylistContext()
  const { playerA, playerB } = usePlayersContext()
  const { isDragging, dropProps } = useDrop(addToPlaylist)
  const { draggedItem, setDraggedItem, dropTarget, setDropTarget, handleDrop } = useDrag(moveItem)

  const activePlayers = [playerA, playerB]
    .filter((p) => p.playerState.currentTrack !== null && p.playerState.loadedAt !== null)
    .sort((a, b) => a.playerState.loadedAt! - b.playerState.loadedAt!)

  return (
    <div
      className={`bg-stone-800 rounded-lg p-4 flex-1 overflow-auto min-h-0 border-2 ${isDragging ? 'border-dashed border-stone-500' : 'border-transparent'}`}
      {...dropProps}
    >
      {activePlayers.map((player) => {
        const song = player.playerState.currentTrack!.song
        return (
          <PlaylistItem
            key={`active-${player.playerState.id}`}
            id={player.playerState.id}
            title={song.title}
            artist={song.artist}
            duration={song.duration}
            artwork={song.artwork || ''}
            segue={player.playerState.currentTrack!.segue ?? false}
            segueDisabled={playlist.length === 0}
            onToggleSegue={() => player.toggleSegue()}
            mainPlayer={player.playerState.id}
            progress={player.playerState.duration > 0 ? player.playerState.currentTime / player.playerState.duration : 0}
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
            segueDisabled={playlistItem.id === playlist[playlist.length - 1].id}
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

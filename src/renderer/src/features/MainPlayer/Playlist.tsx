import PlaylistItem from './PlaylistItem'
import { usePlayer } from '@renderer/context/MainPlayerContext'
import { useDrop } from './hooks/useDrop'
import { useDrag } from './hooks/useDrag'

function Playlist(): React.JSX.Element {
  const { playlist, addToPlaylist, moveItem } = usePlayer()
  const { isDragging, dropProps } = useDrop(addToPlaylist)
  const { draggedItem, setDraggedItem, dropTarget, setDropTarget, handleDrop } = useDrag(moveItem)

  return (
    <div
      className={`bg-stone-800 rounded-lg p-4 flex-1 overflow-auto min-h-0 border-2 ${isDragging ? 'border-dashed border-stone-500' : 'border-transparent'}`}
      {...dropProps}
    >
      {playlist.map((playlistItem) => {
        const song = playlistItem.song
        console.log(playlistItem);

        return (
          <PlaylistItem
            key={playlistItem.id}
            id={playlistItem.id}
            title={song.title}
            artist={song.artist}
            duration={song.duration}
            artwork={song.artwork || ''}
            segue={false}
            showDropIndicator={dropTarget === playlistItem.id}
            isDragging={draggedItem === playlistItem.id}
            onDragOver={() => setDropTarget(playlistItem.id)}
            setDrag={setDraggedItem}
            onDrop={handleDrop}
          />
        )
      })}
    </div>
  )
}

export default Playlist

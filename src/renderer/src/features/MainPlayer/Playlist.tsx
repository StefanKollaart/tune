import { usePlayer } from '@renderer/context/MainPlayerContext'
import { useAudioDrop } from './hooks/useAudioDrop'
import PlaylistItem from './PlaylistItem'

function Playlist(): React.JSX.Element {
  const { playlist, addToPlaylist } = usePlayer()
  const { isDragging, dropProps } = useAudioDrop(addToPlaylist)

  return (
    <div
      className={`bg-stone-800 rounded-lg p-4 flex-1 overflow-auto min-h-0 ${isDragging ? 'border-4 border-dashed border-stone-500' : ''}`}
      {...dropProps}
    >
      {playlist.map((song) => (
        <PlaylistItem
          key={song.id}
          title={song.title}
          artist={song.artist}
          duration={song.duration}
          artwork={song.artwork || ''}
          segue={false}
        />
      ))}
    </div>
  )
}

export default Playlist

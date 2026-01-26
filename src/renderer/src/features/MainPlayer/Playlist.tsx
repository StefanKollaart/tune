import { usePlayer } from '@renderer/context/MainPlayerContext'
import PlaylistItem from './PlaylistItem'
import { useState } from 'react'
import { Song } from '@renderer/types/song'

function Playlist(): React.JSX.Element {
  const { playlist, addToPlaylist } = usePlayer()
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
  }

  const handleDragEnter = (): void => {
    setIsDragging(true)
  }

  const handleDragLeave = (): void => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const audioFiles = files.filter(
      (file) => file.type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|flac)$/i.test(file.name)
    )

    if (audioFiles.length > 0) {
      try {
        for (const file of audioFiles) {
          const filePath = window.api.getFilePath(file)
          const song: Song = await window.api.importAudioFile(filePath)
          addToPlaylist(song)
        }
      } catch (error) {
        console.error('Error importing files:', error)
      }
    }
  }

  return (
    <div
      className={`bg-stone-800 rounded-lg p-4 flex-1 overflow-auto min-h-0 ${isDragging ? 'border-4 border-dashed border-stone-500' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {playlist.map((song) => (
        <PlaylistItem
          key={song.id}
          title={song.title}
          artist={song.artist}
          duration={song.duration.toString()}
          artwork={song.artwork || ''}
          segue={false}
        />
      ))}
    </div>
  )
}

export default Playlist

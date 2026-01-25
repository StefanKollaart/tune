import { usePlayer } from '@renderer/context/MainPlayerContext'
import PlaylistItem from './PlaylistItem'
import { useState } from 'react'

function Playlist(): React.JSX.Element {
  const { playlist } = usePlayer()
  const [isDragging, setIsDragging] = useState(false)
  console.log(playlist)

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
  }

  const handleDragEnter = (): void => {
    console.log('Joe')
    setIsDragging(true)
  }

  const handleDragLeave = (): void => {
    console.log('Joe')
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const audioFiles = files.filter(
      (file) => file.type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|flac)$/i.test(file.name)
    )

    if (audioFiles.length > 0) {
      audioFiles.forEach((file) => {
        const filePath = window.api.getFilePath(file)
      })
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
      <PlaylistItem
        title="Nog Even Blijven"
        artist="Douwe Bob, Meau"
        duration="123"
        artwork="https://npo-artistdb.b-cdn.net/images/Douwe-bob-Meau-Nog-even-blijven-cover.jpeg?aspect_ratio=501%3A500&width=500&height=500"
        segue={true}
      />
      <PlaylistItem
        title="Down 4 Whatever"
        artist="Roxy Dekker"
        duration="140"
        artwork="https://images.genius.com/8193da821f4d3519c94afa3a749a8573.1000x1000x1.png"
        segue={false}
      />
    </div>
  )
}

export default Playlist

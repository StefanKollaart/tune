import { useState } from 'react'
import { Song } from '@renderer/types/song'

interface UseAudioDropResult {
  isDragging: boolean
  dropProps: {
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
    onDragEnter: () => void
    onDragLeave: () => void
    onDrop: (e: React.DragEvent<HTMLDivElement>) => Promise<void>
  }
}

export function useAudioDrop(onSongImported: (song: Song) => void): UseAudioDropResult {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
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

    for (const file of audioFiles) {
      try {
        const filePath = window.api.getFilePath(file)
        const song = await window.api.importAudioFile(filePath)
        onSongImported(song)
      } catch (error) {
        console.error('Error importing file:', error)
      }
    }
  }

  return {
    isDragging,
    dropProps: {
      onDragOver: handleDragOver,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop
    }
  }
}

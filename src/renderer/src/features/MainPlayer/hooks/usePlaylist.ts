import { useState } from 'react'
import { PlaylistItemType } from '@renderer/types/PlaylistItemType'
import { SongType } from '@renderer/types/SongType'

export interface UsePlaylistReturn {
  playlist: PlaylistItemType[]
  addToPlaylist: (song: SongType) => void
  removeFromPlaylist: (playlistItemId: string) => void
  moveItem: (songId: string, underSongId: string) => void
}

export function usePlaylist(): UsePlaylistReturn {
  const [playlist, setPlaylist] = useState<PlaylistItemType[]>([])

  const addToPlaylist = (song: SongType): void => {
    const playlistItem: PlaylistItemType = {
      id: crypto.randomUUID(),
      song
    }
    setPlaylist((prevPlaylist) => [...prevPlaylist, playlistItem])
  }

  const removeFromPlaylist = (playlistItemId: string): void => {
    setPlaylist((prevPlaylist) =>
      prevPlaylist.filter((playlistItem) => playlistItem.id !== playlistItemId)
    )
  }

  const moveItem = (songId: string, underSongId: string): void => {
    setPlaylist((prev) => {
      const songIndex = prev.findIndex((item) => item.id === songId)
      const underSongIndex = prev.findIndex((item) => item.id === underSongId)
      if (songIndex === -1 || underSongIndex === -1) return prev

      const updatedPlaylist = [...prev]
      const [movedSong] = updatedPlaylist.splice(songIndex, 1)
      updatedPlaylist.splice(underSongIndex, 0, movedSong)
      return updatedPlaylist
    })
  }

  return { playlist, addToPlaylist, removeFromPlaylist, moveItem }
}

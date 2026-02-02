import { Song } from '@renderer/types/song'
import { createContext, useContext, useState } from 'react'

interface MainPlayerContextType {
    playlist: Song[]
    addToPlaylist: (song: Song) => void
    removeFromPlaylist: (songId: string) => void
    moveItem: (songId: string, underSongId: string) => void
}

const MainPlayerContext = createContext<MainPlayerContextType | undefined>(undefined)

export function MainPlayerProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [playlist, setPlaylist] = useState<Song[]>([])

  const addToPlaylist = (song: Song): void => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, song])
  }

  const removeFromPlaylist = (songId: string): void => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((song) => song.id !== songId))
  }

  const moveItem = (songId: string, underSongId: string): void => {
    const songIndex = playlist.findIndex((song) => song.id === songId)
    const underSongIndex = playlist.findIndex((song) => song.id === underSongId)
    if (songIndex === -1 || underSongIndex === -1) return

    const updatedPlaylist = [...playlist]
    const [movedSong] = updatedPlaylist.splice(songIndex, 1)
    updatedPlaylist.splice(underSongIndex, 0, movedSong)
    setPlaylist(updatedPlaylist)
  }

  return (
    <MainPlayerContext.Provider
      value={{
        playlist,
        addToPlaylist,
        removeFromPlaylist,
        moveItem
      }}
    >
      {children}
    </MainPlayerContext.Provider>
  )
}

export function usePlayer(): MainPlayerContextType {
  const context = useContext(MainPlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a MainPlayerProvider')
  }
  return context
}

import { createContext, useContext } from 'react'
import { UsePlaylistReturn, usePlaylist } from '@renderer/features/MainPlayer/hooks/usePlaylist'

const PlaylistContext = createContext<UsePlaylistReturn | undefined>(undefined)

export function PlaylistProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const playlist = usePlaylist()
  return <PlaylistContext.Provider value={playlist}>{children}</PlaylistContext.Provider>
}

export function usePlaylistContext(): UsePlaylistReturn {
  const context = useContext(PlaylistContext)
  if (!context) throw new Error('usePlaylistContext must be used within a PlaylistProvider')
  return context
}

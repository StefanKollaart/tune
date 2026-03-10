import { createContext, useContext, useRef } from 'react'
import { UseAudioPlayerType, useAudioPlayer } from '@renderer/features/MainPlayer/hooks/useAudioPlayer'
import { usePlaylistContext } from './PlaylistContext'

interface PlayersContextType {
  playerA: UseAudioPlayerType
  playerB: UseAudioPlayerType
}

const PlayersContext = createContext<PlayersContextType | undefined>(undefined)

export function PlayersProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const { playlist, removeFromPlaylist } = usePlaylistContext()
  const loadOrderCounter = useRef(0)

  const playerA = useAudioPlayer('A', playlist, removeFromPlaylist, loadOrderCounter)
  const playerB = useAudioPlayer('B', playlist, removeFromPlaylist, loadOrderCounter)

  return <PlayersContext.Provider value={{ playerA, playerB }}>{children}</PlayersContext.Provider>
}

export function usePlayersContext(): PlayersContextType {
  const context = useContext(PlayersContext)
  if (!context) throw new Error('usePlayersContext must be used within a PlayersProvider')
  return context
}

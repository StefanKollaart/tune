import { MainPlayerContextType } from '@renderer/types/MainPlayerContextType'
import { PlaylistItemType } from '@renderer/types/PlaylistItemType'
import { usePlaylist } from '@renderer/features/MainPlayer/hooks/usePlaylist'
import { useAudioPlayer } from '@renderer/features/MainPlayer/hooks/useAudioPlayer'
import { createContext, useContext } from 'react'

const MainPlayerContext = createContext<MainPlayerContextType | undefined>(undefined)

export function MainPlayerProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const { playlist, addToPlaylist, addRandomSongs, removeFromPlaylist, moveItem } = usePlaylist()

  const playerAHook = useAudioPlayer('A', playlist, removeFromPlaylist)
  const playerBHook = useAudioPlayer('B', playlist, removeFromPlaylist)

  const getPlayer = (playerId: 'A' | 'B'): typeof playerAHook =>
    playerId === 'A' ? playerAHook : playerBHook

  return (
    <MainPlayerContext.Provider
      value={{
        playlist,
        playerA: playerAHook.playerState,
        playerB: playerBHook.playerState,
        addToPlaylist,
        addRandomSongs,
        removeFromPlaylist,
        moveItem,
        loadTrack: (playerId: 'A' | 'B', playlistItem: PlaylistItemType) =>
          getPlayer(playerId).loadTrack(playlistItem),
        play: (playerId: 'A' | 'B') => getPlayer(playerId).play(),
        pause: (playerId: 'A' | 'B') => getPlayer(playerId).pause(),
        stop: (playerId: 'A' | 'B') => getPlayer(playerId).stop(),
        updateTime: (playerId: 'A' | 'B', time: number) => getPlayer(playerId).updateTime(time)
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

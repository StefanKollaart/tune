import { PlayerStateType } from "./PlayerStateType"
import { PlaylistItemType } from "./PlaylistItemType"
import { SongType } from "./SongType"

export interface MainPlayerContextType {
    playlist: PlaylistItemType[]
    playerA: PlayerStateType
    playerB: PlayerStateType
    addToPlaylist: (song: SongType) => void
    addRandomSongs: () => Promise<void>
    removeFromPlaylist: (songId: string) => void
    moveItem: (songId: string, underSongId: string) => void
    loadTrack: (playerId: 'A' | 'B', playlistItem: PlaylistItemType) => void
    play: (playerId: 'A' | 'B') => void
    pause: (playerId: 'A' | 'B') => void
    stop: (playerId: 'A' | 'B') => void
    updateTime: (playerId: 'A' | 'B', time: number) => void
}
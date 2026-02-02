import { PlaylistItemType } from "./PlaylistItemType"
import { SongType } from "./SongType"

export interface MainPlayerContextType {
    playlist: PlaylistItemType[]
    addToPlaylist: (song: SongType) => void
    removeFromPlaylist: (songId: string) => void
    moveItem: (songId: string, underSongId: string) => void
}
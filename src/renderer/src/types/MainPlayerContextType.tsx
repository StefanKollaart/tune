import { SongType } from "./SongType"

export interface MainPlayerContextType {
    playlist: SongType[]
    addToPlaylist: (song: SongType) => void
    removeFromPlaylist: (songId: string) => void
    moveItem: (songId: string, underSongId: string) => void
}
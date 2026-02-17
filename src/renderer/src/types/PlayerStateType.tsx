import { PlaylistItemType } from "./PlaylistItemType"

export type PlayerStateType = {
  id: 'A' | 'B'
  isPlaying: boolean
  currentTrack: PlaylistItemType | null
  currentTime: number
  duration: number
  volume: number
  loadedAt: number | null
}

export type PlaybackState = 'stopped' | 'playing' | 'paused'
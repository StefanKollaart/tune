import { useState, useRef, useEffect, useCallback } from 'react'
import { PlayerStateType } from '@renderer/types/PlayerStateType'
import { PlaylistItemType } from '@renderer/types/PlaylistItemType'

export interface UseAudioPlayerType {
  playerState: PlayerStateType
  loadTrack: (playlistItem: PlaylistItemType) => void
  play: () => void
  pause: () => void
  stop: () => void
  updateTime: (time: number) => void
}

const initialPlayerState: PlayerStateType = {
  id: 'A',
  isPlaying: false,
  currentTrack: null,
  currentTime: 0,
  duration: 0,
  volume: 1
}

export function useAudioPlayer(
  playerId: 'A' | 'B',
  playlist: PlaylistItemType[],
  removeFromPlaylist: (playlistItemId: string) => void
): UseAudioPlayerType {
  const [playerState, setPlayerState] = useState<PlayerStateType>({
    ...initialPlayerState,
    id: playerId
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  const handleTrackEnd = useCallback((): void => {
    setPlayerState((prev) => ({
      ...prev,
      currentTrack: null,
      isPlaying: false,
      currentTime: 0
    }))
  }, [])

  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio

    const context = new AudioContext()
    const source = context.createMediaElementSource(audio)

    analyserRef.current = context.createAnalyser()
    analyserRef.current.fftSize = 32

    source.connect(analyserRef.current)
    analyserRef.current.connect(context.destination)

    audio.addEventListener('ended', handleTrackEnd)

    return () => {
      audio.removeEventListener('ended', handleTrackEnd)
      audio.pause()
      audioRef.current = null
    }
  }, [handleTrackEnd])

  useEffect(() => {
    const getVolumeDots = (analyser: AnalyserNode | null): number => {
      if (!analyser) return 0

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length
      const amountOfDots = 15
      return Math.floor((average / 255) * amountOfDots)
    }

    const intervalId = setInterval(() => {
      const audio = audioRef.current
      if (audio && !audio.paused) {
        setPlayerState((prev) => ({
          ...prev,
          duration: audio.duration,
          currentTime: audio.currentTime,
          volume: getVolumeDots(analyserRef.current)
        }))
      }
    }, 100)

    return () => clearInterval(intervalId)
  }, [])

  const loadTrack = useCallback(
    (playlistItem: PlaylistItemType): void => {
      const audio = audioRef.current
      if (!audio) return

      audio.src = `file://${playlistItem.song.filePath}`
      audio.load()

      setPlayerState((prev) => ({
        ...prev,
        currentTrack: playlistItem,
        currentTime: 0,
        isPlaying: true
      }))

      removeFromPlaylist(playlistItem.id)
    },
    [removeFromPlaylist]
  )

  const play = useCallback((): void => {
    const audio = audioRef.current
    if (!audio) return

    if (!playerState.currentTrack) {
      if (playlist.length > 0) {
        loadTrack(playlist[0])
        audio.play()
        return
      }
    }

    audio.play()
    setPlayerState((prev) => ({ ...prev, isPlaying: true }))
  }, [playerState.currentTrack, playlist, loadTrack])

  const pause = useCallback((): void => {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    setPlayerState((prev) => ({ ...prev, isPlaying: false }))
  }, [])

  const stop = useCallback((): void => {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    audio.currentTime = 0
    setPlayerState((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }))
  }, [])

  const updateTime = useCallback((time: number): void => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = time
    setPlayerState((prev) => ({ ...prev, currentTime: time }))
  }, [])

  return { playerState, loadTrack, play, pause, stop, updateTime }
}

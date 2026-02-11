// context/MainPlayerContext.tsx
import { MainPlayerContextType } from '@renderer/types/MainPlayerContextType'
import { PlayerStateType } from '@renderer/types/PlayerStateType'
import { PlaylistItemType } from '@renderer/types/PlaylistItemType'
import { SongType } from '@renderer/types/SongType'
import { createContext, useContext, useState, useRef, useEffect } from 'react'

const MainPlayerContext = createContext<MainPlayerContextType | undefined>(undefined)

const initialPlayerState: PlayerStateType = {
  id: 'A',
  isPlaying: false,
  currentTrack: null,
  currentTime: 0,
  duration: 0,
  volume: 1
}

export function MainPlayerProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [playlist, setPlaylist] = useState<PlaylistItemType[]>([])
  const [playerA, setPlayerA] = useState<PlayerStateType>({ ...initialPlayerState, id: 'A' })
  const [playerB, setPlayerB] = useState<PlayerStateType>({ ...initialPlayerState, id: 'B' })

  // Audio instances
  const audioA = useRef<HTMLAudioElement | null>(null)
  const audioB = useRef<HTMLAudioElement | null>(null)
  const analyserA = useRef<AnalyserNode | null>(null)
  const analyserB = useRef<AnalyserNode | null>(null)

  // Playlist functions
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
    const songIndex = playlist.findIndex((song) => song.id === songId)
    const underSongIndex = playlist.findIndex((song) => song.id === underSongId)
    if (songIndex === -1 || underSongIndex === -1) return

    const updatedPlaylist = [...playlist]
    const [movedSong] = updatedPlaylist.splice(songIndex, 1)
    updatedPlaylist.splice(underSongIndex, 0, movedSong)
    setPlaylist(updatedPlaylist)
  }

  const loadTrack = (playerId: 'A' | 'B', playlistItem: PlaylistItemType): void => {
    const setter = playerId === 'A' ? setPlayerA : setPlayerB
    const audio = playerId === 'A' ? audioA.current : audioB.current

    if (!audio) return

    const fileUrl = `file://${playlistItem.song.filePath}`

    audio.src = fileUrl
    audio.load()

    setter((prevState) => ({
      ...prevState,
      currentTrack: playlistItem,
      currentTime: 0,
      isPlaying: true
    }))

    removeFromPlaylist(playlistItem.id)
  }

  const play = (playerId: 'A' | 'B'): void => {
    const getter = playerId === 'A' ? playerA : playerB
    const audio = playerId === 'A' ? audioA.current : audioB.current

    if (!audio) return

    if (!getter.currentTrack) {
      if (playlist.length > 0) {
        loadTrack(playerId, playlist[0])
        audio.play()
        return
      }
    }

    audio.play()
    const setter = playerId === 'A' ? setPlayerA : setPlayerB
    setter((prev) => ({ ...prev, isPlaying: true }))
  }

  const pause = (playerId: 'A' | 'B'): void => {
    const audio = playerId === 'A' ? audioA.current : audioB.current
    if (!audio) return

    audio.pause()
    const setter = playerId === 'A' ? setPlayerA : setPlayerB
    setter((prev) => ({ ...prev, isPlaying: false }))
  }

  const stop = (playerId: 'A' | 'B'): void => {
    const audio = playerId === 'A' ? audioA.current : audioB.current
    if (!audio) return

    audio.pause()
    audio.currentTime = 0

    const setter = playerId === 'A' ? setPlayerA : setPlayerB
    setter((prev) => ({
      ...prev,
      isPlaying: false,
      currentTime: 0
    }))
  }

  const updateTime = (playerId: 'A' | 'B', time: number): void => {
    const audio = playerId === 'A' ? audioA.current : audioB.current
    if (!audio) return

    audio.currentTime = time
    const setter = playerId === 'A' ? setPlayerA : setPlayerB
    setter((prev) => ({ ...prev, currentTime: time }))
  }

  const handleTrackEnd = (playerId: 'A' | 'B'): void => {
    const setter = playerId === 'A' ? setPlayerA : setPlayerB

    setter((prev) => ({
      ...prev,
      currentTrack: null,
      isPlaying: false,
      currentTime: 0
    }))
  }

  useEffect(() => {
    audioA.current = new Audio()
    audioB.current = new Audio()

    const contextA = new AudioContext()
    const sourceA = contextA.createMediaElementSource(audioA.current)

    analyserA.current = contextA.createAnalyser()
    analyserA.current.fftSize = 32

    sourceA.connect(analyserA.current)
    analyserA.current.connect(contextA.destination)

    const contextB = new AudioContext()
    const sourceB = contextB.createMediaElementSource(audioB.current)
    analyserB.current = contextB.createAnalyser()
    analyserB.current.fftSize = 32

    sourceB.connect(analyserB.current)
    analyserB.current.connect(contextB.destination)

    audioA.current.addEventListener('ended', () => {
      handleTrackEnd('A')
    })

    audioB.current.addEventListener('ended', () => {
      handleTrackEnd('B')
    })

    return () => {
      audioA.current?.removeEventListener('ended', () => {})
      audioB.current?.removeEventListener('ended', () => {})

      audioA.current?.pause()
      audioB.current?.pause()
      audioA.current = null
      audioB.current = null
    }
  }, [])

  useEffect(() => {
    const getVolumeDots = (analyser: AnalyserNode | null): number => {
      if (!analyser) return 0
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length
      const amountOfDots = 15
      return Math.floor((average / 255) * amountOfDots)
    }

    const updatePlayerTime = (
      audio: HTMLAudioElement,
      analyser: AnalyserNode | null,
      setter: React.Dispatch<React.SetStateAction<PlayerStateType>>
    ): void => {
      if (!audio.paused) {
        setter((prev) => ({
          ...prev,
          duration: audio.duration,
          currentTime: audio.currentTime,
          volume: getVolumeDots(analyser)
        }))
      }
    }

    const intervalId = setInterval(() => {
      if (audioA.current) updatePlayerTime(audioA.current, analyserA.current, setPlayerA)
      if (audioB.current) updatePlayerTime(audioB.current, analyserB.current, setPlayerB)
    }, 100)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <MainPlayerContext.Provider
      value={{
        playlist,
        playerA,
        playerB,
        addToPlaylist,
        removeFromPlaylist,
        moveItem,
        loadTrack,
        play,
        pause,
        stop,
        updateTime
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

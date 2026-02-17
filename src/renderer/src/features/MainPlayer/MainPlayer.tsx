import AudioMeter from '@renderer/components/AudioMeter/AudioMeter'
import MediaControls from '@renderer/components/MediaControls/MediaControls'
import ProgressBar from '@renderer/components/ProgressBar/ProgressBar'
import { usePlayer } from '@renderer/context/MainPlayerContext'
import MainPlayerArtwork from './MainPlayerArtwork'
import MainPlayerData from './MainPlayerData'

function MainPlayer({ playerId }: { playerId: 'A' | 'B' }): React.JSX.Element {
  const { playerA, playerB, play, pause, stop, updateTime } = usePlayer()
  const player = playerId === 'A' ? playerA : playerB

  const handlePlayPause = (): void => {
    player.isPlaying ? pause(playerId) : play(playerId)
  }

  const handleStop = (): void => {
    stop(playerId)
  }

  const handleSeek = (time: number): void => {
    updateTime(playerId, time)
  }

  const playerColor = playerId === 'A' ? 'primary' : 'secondary'
  const playerBackgroundColor = playerColor === 'primary' ? 'bg-primary-600' : 'bg-secondary-600'

  return (
    <div className="bg-stone-800 rounded-lg w-full">
      <div className="flex gap-4 px-4 pt-4">
        <div className="w-30 h-30 rounded mb-2 shrink-0">
          <MainPlayerArtwork
            artwork={player.currentTrack?.song.artwork}
            title={player.currentTrack?.song.title}
          />
        </div>
        <div className="flex-1 ps-2 min-w-0">
          <MainPlayerData song={player.currentTrack?.song} currentTime={player.currentTime} />
          <div className="mb-4">
            <MediaControls
              isPlaying={player.isPlaying}
              onPlayPause={handlePlayPause}
              onStop={handleStop}
            />
          </div>
        </div>
        <div className="ml-auto flex items-start gap-4">
          <div className={`${playerBackgroundColor} px-4 font-bold`}>{playerId}</div>
          <div>
            <AudioMeter volume={player.volume} color={playerColor} />
          </div>
        </div>
      </div>
      <div className="mb-4 px-4">
        <ProgressBar
          currentTime={player.currentTime}
          duration={player.currentTrack?.song.duration || 0}
          color={playerColor}
          onSeek={handleSeek}
        />
      </div>
    </div>
  )
}

export default MainPlayer

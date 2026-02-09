import MediaControls from '@renderer/components/MediaControls/MediaControls'
import ProgressBar from '@renderer/components/ProgressBar/ProgressBar'
import { usePlayer } from '@renderer/context/MainPlayerContext'

function MainPlayer({ playerId }: { playerId: 'A' | 'B' }): React.JSX.Element {
  const { playerA, playerB, play, pause } = usePlayer()
  const player = playerId === 'A' ? playerA : playerB

  const handlePlayPause = (): void => {
    player.isPlaying ? pause(playerId) : play(playerId)
  }

  return (
    <div className="bg-stone-800 rounded-lg w-full">
      <div className="flex gap-4 px-4 pt-4">
        <div className="w-30 h-30 rounded mb-2">
          {player.currentTrack?.song.artwork ? (
            <img
              src={player.currentTrack.song.artwork}
              alt={player.currentTrack.song.title}
              className="w-30 h-30 rounded object-cover"
            />
          ) : (
            <div className="w-30 h-30 bg-stone-700 rounded flex items-center justify-center text-gray-400"></div>
          )}
        </div>
        <div className="ps-2 w-60">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-0">{player.currentTrack?.song.title || 'Geen track'}</h2>
            <h3 className="text-sm text-gray-400 mb-2">{player.currentTrack?.song.artist || 'Geen artiest'}</h3>
            <p className="font-bold tracking-wider">00:00:00</p>
          </div>
          <div className="mb-4">
            <MediaControls isPlaying={player.isPlaying} onPlayPause={handlePlayPause} />
          </div>
        </div>
      </div>
      <div className="mb-4 px-4">
        <ProgressBar currentTime={player.currentTime} duration={player.duration} />
      </div>
    </div>
  )
}

export default MainPlayer

import AudioMeter from '@renderer/components/AudioMeter/AudioMeter'
import MediaControls from '@renderer/components/MediaControls/MediaControls'
import ProgressBar from '@renderer/components/ProgressBar/ProgressBar'
import { usePlayersContext } from '@renderer/context/PlayersContext'
import { usePlaylistContext } from '@renderer/context/PlaylistContext'
import MainPlayerArtwork from './MainPlayerArtwork'
import MainPlayerData from './MainPlayerData'

function MainPlayer({ playerId }: { playerId: 'A' | 'B' }): React.JSX.Element {
  const { playerA, playerB } = usePlayersContext()
  const { playerState, play, pause, stop, updateTime, toggleSegue } =
    playerId === 'A' ? playerA : playerB
  const { playlist } = usePlaylistContext()

  const playerColor = playerId === 'A' ? 'primary' : 'secondary'
  const playerBackgroundColor = playerColor === 'primary' ? 'bg-primary-600' : 'bg-secondary-600'

  return (
    <div className="bg-stone-800 rounded-lg w-full">
      <div className="flex gap-4 px-4 pt-4">
        <div className="w-30 h-30 rounded mb-2 shrink-0">
          <MainPlayerArtwork
            artwork={playerState.currentTrack?.song.artwork}
            title={playerState.currentTrack?.song.title}
          />
        </div>
        <div className="flex-1 ps-2 min-w-0">
          <MainPlayerData
            currentTrack={playerState.currentTrack}
            currentTime={playerState.currentTime}
          />
          <div className="mb-4">
            <MediaControls
              isPlaying={playerState.isPlaying}
              hasTrack={!!playerState.currentTrack}
              playDisabled={!playerState.currentTrack && playlist.length === 0}
              segue={playerState.currentTrack?.segue ?? false}
              segueDisabled={playlist.length === 0}
              onPlayPause={() => (playerState.isPlaying ? pause() : play())}
              onStop={stop}
              onToggleSegue={toggleSegue}
            />
          </div>
        </div>
        <div className="ml-auto flex items-start gap-4">
          <div className={`${playerBackgroundColor} px-4 font-bold`}>{playerId}</div>
          <div>
            <AudioMeter volume={playerState.volume} color={playerColor} />
          </div>
        </div>
      </div>
      <div className="mb-4 px-4">
        <ProgressBar
          currentTime={playerState.currentTime}
          duration={playerState.currentTrack?.song.duration || 0}
          color={playerColor}
          onSeek={updateTime}
        />
      </div>
    </div>
  )
}

export default MainPlayer

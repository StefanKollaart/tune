import { formatTimeFromSeconds } from '@renderer/helpers/timeHelpers'
import { PlayerStateType } from '@renderer/types/PlayerStateType'

function MainPlayerArtwork({ player }: { player: PlayerStateType }): React.JSX.Element {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-0">
        {player.currentTrack?.song.title || 'Geen track'}
      </h2>
      <h3 className="text-sm text-gray-400 mb-2">
        {player.currentTrack?.song.artist || 'Geen artiest'}
      </h3>
      <p className="font-bold tracking-wider">
        {formatTimeFromSeconds((player.currentTrack?.song.duration || 0) - player.currentTime)}
      </p>
    </div>
  )
}

export default MainPlayerArtwork

import { formatTimeFromSeconds } from '@renderer/helpers/timeHelpers'
import { PlaylistItemType } from '@renderer/types/PlaylistItemType'

function MainPlayerData({
  currentTrack,
  currentTime
}: {
  currentTrack?: PlaylistItemType | null
  currentTime: number
}): React.JSX.Element {
  const song = currentTrack?.song
  const countdownTarget =
    currentTrack?.segue && !currentTrack.segueTriggered
      ? currentTrack.mixpoint
      : (song?.duration ?? 0)

  const timeRemaining = Math.max(0, countdownTarget - currentTime)
  const isWarning = song && timeRemaining < 5

  return (
    <div className="mb-4 min-w-0 overflow-hidden">
      <h2 className="text-lg font-semibold mb-0 whitespace-nowrap overflow-hidden text-ellipsis">
        {song?.title || 'Geen track'}
      </h2>
      <h3 className="text-sm text-gray-400 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
        {song?.artist || 'Geen artiest'}
      </h3>
      <p className={`font-bold tracking-wider ${isWarning ? 'blink-warning' : ''}`}>
        {formatTimeFromSeconds(timeRemaining)}
      </p>
    </div>
  )
}

export default MainPlayerData

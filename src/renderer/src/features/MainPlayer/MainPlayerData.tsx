import { formatTimeFromSeconds } from '@renderer/helpers/timeHelpers'
import { SongType } from '@renderer/types/SongType'

function MainPlayerData({
  song,
  currentTime
}: {
  song?: SongType
  currentTime: number
}): React.JSX.Element {
  return (
    <div className="mb-4 min-w-0 overflow-hidden">
      <h2 className="text-lg font-semibold mb-0 whitespace-nowrap overflow-hidden text-ellipsis">
        {song?.title || 'Geen track'}
      </h2>
      <h3 className="text-sm text-gray-400 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
        {song?.artist || 'Geen artiest'}
      </h3>
      <p className="font-bold tracking-wider">
        {formatTimeFromSeconds((song?.duration || 0) - currentTime)}
      </p>
    </div>
  )
}

export default MainPlayerData

import { formatTimeFromSeconds } from '@renderer/helpers/timeHelpers'
import { ArrowDown } from 'lucide-react'

type PlaylistItemProps = {
  id: string
  title: string
  artist: string
  duration: number
  artwork: string
  segue: boolean
  showDropIndicator?: boolean
  isDragging?: boolean
  mainPlayer?: 'A' | 'B' | false
  progress?: number
  onDragOver?: () => void
  setDrag?: (itemId: string) => void
  onDrop?: () => void
  onToggleSegue?: () => void
}

function PlaylistItem({
  id,
  title,
  artist,
  duration,
  artwork,
  segue,
  showDropIndicator = false,
  mainPlayer,
  progress,
  onDragOver,
  setDrag,
  onDrop,
  onToggleSegue
}: PlaylistItemProps): React.JSX.Element {
  const bgColor = mainPlayer ? (mainPlayer === 'A' ? 'bg-primary-600' : 'bg-secondary-600') : null
  const bgColorTransparent = mainPlayer
    ? mainPlayer === 'A'
      ? 'bg-primary-600/35'
      : 'bg-secondary-600/35'
    : null
  const accentColor = mainPlayer ? 'text-white' : 'text-gray-400'

  return (
    <div
      className={`relative pe-2 p-1 mb-2 rounded-md overflow-hidden ${bgColorTransparent ?? ''}`}
    >
      {mainPlayer && (
        <div
          className={`absolute inset-y-0 left-0 ${bgColor}`}
          style={{ width: `${(progress ?? 0) * 100}%` }}
        />
      )}
      {showDropIndicator && <div className="absolute inset-0 bg-white opacity-25 rounded-md"></div>}
      <div
        className="relative flex gap-4 items-center"
        draggable={!!setDrag}
        onDragStart={setDrag ? () => setDrag(id) : undefined}
        onDragOver={onDragOver}
        onDragEnd={onDrop}
        onDrop={onDrop}
      >
        <div className="shrink-0">
          <img
            src={artwork}
            alt={`${title} artwork`}
            className="h-10 w-10 aspect-square rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold text-white">{title}</span>
          <span className={`text-sm ${accentColor}`}>{artist}</span>
        </div>
        <div className={`ml-auto text-sm flex items-center ${accentColor}`}>
          <button
            className={`cursor-pointer p-1 rounded-md ${segue ? 'bg-white text-stone-900' : ''}`}
            onClick={onToggleSegue}
          >
            <ArrowDown size={20} />
          </button>
          <p className="ps-2">{formatTimeFromSeconds(duration)}</p>
        </div>
      </div>
    </div>
  )
}

export default PlaylistItem

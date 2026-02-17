import { formatTimeFromSeconds } from '@renderer/helpers/timeHelpers'
import { ArrowDown } from 'lucide-react'

function PlaylistItem({
  id,
  title,
  artist,
  duration,
  artwork,
  segue,
  showDropIndicator = false,
  mainPlayer,
  onDragOver,
  setDrag,
  onDrop
}: {
  id: string
  title: string
  artist: string
  duration: number
  artwork: string
  segue: boolean
  showDropIndicator?: boolean
  isDragging?: boolean
  mainPlayer?: 'A' | 'B' | false
  onDragOver?: () => void
  setDrag?: (itemId: string) => void
  onDrop?: () => void
}): React.JSX.Element {
  const bgColor = mainPlayer ? (mainPlayer === 'A' ? 'bg-primary-600' : 'bg-secondary-600') : false
  const accentColor = mainPlayer ? 'text-white' : 'text-gray-400'

  return (
    <div className={`relative pe-2 p-1 mb-2 rounded-md ${bgColor ?? ''}`}>
      {showDropIndicator && <div className="absolute inset-0 bg-white opacity-25 rounded-md"></div>}
      <div
        className="flex gap-4 items-center"
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
          <button className={`cursor-pointer p-1 rounded-md ${segue && 'bg-stone-600'}`}>
            <ArrowDown size={20} />
          </button>
          <p className="ps-2">{formatTimeFromSeconds(duration)}</p>
        </div>
      </div>
    </div>
  )
}

export default PlaylistItem

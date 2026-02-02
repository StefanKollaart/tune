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
  isDragging = false,
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
  showDropIndicator: boolean
  isDragging: boolean
  onDragOver: () => void
  setDrag: (itemId: string) => void
  onDrop: () => void
}): React.JSX.Element {
  return (
    <div className="relative">
      {showDropIndicator && <div className="absolute inset-0 bg-white opacity-25 rounded-md"></div>}
      <div
        className="flex mb-2"
        draggable
        onDragStart={() => setDrag(id)}
        onDragOver={onDragOver}
        onDragEnd={onDrop}
        onDrop={onDrop}
      >
        <img src={artwork} alt={`${title} artwork`} className="w-12 h-12 rounded-md mr-4" />
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-white">{title}</span>
          <span className="text-sm text-gray-400">{artist}</span>
        </div>
        <div className="ml-auto text-sm text-gray-400 flex items-center">
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

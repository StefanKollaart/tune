import { formatTimeFromSeconds } from '@renderer/helpers/timeHelpers'
import { ArrowDown } from 'lucide-react'

function PlaylistItem({
  title,
  artist,
  duration,
  artwork,
  segue
}: {
  title: string
  artist: string
  duration: string
  artwork: string
  segue: boolean
}): React.JSX.Element {
  return (
    <div className="flex mb-2">
      <img src={artwork} alt={`${title} artwork`} className="w-12 h-12 rounded-md mr-4" />
      <div className="flex flex-col justify-center">
        <span className="font-semibold text-white">{title}</span>
        <span className="text-sm text-gray-400">{artist}</span>
      </div>
      <div className="ml-auto text-sm text-gray-400 flex items-center">
        <button className={`cursor-pointer p-1 rounded-md ${segue && 'bg-stone-600'}`}>
          <ArrowDown size={20} />
        </button>
        <p className="ps-2">{formatTimeFromSeconds(parseInt(duration))}</p>
      </div>
    </div>
  )
}

export default PlaylistItem

import { Play, Pause, Square, ArrowDown } from 'lucide-react'

function MediaControls({
  isPlaying,
  segue,
  segueDisabled,
  onPlayPause,
  onStop,
  onToggleSegue
}: {
  isPlaying: boolean
  segue: boolean
  segueDisabled: boolean
  onPlayPause: () => void
  onStop: () => void
  onToggleSegue: () => void
}): React.JSX.Element {
  return (
    <div className="flex gap-4">
      {isPlaying ? (
        <Pause size={24} onClick={onPlayPause} />
      ) : (
        <Play size={24} onClick={onPlayPause} />
      )}
      <Square size={24} onClick={onStop} />
      <button
        className={`rounded-md ${segueDisabled ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer'} ${segue ? 'bg-white text-stone-900' : ''}`}
        onClick={segueDisabled ? undefined : onToggleSegue}
        disabled={segueDisabled}
      >
        <ArrowDown size={24} />
      </button>
    </div>
  )
}

export default MediaControls

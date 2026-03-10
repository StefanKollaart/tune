import { Play, Pause, Square, ArrowDown } from 'lucide-react'

function MediaControls({
  isPlaying,
  hasTrack,
  playDisabled,
  segue,
  segueDisabled,
  onPlayPause,
  onStop,
  onToggleSegue
}: {
  isPlaying: boolean
  hasTrack: boolean
  playDisabled: boolean
  segue: boolean
  segueDisabled: boolean
  segueVisible: boolean
  onPlayPause: () => void
  onStop: () => void
  onToggleSegue: () => void
}): React.JSX.Element {
  return (
    <div className="flex gap-4">
      {isPlaying ? (
        <Pause size={24} onClick={onPlayPause} />
      ) : (
        <Play
          size={24}
          onClick={playDisabled ? undefined : onPlayPause}
          className={playDisabled ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer'}
        />
      )}
      {hasTrack && <Square size={24} onClick={onStop} />}
      {hasTrack && (
        <button
          className={`rounded-md ${segueDisabled ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer'} ${segue ? 'bg-white text-stone-900' : ''}`}
          onClick={segueDisabled ? undefined : onToggleSegue}
          disabled={segueDisabled}
        >
          <ArrowDown size={24} />
        </button>
      )}
    </div>
  )
}

export default MediaControls

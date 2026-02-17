import { Play, Pause, Square, SkipForward } from 'lucide-react'

function MediaControls({
  isPlaying,
  onPlayPause,
  onStop
}: {
  isPlaying: boolean
  onPlayPause: () => void
  onStop: () => void
}): React.JSX.Element {
  return (
    <div className="flex gap-4">
      {isPlaying ? (
        <Pause size={24} onClick={onPlayPause} />
      ) : (
        <Play size={24} onClick={onPlayPause} />
      )}
      <Square size={24} onClick={onStop} />
      <SkipForward size={24} />
    </div>
  )
}

export default MediaControls

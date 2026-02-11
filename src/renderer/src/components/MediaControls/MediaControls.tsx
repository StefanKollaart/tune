import { Play, Pause, Square, SkipForward } from 'lucide-react'

function MediaControls({
  isPlaying,
  onPlayPause
}: {
  isPlaying: boolean
  onPlayPause: () => void
}): React.JSX.Element {
  return (
    <div className="flex gap-4">
      {isPlaying ? (
        <Pause size={24} onClick={onPlayPause} />
      ) : (
        <Play size={24} onClick={onPlayPause} />
      )}
      <Square size={24} />
      <SkipForward size={24} />
    </div>
  )
}

export default MediaControls

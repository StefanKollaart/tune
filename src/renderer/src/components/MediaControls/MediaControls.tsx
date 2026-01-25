import { Play, Pause, Square, SkipForward } from 'lucide-react'

function MediaControls({ isPlaying }: { isPlaying: boolean }): React.JSX.Element {
  return (
    <div className="flex gap-4">
      {isPlaying && <Square size={24} />}
      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      <SkipForward size={24} />
    </div>
  )
}

export default MediaControls

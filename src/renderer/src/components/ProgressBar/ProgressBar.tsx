interface ProgressBarProps {
  currentTime: number
  duration: number
  onSeek?: (time: number) => void
}

function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps): React.JSX.Element {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!onSeek || duration === 0) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration

    onSeek(newTime)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="w-full h-2 bg-stone-700 rounded-full cursor-pointer" onClick={handleClick}>
      <div
        className="h-full bg-blue-500 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ProgressBar

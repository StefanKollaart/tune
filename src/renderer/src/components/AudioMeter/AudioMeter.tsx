function AudioMeter({
  volume,
  color
}: {
  volume: number
  color: 'primary' | 'secondary'
}): React.JSX.Element {
  const colorClass = color === 'primary' ? 'bg-primary-400' : 'bg-secondary-400'

  return (
    <div className="flex flex-col-reverse items-center gap-1">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className={`w-[6px] h-[4px] rounded-[50%] transition-colors ${i + 1 < volume ? colorClass : 'bg-stone-600'}`}
        />
      ))}
    </div>
  )
}

export default AudioMeter

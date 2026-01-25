import MediaControls from '@renderer/components/MediaControls/MediaControls'
import ProgressBar from '@renderer/components/ProgressBar/ProgressBar'

function MainPlayer(): React.JSX.Element {
  return (
    <div className="bg-stone-800 rounded-lg w-full">
      <div className="flex gap-4 px-4 pt-4">
        <div className="w-30 h-30 rounded">
          <img src="https://external-preview.redd.it/sabrina-carpenter-mans-best-friend-v0-NYyDtwUhIyfjGd_S8M0LhWh4C0lsTDQxIEPy0J_xiuQ.jpeg?auto=webp&s=b4b7c5dd3c19d0feab733b347e5b9a58ef8e9061" />
        </div>
        <div className="ps-2 w-60">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-0">Sugar Talking</h2>
            <h3 className="text-sm text-gray-400 mb-2">Sabrina Carpenter</h3>
            <p className="font-bold tracking-wider">00:00:00</p>
          </div>
          <div className="mb-4">
            <MediaControls isPlaying={true} />
          </div>
        </div>
      </div>
      <div className="mb-4 px-4">
        <ProgressBar />
      </div>
    </div>
  )
}

export default MainPlayer

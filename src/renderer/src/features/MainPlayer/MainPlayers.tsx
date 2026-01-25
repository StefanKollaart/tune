import MainPlayer from './MainPlayer'
import Playlist from './Playlist'

function MainPlayers(): React.JSX.Element {
  return (
    <div className="bg-stone-900 p-4 rounded-lg shadow-lg flex flex-col h-full">
      <div className="flex gap-4 mb-4 flex-shrink-0">
        <MainPlayer />
        <MainPlayer />
      </div>
      <Playlist />
    </div>
  )
}

export default MainPlayers

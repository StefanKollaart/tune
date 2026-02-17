import MainPlayer from './MainPlayer'
import Playlist from './Playlist'

function MainPlayers(): React.JSX.Element {
  return (
    <div className="bg-stone-900 p-4 rounded-lg shadow-lg flex flex-col h-full overflow-hidden">
      <div className="grid grid-cols-2 gap-4 mb-4 flex-shrink-0">
        <MainPlayer playerId="A" />
        <MainPlayer playerId="B" />
      </div>
      <Playlist />
    </div>
  )
}

export default MainPlayers

import { PlaylistProvider } from './context/PlaylistContext'
import { PlayersProvider } from './context/PlayersContext'
import MainPlayers from './features/MainPlayer/MainPlayers'

function App(): React.JSX.Element {
  return (
    <PlaylistProvider>
      <PlayersProvider>
        <div className="grid grid-cols-[minmax(900px,1fr)_1fr] grid-rows-[7fr_3fr] p-2 h-screen bg-stone-800 text-white">
          <MainPlayers />
        </div>
      </PlayersProvider>
    </PlaylistProvider>
  )
}

export default App

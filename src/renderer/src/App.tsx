import { MainPlayerProvider } from './context/MainPlayerContext'
import MainPlayers from './features/MainPlayer/MainPlayers'

function App(): React.JSX.Element {
  return (
    <MainPlayerProvider>
      <div className="grid grid-cols-[minmax(900px,1fr)_1fr] grid-rows-[7fr_3fr] p-2 h-screen bg-stone-800 text-white">
        <MainPlayers />
      </div>
    </MainPlayerProvider>
  )
}

export default App

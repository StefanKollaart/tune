import MainPlayers from "./features/MainPlayer/MainPlayers"

function App(): React.JSX.Element {
  return (
    <div className="grid grid-cols-[minmax(900px,1fr)_1fr] grid-rows-[7fr_3fr] p-4 h-screen bg-stone-800 text-white">
      <MainPlayers />
    </div>
  )
}

export default App

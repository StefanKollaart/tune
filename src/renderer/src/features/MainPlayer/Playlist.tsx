import PlaylistItem from "./PlaylistItem"

function Playlist(): React.JSX.Element {
    return (
        <div className="bg-stone-800 rounded-lg p-4 flex-1 overflow-auto min-h-0">
            <PlaylistItem
                title="Nog Even Blijven"
                artist="Douwe Bob, Meau"
                duration="123"
                artwork="https://npo-artistdb.b-cdn.net/images/Douwe-bob-Meau-Nog-even-blijven-cover.jpeg?aspect_ratio=501%3A500&width=500&height=500"
                segue={true}
             />
            <PlaylistItem
                title="Down 4 Whatever"
                artist="Roxy Dekker"
                duration="140"
                artwork="https://images.genius.com/8193da821f4d3519c94afa3a749a8573.1000x1000x1.png"
                segue={false}
             />
        </div>
    )
}

export default Playlist
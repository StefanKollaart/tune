import { ElectronAPI } from '@electron-toolkit/preload'
import { SongType } from '@renderer/types/SongType'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getFilePath: (file: File) => string
      importAudioFile: (filePath: string) => Promise<SongType>
      getRandomSongs: (count: number) => Promise<SongType[]>
    }
  }
}

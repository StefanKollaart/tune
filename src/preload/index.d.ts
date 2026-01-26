import { ElectronAPI } from '@electron-toolkit/preload'
import { Song } from '@renderer/types/song'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getFilePath: (file: File) => string
      importAudioFile: (filePath: string) => Promise<Song>
    }
  }
}

import { WebUtils } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron'

export const createApi = (webUtils: WebUtils) => ({
  getFilePath: (file: File) => webUtils.getPathForFile(file),
  importAudioFile: (filePath: string) => ipcRenderer.invoke('import-audio-file', filePath)
})

import { ipcMain, app } from 'electron'
import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import { parseFile } from 'music-metadata'

const LIBRARY_PATH = path.join(app.getPath('userData'), 'tune')

const getFileHash = async (filePath: string) => {
  const buffer = await fs.readFile(filePath)
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

const getMetadata = async (filePath: string) => {
  const metadata = await parseFile(filePath)
  return {
    title: metadata.common.title || path.basename(filePath, path.extname(filePath)),
    artist: metadata.common.artist || 'Onbekende Artiest',
    duration: metadata.format.duration || 0,
    artwork: metadata.common.picture?.[0]
      ? `data:${metadata.common.picture[0].format};base64,${Buffer.from(metadata.common.picture[0].data).toString('base64')}`
      : null
  }
}

export const setupAudioHandlers = () => {
  ipcMain.handle('import-audio-file', async (_, filePath: string) => {
    await fs.mkdir(LIBRARY_PATH, { recursive: true })

    const fileHash = await getFileHash(filePath)
    const newPath = path.join(LIBRARY_PATH, `${fileHash}${path.extname(filePath)}`)

    const alreadyExists = await fs
      .access(newPath)
      .then(() => true)
      .catch(() => false)

    if (!alreadyExists) {
      await fs.copyFile(filePath, newPath)
    }

    const metadata = await getMetadata(newPath)

    return {
      id: fileHash,
      url: newPath,
      ...metadata
    }
  })
}

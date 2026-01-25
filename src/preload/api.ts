import { WebUtils } from "@electron-toolkit/preload";

export const createApi = (webUtils: WebUtils) => ({
  getFilePath: (file: File) => webUtils.getPathForFile(file),
})
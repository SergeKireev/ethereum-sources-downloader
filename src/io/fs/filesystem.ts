type FsCallback = (err: string) => void

export interface FileSystem {
    outputFile: (file: string, data: any, callback: FsCallback) => Promise<void>
}
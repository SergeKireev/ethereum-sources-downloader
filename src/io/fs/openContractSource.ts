import * as explorer from "../../explorer";
import path from 'path'
import { FileSystem } from './filesystem'

interface Logger {
  log: (...args: any) => void
}

export async function saveContractFilesToFs(
  fs: FileSystem,
  apiName: explorer.ApiName,
  address: string,
  logger: Logger,
  outDir?: string,
) {
  let result: explorer.FetchFilesResult;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  result = await explorer.fetchFiles(apiName, address);

  const entries = Object.entries(result.files);
  for (const [_filePath, content] of entries) {
    const filePath = path.join(outDir || 'out', _filePath)
    fs.outputFile(filePath, content, (err) => {
      if (err) {
        logger.log("Error writing file", err)
      } else {
        logger.log("Written", filePath);
      }
    });
  }

  return [entries, result.info] as const;
}
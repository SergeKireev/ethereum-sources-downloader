import * as explorer from "../../explorer";
import path from 'path'
import { FileSystem } from './filesystem'

interface Logger {
  log: (...args: any) => void
}

async function handleApiResult(fs: FileSystem, logger: Logger, result: explorer.FetchFilesResult, outDir?: string) {
  const entries = Object.entries(result.files);
  for (const [_filePath, content] of entries) {
    const filePath = path.join(outDir || 'out', _filePath)
    const _content = content.replace(/\r/g, '');
    fs.outputFile(filePath, _content, (err) => {
      if (err) {
        logger.log("Error writing file", err)
      } else {
        logger.log("Written", filePath);
      }
    });
  }

  return [entries, result.info] as const;
}

export async function saveContractFilesToFs(
  fs: FileSystem,
  apiName: explorer.ApiName,
  address: string,
  logger: Logger,
  outDir?: string,
  apiKey?: string
) {
  let result: explorer.FetchFilesResult;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  result = await explorer.fetchFiles(apiName, address, {}, true, apiKey);
  return handleApiResult(fs, logger, result, outDir);
}

export async function saveContractFilesToFsV2(
  fs: FileSystem,
  networkId: explorer.NetworkIdV2,
  address: string,
  logger: Logger,
  apiKey: string,
  outDir?: string
) {
  let result: explorer.FetchFilesResult;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  result = await explorer.fetchFilesV2(networkId, address, apiKey);
  return handleApiResult(fs, logger, result, outDir);
}
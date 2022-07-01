import * as explorer from "./explorer";
import path from 'path'

export interface OpenContractSourceArgs {
  fs: any;
  apiName: explorer.ApiName;
  address: string;
  outDir?: string;
}

export async function saveContractFilesToFs({
  fs,
  address,
  apiName,
  outDir
}: OpenContractSourceArgs) {
  let result: explorer.FetchFilesResult;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  result = await explorer.fetchFiles(apiName, address);

  const entries = Object.entries(result.files);
  for (const [_filePath, content] of entries) {
    const filePath = path.join(outDir || 'out', _filePath)
    fs.outputFile(filePath, content, (err, data) => {
      if (err) {
        console.log("Error writing file", err)
      } else {
        console.log("Written", filePath);
      }
    });
  }

  return [entries, result.info] as const;
}
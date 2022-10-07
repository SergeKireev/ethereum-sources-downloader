import { ApiName, explorerApiKeys, explorerApiUrls } from "../../explorer";
import { saveContractFilesToFs } from "../fs/openContractSource";
import fse from 'fs-extra';
import { Command } from "commander";

function validateExplorerApiName(apiName: string): void {
  const found = Object.keys(explorerApiUrls).find(_apiName => _apiName === apiName)
  if (!found) {
    throw new Error(`Api name ${apiName} is not supported, supported api names are ${Object.keys(explorerApiKeys)}`);
  }
}

const cli = new Command('ethereum-downloader')
cli.description("Download contract source code from etherscan like api");

cli
  .argument("<apiName>", "Name of the etherscan like api")
  .argument("<contractAddress>", "Address of the contract")
  .argument("[outDir]", "Output directory for the downloaded contract sources")
  .description(
    "Download contract source code from etherscan like api"
  )
  .action((apiName: ApiName, contractAddress: string, outDir: string) => {
    validateExplorerApiName(apiName);
    saveContractFilesToFs(
      //@ts-ignore
      fse,
      apiName,
      contractAddress,
      console,
      outDir
    )
  });


export const launch = () => {
    cli.parse(process.argv);
} 
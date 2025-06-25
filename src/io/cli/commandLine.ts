import { ApiName, explorerApiKeys, explorerApiUrls, NetworkIdV2, v2SupportedNetworks } from "../../explorer";
import { saveContractFilesToFs, saveContractFilesToFsV2 } from "../fs/openContractSource";
import fse from 'fs-extra';
import { Command } from "commander";

function validateExplorerApiName(apiName: string): void {
  const found = Object.keys(explorerApiUrls).find(_apiName => _apiName === apiName)
  if (!found) {
    throw new Error(`Api name ${apiName} is not supported, supported api names are ${Object.keys(explorerApiKeys)}`);
  }
}

function validateSupportedNetworkV2(_networkId: string): void {
  let networkId = 0;
  try {
    networkId = parseInt(_networkId);
  } catch (e) {
    throw new Error(`In Etherscan V2 API, Network id should be the chain id`)
  }
  const found = explorer_1.v2SupportedNetworks.hasOwnProperty(String(networkId)) ? String(networkId) : undefined;
  if (!found) {
    throw new Error(`Network id ${_networkId} is not supported, supported network ids are ${Object.keys(v2SupportedNetworks)}`);
  }
}

const cli = new Command('ethereum-downloader')
cli.description("Download contract source code from etherscan like api");

cli
  .argument("<networkId>", "Name of the etherscan like api")
  .argument("<contractAddress>", "Address of the contract")
  .argument("[outDir]", "Output directory for the downloaded contract sources")
  // @note these arguments are optional in v1, so we keep them optional for now
  .option("-k, --api-key [apiKey]", "API key for the service")
  .option("-a, --api-version [apiVersion]", "Etherscan API version to use")
  .description(
    "Download contract source code from etherscan like api"
  )
  .action((networkId: string, contractAddress: string, outDir: string, options: any) => {
    const version = options.apiVersion || "v1";
    if (version.toLowerCase() == "v2") {
      const apiKey = options.apiKey;
      if (!apiKey) {
        throw Error("Etherscan v2 API requires an API key");
      }
      handleV2Api(networkId, contractAddress, outDir, apiKey)
    } else {
      //use version 1 by default
      const apiKey = options.apiKey;
      handleV1Api(networkId as ApiName, contractAddress, outDir, apiKey);
    }
  });

function handleV1Api(apiName: ApiName, contractAddress: string, outDir: string, apiKey: string) {
  //use version 1 by default
  validateExplorerApiName(apiName);
  saveContractFilesToFs(
    fse as any,
    apiName,
    contractAddress,
    console,
    outDir,
    apiKey
  )
}

function handleV2Api(_networkId: string, contractAddress: string, outDir: string, apiKey: string) {
  //use version 1 by default
  validateSupportedNetworkV2(_networkId);
  const networkId = _networkId as NetworkIdV2;
  saveContractFilesToFsV2(
    fse as any,
    networkId,
    contractAddress,
    console,
    apiKey,
    outDir
  )
}


export const launch = () => {
  cli.parse(process.argv);
} 
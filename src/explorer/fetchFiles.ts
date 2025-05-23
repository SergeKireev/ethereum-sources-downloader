import { join } from "path";
import { assert, StrictOmit } from "ts-essentials";

import { fetch as _fetch } from "../util/fetch";
import { prettyStringify } from "../util/stringify";
import * as types from "./api-types";
import { apiUrlToWebsite } from "./apiUrlToWebsite";
import { fileExtension } from "./fileExtension";
import { ApiName, explorerApiKeys, explorerApiUrls, NetworkIdV2, V2ApiUrl } from "./networks";

interface FetchFilesOptions {
  /**
   * For unit testing.
   * @internal
   */
  fetch?: typeof _fetch;
  /**
   * If more than 0, we fetch implementation contract and merge its files.
   */
  proxyDepth?: number;
}

function buildV2Url(
  networkId: string,
  contractAddress: string,
  apiKey: string
): string {
  const url = new URL(V2ApiUrl);

  url.searchParams.set('chainid', networkId);
  url.searchParams.set('module', 'contract');
  url.searchParams.set('action', 'getsourcecode');
  url.searchParams.set('address', contractAddress);
  url.searchParams.set('apikey', apiKey);

  return url.toString();
}

export async function fetchFilesV2(
  networkId: NetworkIdV2,
  contractAddress: string,
  apiKey: string,
  fetchFileOptions: FetchFilesOptions = {},
) {
  //We need to have these as functions, because fetchFilesHelper calls itself recursively in case of proxy
  //TODO: We need to find a way to provide correct link to the right block explorer again
  const buildWebsiteUrl = (address: string) => apiUrlToWebsite(explorerApiUrls["etherscan"]);
  const buildApiUrl = (address: string) => buildV2Url(networkId, contractAddress, apiKey)

  return fetchFilesHelper(
    contractAddress,
    buildApiUrl,
    buildWebsiteUrl,
    fetchFileOptions,
  )
}

export async function fetchFiles(
  apiName: ApiName,
  contractAddress: string,
  fetchFileOptions: FetchFilesOptions = {},
  useApiKey: boolean = true,
  apiKey?: string
) {
  //We need to have these as functions, because fetchFilesHelper calls itself recursively in case of proxy


  const buildWebsiteUrl = (address: string) => apiUrlToWebsite(explorerApiUrls[apiName]);
  const buildApiUrl = (address: string) => {
    const apiUrl = explorerApiUrls[apiName];
    const apiKeyClause = useApiKey ? `&apikey=${apiKey || explorerApiKeys[apiName]}` : ``;
    const url = `${apiUrl}?module=contract&action=getsourcecode&address=${contractAddress}${apiKeyClause}`;
    return url;
  }

  return fetchFilesHelper(
    contractAddress,
    buildApiUrl,
    buildWebsiteUrl,
    fetchFileOptions,
  )
}

async function fetchFilesHelper(
  contractAddress: string,
  buildApiUrl: (address: string) => string,
  buildWebsiteUrl: (address: string) => string,
  { fetch = _fetch, proxyDepth = 3 }: FetchFilesOptions = {}
): Promise<FetchFilesResult> {
  const url = buildApiUrl(contractAddress);

  const response = (await fetch(url)) as types.ContractSourceResponse;

  assert(
    response.message.substring(0, 2) === "OK",
    "Failed to fetch contract source\n" + prettyStringify(response)
  );

  const {
    SourceCode: sourceCode,
    ABI: abi,
    Implementation: implementationAddr,
    ..._info
  } = response.result[0];

  const info: FetchFilesResult["info"] = _info;

  let files: FileContents = {};

  if (
    !sourceCode ||
    (!info.ContractName && abi === "Contract source code not verified")
  ) {
    return {
      files: {
        "error.md": contractNotVerifiedErrorMsg(buildWebsiteUrl, contractAddress),
      },
      info,
    };
  }

  if (types.sourceHasSettings(sourceCode)) {
    let parsed = types.parseSourceCode(sourceCode);

    files["settings.json"] = prettyStringify(parsed.settings);

    for (const [path, { content }] of Object.entries(parsed.sources)) {
      files[path] = content;
    }

    files = prefixFiles(files, info.ContractName);
  } else if (types.sourceHasMulitpleFiles(sourceCode)) {
    const parsed = types.parseSourceCode(sourceCode);

    for (const [path, { content }] of Object.entries(parsed)) {
      files[path] = content;
    }

    files = prefixFiles(files, info.ContractName);
  } else {
    files[info.ContractName + fileExtension(info)] = sourceCode;
  }

  if (
    implementationAddr &&
    proxyDepth > 0 &&
    implementationAddr !== contractAddress
  ) {
    const implementation = await fetchFilesHelper(
      implementationAddr,
      buildApiUrl,
      buildWebsiteUrl, {
      fetch,
      proxyDepth: proxyDepth - 1,
    });

    Object.assign(
      files,
      prefixFiles(implementation.files, implementation.info.ContractName)
    );
    info.implementation = implementation.info;
  }

  return { files, info };
}

function prefixFiles(files: FileContents, prefix: string): FileContents {
  const res: any = {};

  const keys = Object.keys(files);

  for (const k of keys) {
    res[join(prefix, k)] = files[k];
  }

  return res;
}

export interface FetchFilesResult {
  files: FileContents;
  info: ContractInfoWithImplementation;
}

export interface ContractInfoWithImplementation extends ContractInfo {
  implementation?: ContractInfo;
}

export interface ContractInfo
  extends StrictOmit<
    types.ContractInfo,
    "SourceCode" | "ABI" | "Implementation"
  > { }

export interface FileContents
  extends Record<types.FilePath, types.FileContent> { }

function contractNotVerifiedErrorMsg(
  buildWebsiteUrl: (address: string) => string,
  contractAddress: string
) {
  const websiteUrl = buildWebsiteUrl(contractAddress);
  return `\
Oops! It seems this contract source code is not verified on ${websiteUrl}.

Take a look at ${websiteUrl}/address/${contractAddress}.
`;
}

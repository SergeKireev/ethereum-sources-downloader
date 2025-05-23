/**
 * mapping from DethCode subdomain to Etherscan-like API URL
 */
export const explorerApiUrls = {
  etherscan: "https://api.etherscan.io/api",
  "ropsten.etherscan": "https://api-ropsten.etherscan.io/api",
  "rinkeby.etherscan": "https://api-rinkeby.etherscan.io/api",
  "goerli.etherscan": "https://api-goerli.etherscan.io/api",
  "kovan.etherscan": "https://api-kovan.etherscan.io/api",
  bscscan: "https://api.bscscan.com/api",
  "testnet.bscscan": "https://api-testnet.bscscan.com/api",
  hecoinfo: "https://api.hecoinfo.com/api",
  "testnet.hecoinfo": "https://api-testnet.hecoinfo.com/api",
  ftmscan: "https://api.ftmscan.com/api",
  "testnet.ftmscan": "https://api-testnet.ftmscan.com/api",
  "optimistic.etherscan": "https://api-optimistic.etherscan.io/api",
  "kovan-optimistic.etherscan": "https://api-kovan-optimistic.etherscan.io/api",
  polygonscan: "https://api.polygonscan.com/api",
  "testnet.polygonscan": "https://api-testnet.polygonscan.com/api",
  arbiscan: "https://api.arbiscan.io/api",
  "testnet.arbiscan": "https://api-testnet.arbiscan.io/api",
  snowtrace: "https://api.snowtrace.io/api",
  "testnet.snowtrace": "https://api-testnet.snowtrace.io/api",
  cronoscan: "https://api.cronoscan.com/api",
  moonbeam: "https://api-moonbeam.moonscan.io/api",
  aurora: "https://api.aurorascan.dev/api",
  basescan: "https://api.basescan.org/api",
  "goerli.basescan": "https://api-goerli.basescan.org"
};

/**
 * subdomain of DethCode
 */
export type ApiName = keyof typeof explorerApiUrls;

/**
 * mapping from DethCode subdomain to memfs root directory name
 */
export const networkNames: Record<ApiName, string> = {
  etherscan: "mainnet",
  "ropsten.etherscan": "ropsten",
  "rinkeby.etherscan": "rinkeby",
  "goerli.etherscan": "goerli",
  "kovan.etherscan": "kovan",
  bscscan: "bsc",
  "testnet.bscscan": "bscTestnet",
  hecoinfo: "heco",
  "testnet.hecoinfo": "hecoTestnet",
  ftmscan: "fantom",
  "testnet.ftmscan": "ftmTestnet",
  "optimistic.etherscan": "optimism",
  "kovan-optimistic.etherscan": "optimismKovan",
  polygonscan: "polygon",
  "testnet.polygonscan": "polygonMumbai",
  arbiscan: "arbitrumOne",
  "testnet.arbiscan": "arbitrumTestnet",
  snowtrace: "avalanche",
  "testnet.snowtrace": "avalancheTestnet",
  cronoscan: "cronos",
  moonbeam: "moonbeam",
  aurora: "aurora",
  basescan: "basescan",
  "goerli.basescan": "basescanGoerli"
};

const ETHERSCAN_KEY = "862Y3WJ4JB4B34PZQRFEV3IK6SZ8GNR9N5";
const OPTIMISM_KEY = "9MYGJVEVBDFF7XQF9IY15CZNM636S6NJGV";
const BSCSCAN_KEY = "HFUM7BBA5MRUQCN5UMEQPUZBUPPRHIQT3Y";
const FTMSCAN_KEY = "EH9NPZVF1HMNAQMAUZKA4VF7EC23X37DGS";
const HECOINFO_KEY = "XEUTJF2439EP4HHD23H2AFEFQJHFGSG57R";
const SNOWTRACE_KEY = "IQEHAJ43W674REN5XV79WF47X37VEB8PIC";
const ARBISCAN_KEY = "X3ZWJBXC14HTIR3B9DNYGEUICEIKKZ9ENZ";
const POLYGONSCAN_KEY = "RV4YXDXEMIHXMC7ZXB8T82G4F56FRZ1SZQ";
const CRONOSCAN_KEY = "BGAN1CWT8E1A2XRS3FU61UP7XXFMHBWNSY";
const MOONBEAM_KEY = "FENPKQI49RF2P916SQ2J58BTDMU69PQY8Y";
const AURORA_KEY = "F2JS84SQHM53V4T3AN2CSX6ZHUAXFSHJ8Y";
const BASESCAN_KEY = "ICQQDUA1C8R2EZY6M4QIIV7WUEZM8INNA7";

export const explorerApiKeys: Record<ApiName, string> = {
  etherscan: ETHERSCAN_KEY,
  "ropsten.etherscan": ETHERSCAN_KEY,
  "rinkeby.etherscan": ETHERSCAN_KEY,
  "goerli.etherscan": ETHERSCAN_KEY,
  "kovan.etherscan": ETHERSCAN_KEY,

  "optimistic.etherscan": OPTIMISM_KEY,
  "kovan-optimistic.etherscan": OPTIMISM_KEY,

  arbiscan: ARBISCAN_KEY,
  "testnet.arbiscan": ARBISCAN_KEY,

  bscscan: BSCSCAN_KEY,
  "testnet.bscscan": BSCSCAN_KEY,

  ftmscan: FTMSCAN_KEY,
  "testnet.ftmscan": FTMSCAN_KEY,

  hecoinfo: HECOINFO_KEY,
  "testnet.hecoinfo": HECOINFO_KEY,

  polygonscan: POLYGONSCAN_KEY,
  "testnet.polygonscan": POLYGONSCAN_KEY,

  snowtrace: SNOWTRACE_KEY,
  "testnet.snowtrace": SNOWTRACE_KEY,

  cronoscan: CRONOSCAN_KEY,
  moonbeam: MOONBEAM_KEY,
  aurora: AURORA_KEY,

  basescan: BASESCAN_KEY,
  'goerli.basescan': BASESCAN_KEY
};

/**
 * Etherscan V2 API
 */

export const v2SupportedNetworks = {
  "1": "Ethereum Mainnet",
  "11155111": "Sepolia Testnet",
  "17000": "Holesky Testnet",
  "2741": "Abstract Mainnet",
  "11124": "Abstract Sepolia Testnet",
  "33111": "ApeChain Curtis Testnet",
  "33139": "ApeChain Mainnet",
  "42170": "Arbitrum Nova Mainnet",
  "42161": "Arbitrum One Mainnet",
  "421614": "Arbitrum Sepolia Testnet",
  "43114": "Avalanche C-Chain",
  "43113": "Avalanche Fuji Testnet",
  "8453": "Base Mainnet",
  "84532": "Base Sepolia Testnet",
  "80094": "Berachain Mainnet",
  "80069": "Berachain Bepolia Testnet",
  "199": "BitTorrent Chain Mainnet",
  "1028": "BitTorrent Chain Testnet",
  "81457": "Blast Mainnet",
  "168587773": "Blast Sepolia Testnet",
  "56": "BNB Smart Chain Mainnet",
  "97": "BNB Smart Chain Testnet",
  "44787": "Celo Alfajores Testnet",
  "42220": "Celo Mainnet",
  "25": "Cronos Mainnet",
  "252": "Fraxtal Mainnet",
  "2522": "Fraxtal Testnet",
  "100": "Gnosis",
  "59144": "Linea Mainnet",
  "59141": "Linea Sepolia Testnet",
  "5000": "Mantle Mainnet",
  "5003": "Mantle Sepolia Testnet",
  "4352": "Memecore Mainnet",
  "43521": "Memecore Testnet",
  "1287": "Moonbase Alpha Testnet",
  "1284": "Moonbeam Mainnet",
  "1285": "Moonriver Mainnet",
  "10": "OP Mainnet",
  "11155420": "OP Sepolia Testnet",
  "80002": "Polygon Amoy Testnet",
  "137": "Polygon Mainnet",
  "2442": "Polygon zkEVM Cardona Testnet",
  "1101": "Polygon zkEVM Mainnet",
  "534352": "Scroll Mainnet",
  "534351": "Scroll Sepolia Testnet",
  "57054": "Sonic Blaze Testnet",
  "146": "Sonic Mainnet",
  "50104": "Sophon Mainnet",
  "531050104": "Sophon Sepolia Testnet",
  "1923": "Swellchain Mainnet",
  "1924": "Swellchain Testnet",
  "167009": "Taiko Hekla L2 Testnet",
  "167000": "Taiko Mainnet",
  "130": "Unichain Mainnet",
  "1301": "Unichain Sepolia Testnet",
  "1111": "WEMIX3.0 Mainnet",
  "1112": "WEMIX3.0 Testnet",
  "480": "World Mainnet",
  "4801": "World Sepolia Testnet",
  "660279": "Xai Mainnet",
  "37714555429": "Xai Sepolia Testnet",
  "51": "XDC Apothem Testnet",
  "50": "XDC Mainnet",
  "324": "zkSync Mainnet",
  "300": "zkSync Sepolia Testnet"
}

export type NetworkIdV2 = keyof typeof v2SupportedNetworks;

export const V2ApiUrl = `https://api.etherscan.io/v2/api`;
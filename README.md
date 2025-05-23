# Ethereum downloader cli

Adapted code from the great https://github.com/dethcrypto/dethcode
to be able to download the code of a smart contract locally

# Installation 

## Install from npm

```
npm i -g ethereum-sources-downloader
```

## Install from sources
```
npm i
cd ..
npm i -g ethereum-sources-downloader/
```

# Usage
```
ethereum-sources-downloader {networkId} {contractAddress} {optional:outDir} {-a, --api-version API_VERSION} {-k, --api-key API_KEY}
```

## Common arguments between Etherscan API V1 and V2
- `API_VERSION` is v1 or v2

- `contractAddress` in hexadecimal format (i.e 0x1F98431c8aD98523631AE4a59f267346ea31F984)

- `outDir` specifies optionally where the sources will be downloaded relative to current directory


## Etherscan API V1

`networkId` is one of:
 - etherscan
 - ropsten.etherscan
 - rinkeby.etherscan
 - goerli.etherscan
 - kovan.etherscan
 - bscscan
 - testnet.bscscan
 - hecoinfo
 - testnet.hecoinfo
 - ftmscan
 - testnet.ftmscan
 - optimistic.etherscan
 - kovan-optimistic.etherscan
 - polygonscan
 - testnet.polygonscan
 - arbiscan
 - testnet.arbiscan
 - snowtrace
 - testnet.snowtrace
 - cronoscan
 - moonbeam
 - aurora
 - basescan
 - goerli.basescan

## Etherscan API V2
`networkId` is one of the supported `chainid` listed [here](https://docs.etherscan.io/etherscan-v2/getting-started/supported-chains)


## CLI Tool Demo

Demo GIF illustrating the multiple contracts downloading capability which also preserves the directory structure

![](./essdemo.gif)
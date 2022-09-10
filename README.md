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
ethereum-sources-downloader {apiName} {contractAddress} {optional:outDir}
```

apiName is one of:
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

 contractAddress in hexadecimal format (i.e 0x1F98431c8aD98523631AE4a59f267346ea31F984)

 outDir specifies optionally where the sources will be downloaded relative to current directory


## CLI Tool Demo

Demo GIF illustrating the multiple contracts downloading capability which also preserves the directory structure

![](./essdemo.gif)
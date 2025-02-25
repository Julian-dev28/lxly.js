const { LxLyClient, use, setProofApi } = require('@maticnetwork/lxlyjs');
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const bn = require('bn.js');
const config = require('./config');

const SCALING_FACTOR = new bn(10).pow(new bn(18));

use(Web3ClientPlugin)
setProofApi('https://api-gateway.polygon.technology/api/v3/proof/mainnet')

// https://api-gateway.polygon.technology/api/v3/proof/mainnet/merkle-proof?networkId={sourceNetworkId}&depositCount={depositCount}



const getLxLyClient = async (network = 'mainnet') => {
  const lxLyClient = new LxLyClient();
  return await lxLyClient.init({
    log: true,
    network: network,
    providers: {
      3: {  // X Layer
        provider: new HDWalletProvider([config.user1.privateKey], config.configuration[3].rpc),
        configuration: {
          bridgeAddress: config.configuration[3].bridgeAddress,
          bridgeExtensionAddress: config.configuration[3].bridgeExtensionAddress,
          isEIP1559Supported: true
        },
        defaultConfig: {
          from: config.user1.address
        }
      },
      1: {  // Polygon zkEVM
        provider: new HDWalletProvider([config.user1.privateKey], config.configuration[1].rpc),
        configuration: {
          bridgeAddress: config.configuration[1].bridgeAddress,
          bridgeExtensionAddress: config.configuration[1].bridgeExtensionAddress,
          isEIP1559Supported: true
        },
        defaultConfig: {
          from: config.user1.address
        }
      }
    }
  });
}

module.exports = {
  SCALING_FACTOR,
  getLxLyClient: getLxLyClient,
  configuration: config.configuration,
  tokens: config.tokens,
  from: config.user1.address,
  privateKey: config.user1.privateKey,
  to: config.user2.address,
};
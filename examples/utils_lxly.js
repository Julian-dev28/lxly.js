
/**
 * X Layer Client Configuration
 * 
 * This utility file sets up the connection to X Layer and Polygon zkEVM networks.
 * It initializes the HDWalletProvider for transaction signing and configures the
 * bridge addresses for both networks.
 */

const { LxLyClient, use, setProofApi } = require('@maticnetwork/lxlyjs');
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const bn = require('bn.js');
const config = require('./config');

// Scaling factor for token amounts (10^18 for most ERC20 tokens)
const SCALING_FACTOR = new bn(10).pow(new bn(18));

// Use the Web3 plugin for the LxLy client
use(Web3ClientPlugin)

// Set the API endpoint for generating Merkle proofs
// This is required for claiming assets on the destination network
setProofApi('https://api-gateway.polygon.technology/api/v3/proof/mainnet')

/**
 * Initialize the LxLy client with network configurations for X Layer and Polygon zkEVM
 * 
 * @param {string} network - The network to use ('mainnet' or 'testnet')
 * @returns {Promise<LxLyClient>} - Initialized LxLy client
 */
const getLxLyClient = async (network = 'mainnet') => {
  const lxLyClient = new LxLyClient();
  return await lxLyClient.init({
    log: true,
    network: network,
    providers: {
      3: {  // X Layer configuration
        provider: new HDWalletProvider([config.user1.privateKey], config.configuration[3].rpc),
        configuration: {
          bridgeAddress: config.configuration[3].bridgeAddress,
          bridgeExtensionAddress: config.configuration[3].bridgeExtensionAddress,
          isEIP1559Supported: true // Supports EIP-1559 gas model
        },
        defaultConfig: {
          from: config.user1.address
        }
      },
      1: {  // Polygon zkEVM configuration
        provider: new HDWalletProvider([config.user1.privateKey], config.configuration[1].rpc),
        configuration: {
          bridgeAddress: config.configuration[1].bridgeAddress,
          bridgeExtensionAddress: config.configuration[1].bridgeExtensionAddress,
          isEIP1559Supported: true // Supports EIP-1559 gas model
        },
        defaultConfig: {
          from: config.user1.address
        }
      }
    }
  });
}

// Export configured client and utility variables
module.exports = {
  SCALING_FACTOR,
  getLxLyClient: getLxLyClient,
  configuration: config.configuration,
  tokens: config.tokens,
  from: config.user1.address,
  privateKey: config.user1.privateKey,
  to: config.user2.address,
};
/**
 * X Layer Bridge Configuration
 * 
 * This configuration file sets up the network and account information needed for 
 * the X Layer bridge operations. It loads values from environment variables with 
 * sensible defaults for quick testing.
 */

const dotenv = require('dotenv')
const path = require('path');

// Load environment variables from .env file
const env = dotenv.config({
    path: path.join(__dirname, '.env')
});

// Verify that the environment file was found and loaded correctly
if (env.error) {
    throw new Error("no env file found");
}

module.exports = {
    // Network setting - can be overridden by NETWORK environment variable
    network: process.env.NETWORK || 'mainnet',

    // Network-specific configurations
    configuration: {
        3: {  // X Layer (networkId 3 in the client, corresponds to chainId 196)
            // RPC endpoint for connecting to X Layer
            rpc: process.env.NETWORK_196_RPC || 'https://xlayerrpc.okx.com',

            // Bridge contract address on X Layer
            // This is the entry point for all bridge transactions from X Layer
            bridgeAddress: process.env.NETWORK_196_BRIDGE || '0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe',

            // Bridge extension contract that provides additional functionality
            bridgeExtensionAddress: process.env.NETWORK_196_BRIDGE_EXTENSION || '0x64B20Eb25AEd030FD510EF93B9135278B152f6a6',

            // Indicates if the network supports EIP-1559 gas model (dynamic fee)
            isEIP1559Supported: true
        },
        1: {  // Polygon zkEVM (networkId 1 in the client, corresponds to chainId 1101)
            // RPC endpoint for connecting to Polygon zkEVM
            rpc: process.env.NETWORK_1101_RPC || 'https://zkevm-rpc.com',

            // Bridge contract address on Polygon zkEVM
            // This handles incoming assets from other networks
            bridgeAddress: process.env.NETWORK_1101_BRIDGE || '0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe',

            // Bridge extension contract on Polygon zkEVM
            bridgeExtensionAddress: process.env.NETWORK_1101_BRIDGE_EXTENSION || '0x64B20Eb25AEd030FD510EF93B9135278B152f6a6',

            // Indicates if the network supports EIP-1559 gas model
            isEIP1559Supported: true
        },
    },

    // Token address definitions for each network
    // The zero address (0x0000...0000) represents the native token (ETH)
    tokens: {
        196: {  // X Layer chain ID
            eth: '0x0000000000000000000000000000000000000000'  // ETH on X Layer
        },
        1101: {  // Polygon zkEVM chain ID
            eth: '0x0000000000000000000000000000000000000000'  // ETH on Polygon zkEVM
        }
    },

    // User accounts for testing and transactions
    user1: {
        // Private key should be set in the .env file and never committed to code
        privateKey: process.env.USER1_PRIVATE_KEY,
        // Address derived from the private key
        address: process.env.USER1_FROM
    },
    user2: {
        // Second user address for receiving assets (if needed)
        address: process.env.USER2_FROM,
        // Second user's private key (if needed for transactions)
        privateKey: process.env.USER2_PRIVATE_KEY,
    },
}
const dotenv = require('dotenv')
const path = require('path');
const env = dotenv.config({
    path: path.join(__dirname, '.env')
});

if (env.error) {
    throw new Error("no env file found");
}

module.exports = {
    network: process.env.NETWORK || 'mainnet',
    configuration: {
        196: {  // X Layer
            rpc: process.env.NETWORK_196_RPC || 'https://xlayerrpc.okx.com',
            bridgeAddress: process.env.NETWORK_196_BRIDGE || '0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe',
            bridgeExtensionAddress: process.env.NETWORK_196_BRIDGE_EXTENSION || '0x64B20Eb25AEd030FD510EF93B9135278B152f6a6',
            isEIP1559Supported: true
        },
        1101: {  // Polygon zkEVM
            rpc: process.env.NETWORK_1101_RPC || 'https://zkevm-rpc.com',
            bridgeAddress: process.env.NETWORK_1101_BRIDGE || '0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe',
            bridgeExtensionAddress: process.env.NETWORK_1101_BRIDGE_EXTENSION || '0x64B20Eb25AEd030FD510EF93B9135278B152f6a6',
            isEIP1559Supported: true
        },
    },
    tokens: {
        196: {
            eth: '0x0000000000000000000000000000000000000000'
        },
        1101: {
            eth: '0x0000000000000000000000000000000000000000'
        }
    },
    user1: {
        privateKey: process.env.USER1_PRIVATE_KEY,
        address: process.env.USER1_FROM
    },
    user2: {
        address: process.env.USER2_FROM,
        privateKey: process.env.USER2_PRIVATE_KEY,
    },
}
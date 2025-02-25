# X Layer Bridge Examples

This repository contains example implementations for using X Layer's bridging capabilities. These NodeJS scripts demonstrate how to bridge assets between X Layer and other networks like zkEVM.

## Overview

X Layer is a cutting-edge Ethereum layer 2 (L2) solution offering full EVM compatibility with significantly lower fees and higher throughput. These examples showcase our bridge functionality, enabling seamless asset transfers across our ecosystem.

## Key Examples

- `examples/lxly/bridge_and_call/xlayer_to_zkevm.js` - Bridge assets from X Layer to zkEVM
- `examples/lxly/bridge_and_call/xlayer_to_zkevm_claim.js` - Claim bridged assets on zkEVM

## Getting Started

### 1. Configure Your Environment

First, set up your environment variables:

1. Copy `.env.example` to `.env`
2. Fill in your configuration values:

```
# USER 1 DETAILS
USER1_PRIVATE_KEY=
USER1_FROM=

# USER 2 DETAILS
USER2_FROM=
USER2_PRIVATE_KEY=

# NETWORK
NETWORK=mainnet

# X Layer (196)
NETWORK_196_RPC=
NETWORK_196_BRIDGE=
NETWORK_196_BRIDGE_EXTENSION=

# zkEVM (1101)
NETWORK_1101_RPC=
NETWORK_1101_BRIDGE=
NETWORK_1101_BRIDGE_EXTENSION=
```

**IMPORTANT:** Be careful with your private keys. Use test accounts for development purposes and never commit private keys to repositories or share them publicly.

### 2. Install Dependencies

Install the required dependencies:

```bash
npm i
```

**Note:** Make sure you're in the examples folder when running this command.

### 3. Run the Examples

Execute any example script using:

```bash
node <file_path>
```

For example, to run the `xlayer_to_zkevm.js` script:

```bash
node lxly/bridge_and_call/xlayer_to_zkevm.js
```

## X Layer Bridge Architecture

Our bridge implementation leverages X Layer's zkEVM validium architecture to provide:

- Ultra-fast bridging between networks
- Significantly lower costs compared to other bridge solutions
- Seamless integration with the broader Polygon ecosystem
- Enhanced security through ZK proofs
- Simplified developer experience with our `getLxLyClient` utility

## Advanced Usage: Running with Source Code

For developers who want to use the examples with the current source code (helpful for debugging):

### 1. Build & Link Source Code

From the root of the project, run:

```bash
npm run build:link
```

You might need to use `sudo` if you encounter permission issues.

### 2. Link the Library

```bash
# Move to examples folder
cd examples

# Link the library
npm run link:lib
```

## Why Use X Layer for Cross-Chain Operations?

X Layer offers several advantages for developers building cross-chain applications:

- **Speed**: Bridge transactions complete in seconds instead of minutes
- **Cost**: Significantly lower gas fees compared to Ethereum mainnet
- **Security**: Secured by zero-knowledge proofs
- **Compatibility**: Full EVM compatibility for seamless deployment
- **Integration**: Part of the expanding AggLayer ecosystem

## Support & Resources

For additional support or resources:

- Visit our [developer documentation](https://www.okx.com/xlayer/docs/users/welcome/about-x-layer)
- Join our [Discord community](https://discord.gg/eE8Q6q9Vx3)
- Follow us on [Twitter](https://twitter.com/xlayerofficial)

## Contribution

We welcome contributions from the community! If you have suggestions or improvements for these examples, please submit a pull request.
/**
 * X Layer Bridge Example
 * 
 * This script demonstrates how to bridge assets from X Layer to Polygon zkEVM
 * using X Layer's bridging infrastructure. The example shows the entire process
 * from initiation to confirmation.
 * 
 * The X Layer bridge offers significantly faster cross-chain transfers compared to
 * traditional bridges - completing in seconds instead of minutes.
 */

const { getLxLyClient, tokens, configuration, from } = require('../../utils_lxly');
const Web3 = require('web3');

const execute = async () => {
    // Initialize the LxLy client which provides access to bridge functionality
    // This abstraction handles all the complex cross-chain communication
    const client = await getLxLyClient();

    // Define network IDs for the bridge operation
    // 3 = X Layer (source network)
    // 1 = Polygon zkEVM (destination network)
    const sourceNetwork = 3;
    const destinationNetwork = 1;

    // Set the amount to bridge (0.1 ETH)
    // Using Web3's utility function to convert from ETH to Wei (1 ETH = 10^18 Wei)
    const web3 = new Web3();
    const amount = web3.utils.toWei('0.1', 'ether');

    try {
        // Initiate the bridge transaction using the bridgeAsset method
        // This single call handles all the complexity of cross-chain transfers
        const result = await client.bridges[sourceNetwork].bridgeAsset(
            destinationNetwork,  // The network ID where assets will be sent
            from,                // The destination address (receiver of the assets)
            amount,              // Amount to bridge in Wei
            tokens[sourceNetwork].eth, // Token address (zero address for native ETH)
            true,               // forceUpdateGlobalExitRoot - technical parameter for exit root updates
            "0x0",               // permitData - used for ERC20 permit functionality, not needed for ETH
            {
                value: amount,   // The actual ETH value being sent with the transaction
                gasLimit: 300000 // Gas limit for the transaction - adjust based on network conditions
            }
        );

        // Get the transaction hash - can be used to track the transaction
        const txHash = await result.getTransactionHash();
        console.log("Transaction hash:", txHash);

        // Wait for transaction receipt - confirms the transaction was mined
        const receipt = await result.getReceipt();
        console.log("Receipt:", receipt);

    } catch (err) {
        // Error handling to provide useful debug information
        console.error("Error:", err);
    }
}

// Execute the main function and handle any unhandled promise rejections
execute()
    .then(() => process.exit(0))
    .catch(err => {
        console.error("Fatal error:", err);
        process.exit(1);
    });

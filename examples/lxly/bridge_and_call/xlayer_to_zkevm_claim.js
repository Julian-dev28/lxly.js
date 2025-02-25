/**
 * Claiming Bridged Assets
 * 
 * After initiating a bridge transaction, assets need to be claimed on the destination
 * network. This second script demonstrates how to claim assets that have been bridged
 * from X Layer to Polygon zkEVM.
 */

const { getLxLyClient, tokens, configuration, from, to } = require('../../utils_lxly');

const execute = async () => {
    // Initialize the client
    const client = await getLxLyClient();

    // The transaction hash from the initial bridging operation
    // This transaction happened on the source network (X Layer)
    const bridgeTransactionHash = "0x2a4aad2453465e5b632e93c769b3b5ca997e5b11056202485c32324b6c399676";
    const sourceNetworkId = 3;    // X Layer (where the bridge tx was initiated)
    const destinationNetworkId = 1;  // Polygon zkEVM (where we'll claim the assets)

    try {
        // Step 1: Get the bridge transaction data
        // This retrieves information about the original bridge transaction
        console.log("Getting bridge transaction data...");
        const bridgeData = await client.bridgeUtil.getBridgeLogData(bridgeTransactionHash, sourceNetworkId);
        console.log("Bridge Data:", bridgeData);

        // Step 2: Check if the assets have already been claimed
        // This prevents double-claiming of assets
        console.log("\nChecking if already claimed...");
        const isClaimed = await client.bridges[destinationNetworkId].isClaimed(
            bridgeData.depositCount,
            sourceNetworkId,
        );
        console.log("Is Claimed:", isClaimed);

        if (isClaimed) {
            console.log("This transaction has already been claimed!");
            return;
        }

        // Step 3: Build the Merkle proof needed for claiming
        // This proof demonstrates that the transaction was included in the bridge
        console.log("\nAttempting to build proof for claim...");
        const proof = await client.bridgeUtil.buildPayloadForClaim(
            bridgeTransactionHash,
            sourceNetworkId,
            0
        );
        console.log("Proof Data:", {
            globalIndex: proof.globalIndex,
            mainnetExitRoot: proof.mainnetExitRoot,
            rollupExitRoot: proof.rollupExitRoot
        });

        // Step 4: Claim the bridged assets on the destination network
        // This completes the bridging process by releasing assets on the destination
        console.log("\nAttempting claim...");
        const result = await client.bridges[destinationNetworkId].claimAsset(
            proof.smtProof,         // Sparse Merkle Tree proof
            proof.smtProofRollup,   // Rollup-specific Merkle proof
            proof.globalIndex,      // Global index in the Merkle tree
            proof.mainnetExitRoot,  // Exit root hash from mainnet
            proof.rollupExitRoot,   // Exit root hash from rollup
            proof.originNetwork,    // Source network ID
            proof.originTokenAddress, // Original token address
            proof.destinationNetwork, // Destination network ID
            proof.destinationAddress, // Recipient address
            proof.amount,           // Amount being claimed
            proof.metadata          // Additional metadata for the claim
        );

        // Get transaction details
        const txHash = await result.getTransactionHash();
        console.log("Claim transaction hash:", txHash);

        const receipt = await result.getReceipt();
        console.log("Claim receipt:", receipt);

    } catch (err) {
        // Detailed error handling for debugging
        console.error("Error details:", {
            message: err.message,
            type: err.type || 'unknown',
            details: err.details || 'No additional details',
            stack: err.stack
        });
    }
}

execute()
    .then(() => process.exit(0))
    .catch(err => {
        console.error("Fatal error:", err);
        process.exit(1);
    });
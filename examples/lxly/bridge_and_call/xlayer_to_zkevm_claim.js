const { getLxLyClient, tokens, configuration, from, to } = require('../../utils_lxly');

const execute = async () => {
    const client = await getLxLyClient();
    
    const bridgeTransactionHash = "0xdb79ee3b309571d741f6ad59cc8f06efd5cb3654aa805d54bfa5d4d731cb7c71";
    const sourceNetworkId = 196;    // X Layer
    const destinationNetworkId = 1101;  // Polygon zkEVM
    
    try {
        // Get the bridge transaction data first
        console.log("Getting bridge transaction data...");
        const bridgeData = await client.bridgeUtil.getBridgeLogData(bridgeTransactionHash, sourceNetworkId);
        console.log("Bridge Data:", bridgeData);

        // Check if already claimed
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

        // Try to get the proof directly
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

        console.log("\nAttempting claim...");
        const result = await client.bridges[destinationNetworkId].claimAsset(
            proof.smtProof,
            proof.smtProofRollup,
            proof.globalIndex,
            proof.mainnetExitRoot,
            proof.rollupExitRoot,
            proof.originNetwork,
            proof.originTokenAddress,
            proof.destinationNetwork,
            proof.destinationAddress,
            proof.amount,
            proof.metadata
        );

        const txHash = await result.getTransactionHash();
        console.log("Claim transaction hash:", txHash);
        
        const receipt = await result.getReceipt();
        console.log("Claim receipt:", receipt);

    } catch (err) {
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
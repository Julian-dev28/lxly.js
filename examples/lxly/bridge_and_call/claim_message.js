const { getLxLyClient, tokens, configuration, from, to } = require('../../utils_lxly');

const execute = async () => {
    const client = await getLxLyClient();
    // example bridge txn hash from the source chain.
    const bridgeTransactionHash = "0x2a4aad2453465e5b632e93c769b3b5ca997e5b11056202485c32324b6c399676"; 
    // Source Network ID, in this example its 1 since its from cardona.
    const sourceNetworkId = 1;
    // Destination Network ID, in this example its 0 since its to sepolia.
    const destinationNetworkId = 0;
    // API for building payload for claim
    // `bridgeIndex` is needed when there's multiple bridge events in a single txn. It is used to select the claim associated bridge event.
    const result = 
        await client.bridgeUtil.buildPayloadForClaim(bridgeTransactionHash, sourceNetworkId, bridgeIndex=1)
        // payload is then passed to `claimMessage` API
        .then((payload) => {
            return client.bridges[destinationNetworkId].claimMessage(
                payload.smtProof,
                payload.smtProofRollup,
                payload.globalIndex,
                payload.mainnetExitRoot,
                payload.rollupExitRoot,
                payload.originNetwork,
                payload.originTokenAddress,
                payload.destinationNetwork,
                payload.destinationAddress,
                payload.amount,
                payload.metadata
            );
        });

    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
    const receipt = await result.getReceipt();
    console.log("receipt", receipt);
}

execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
});
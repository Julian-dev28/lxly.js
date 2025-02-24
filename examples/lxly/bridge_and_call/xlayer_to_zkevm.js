const { getLxLyClient, tokens, configuration, from } = require('../../utils_lxly');
const Web3 = require('web3');

const execute = async () => {
    const client = await getLxLyClient();
    
    // X Layer to zkEVM
    const sourceNetwork = 196;
    const destinationNetwork = 1101;
    
    // Use ETH token
    const token = "0x0000000000000000000000000000000000000000";
    
    // Amount to bridge (0.1 ETH)
    const web3 = new Web3();
    const amount = web3.utils.toWei('0.2', 'ether');
    
    try {
        const result = await client.bridges[sourceNetwork].bridgeAsset(
            destinationNetwork,  // destination network ID
            from,               // destination address
            amount,             // amount to bridge
            token,              // token address
            false,             // forceUpdateGlobalExitRoot
            "0x0",             // permitData
            {
                value: amount,  // Specify the ETH value being sent
                gasLimit: 300000
            }
        );

        const txHash = await result.getTransactionHash();
        console.log("Transaction hash:", txHash);

        const receipt = await result.getReceipt();
        console.log("Receipt:", receipt);

    } catch (err) {
        console.error("Error:", err);
    }
}

execute()
    .then(() => process.exit(0))
    .catch(err => {
        console.error("Fatal error:", err);
        process.exit(1);
    });
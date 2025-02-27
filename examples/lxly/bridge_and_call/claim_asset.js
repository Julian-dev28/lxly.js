const { getLxLyClient, tokens, configuration, from } = require('../../utils_lxly');

const execute = async () => {
  	// the source chain txn hash of `bridgeAsset` call.
    const bridgeTransactionHash = "";
		
    // instantiate a lxlyclient
  	const client = await getLxLyClient();
    // the source networkId
    const sourcenNetworkId = 0;
    // the destination networkId
    const destinationNetworkId = 1;
    // get an api instance of ether token on cardona testnet
    const token = client.erc20(tokens[destinationNetworkId].ether, destinationNetworkId);
	  // call the `claimAsset` api.
    const result = await token.claimAsset(bridgeTransactionHash, sourcenNetworkId, {returnTransaction: false});
    console.log("result", result);
  	// getting the transactionhash if rpc request is sent
    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
  	// getting the transaction receipt.
    const receipt = await result.getReceipt();
    console.log("receipt", receipt);

}

execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
});
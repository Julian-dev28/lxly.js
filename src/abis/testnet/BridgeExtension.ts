export default [
    { "type": "constructor", "inputs": [], "stateMutability": "nonpayable" }, 
    { "type": "function", "name": "bridge", 
        "inputs": [], 
        "outputs": [
            { "name": "", "type": "address", "internalType": "contract PolygonZkEVMBridgeV2" }
        ], "stateMutability": "view" 
    }, 
    { "type": "function", "name": "bridgeAndCall", 
        "inputs": [
            { "name": "token", "type": "address", "internalType": "address" }, 
            { "name": "amount", "type": "uint256", "internalType": "uint256" }, 
            { "name": "permitData", "type": "bytes", "internalType": "bytes" }, 
            { "name": "destinationNetwork", "type": "uint32", "internalType": "uint32" }, 
            { "name": "callAddress", "type": "address", "internalType": "address" }, 
            { "name": "fallbackAddress", "type": "address", "internalType": "address" }, 
            { "name": "callData", "type": "bytes", "internalType": "bytes" }, 
            { "name": "forceUpdateGlobalExitRoot", "type": "bool", "internalType": "bool" }
        ], "outputs": [], "stateMutability": "payable" 
    }, 
    { "type": "function", "name": "initialize", "inputs": [{ "name": "bridge_", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, 
    { "type": "function", "name": "onMessageReceived", "inputs": [{ "name": "originAddress", "type": "address", "internalType": "address" }, { "name": "originNetwork", "type": "uint32", "internalType": "uint32" }, { "name": "data", "type": "bytes", "internalType": "bytes" }], "outputs": [], "stateMutability": "payable" }, 
    { "type": "event", "name": "Initialized", "inputs": [{ "name": "version", "type": "uint8", "indexed": false, "internalType": "uint8" }], "anonymous": false }, 
    { "type": "error", "name": "AmountDoesNotMatchMsgValue", "inputs": [] }, 
    { "type": "error", "name": "InvalidAddress", "inputs": [] }, 
    { "type": "error", "name": "InvalidDepositIndex", "inputs": [] }, 
    { "type": "error", "name": "OriginMustBeBridgeExtension", "inputs": [] }, 
    { "type": "error", "name": "SenderMustBeBridge", "inputs": [] }, 
    { "type": "error", "name": "UnclaimedAsset", "inputs": [] }
]
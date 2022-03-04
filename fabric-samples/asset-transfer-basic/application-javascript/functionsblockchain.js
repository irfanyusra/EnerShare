const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const walletPath = path.join(__dirname, 'wallet');
const peerUserList = ['appUser'];
const ccp = buildCCPOrg1();


const FabricCAServices = require('fabric-ca-client');
const { buildCAClient, registerAndEnrollUser, removePeerUser, getAllPeerUser } = require('../../test-application/javascript/CAUtil.js');
const mspOrg1 = 'Org1MSP';

const PeerManagement = require('../../test-network/peerManagement.js');

const fs = require('fs')

function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
}

exports.test = function () {
    return 'hey'
};

async function getContractUsingWallet() {
    let peerUserId = peerUserList[Math.floor(Math.random() * peerUserList.length)];

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);
    // Check to see if we've already enrolled the user.
    const userExists = await wallet.get(peerUserId);
    if (!userExists) {
        console.log(`An identity for the user ${peerUserId} does not exist in the wallet`);
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    // Create a new gateway instance for interacting with the fabric network.
    // In a real application this would be done as the backend server session is setup for
    // a user that has been verified.
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    console.log(`Using peer user: ${peerUserId} to submit the transaction`);
    await gateway.connect(ccp, { wallet, identity: peerUserId, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);
    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);
    return [contract, gateway];
}


exports.registerPeerUser = async function (peerUserId) {

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);

    // in a real application this would be done only when a new user was required to be added and would be part of an administrative flow
    await registerAndEnrollUser(caClient, wallet, mspOrg1, peerUserId, 'org1.department1');
    peerUserList.push(peerUserId);

}

exports.getRegisteredPeerUsers = async function () {
    const wallet = await buildWallet(Wallets, walletPath);
    return await getAllPeerUser(wallet);
}


exports.removeRegisteredPeerUsers = async function (peerUserId) {
    // the information in the network configuration
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);

    // in a real application this would be done only when a new user was required to be added and would be part of an administrative flow
    await removePeerUser(caClient, wallet, peerUserId, 'org1.department1');
    peerUserList.pop(peerUserId);
}



exports.getUsers = async function () {

    const [contract, gateway] = await getContractUsingWallet();
    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction('GetAllAssets');

    console.log(`Transaction has been evaluated, result is: ${prettyJSONString(result.toString())}`);
    return JSON.parse(result.toString());

    // // Disconnect from the gateway.
    // await gateway.disconnect();


};

exports.getUserId = async function (id) {
    const [contract, gateway] = await getContractUsingWallet();
    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction('ReadAsset', id);
    console.log(`Transaction has been evaluated, result is: ${prettyJSONString(result.toString())}`);
    return JSON.parse(result.toString());

    // // Disconnect from the gateway.
    // await gateway.disconnect();
};


exports.addUser = async function (id) {

    const [contract, gateway] = await getContractUsingWallet();


    // // Submit the specified transaction.
    const result = await contract.submitTransaction('CreateAsset', id, Date.now());
    console.log('Transaction has been submitted');

    gateway.disconnect();

    return JSON.parse(result.toString());

    // Disconnect from the gateway.
    // await gateway.disconnect();


};

exports.getUserHistory = async function (id) {
    const [contract, gateway] = await getContractUsingWallet();

    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction('GetAssetHistory', id);
    console.log(`Transaction has been evaluated, result is: ${prettyJSONString(result.toString())}`);
    return JSON.parse(result.toString());

    // // Disconnect from the gateway.
    // await gateway.disconnect();
};


exports.getUserCreditHistory = async function (id) {
    const [contract, gateway] = await getContractUsingWallet();

    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction('GetAssetHistory', id);
    var values = JSON.parse(result.toString());
    let creditHistory = []
    for (var i = 0; i < values.length; i++) {
        creditHistory.push(values[i].Value.credits)
    }

    console.log(`Transaction has been evaluated, result is: ${prettyJSONString(result.toString())}`);
    return creditHistory;

    // // Disconnect from the gateway.
    // await gateway.disconnect();
};


exports.addUserBalance = async function (id, balance, reason) {
    const [contract, gateway] = await getContractUsingWallet();

    // Submit the specified transaction.
    const result = await contract.submitTransaction('AddBalance', id, balance, reason, Date.now());

    console.log(`Transaction has been evaluated, result is: ${prettyJSONString(result.toString())}`);
    // await gateway.disconnect();

    return JSON.parse(result.toString());
}

exports.subtractUserBalance = async function (id, balance, reason) {
    const [contract, gateway] = await getContractUsingWallet();

    // Submit the specified transaction.
    const result = await contract.submitTransaction('SubBalance', id, balance, reason, Date.now());

    console.log(`Transaction has been evaluated, result is: ${prettyJSONString(result.toString())}`);
    // await gateway.disconnect();

    return JSON.parse(result.toString());

}


exports.transferUserBalance = async function (sell_id, buy_id, balance, reason) {
    const [contract, gateway] = await getContractUsingWallet();

    console.log(sell_id)
    console.log(buy_id)
    console.log(balance)
    console.log(reason)
    // Submit the specified transaction.
    const result = await contract.submitTransaction('TransferBalance', sell_id, buy_id, balance, reason, Date.now());

    console.log(`Transaction has been evaluated, result is: ${prettyJSONString(result.toString())}`);
    // await gateway.disconnect();
    return JSON.parse(result.toString());

}

exports.removeUser = async function (id) {
    const [contract, gateway] = await getContractUsingWallet();

    // Submit the specified transaction.
    const result = await contract.submitTransaction('DeleteAsset', id);

    console.log('Transaction has been submitted');
    gateway.disconnect();
    return JSON.parse(result.toString());

    // Disconnect from the gateway.
    // await gateway.disconnect();
}

exports.createNewPeer = async function (peerName, corePeerPort) {
    return await PeerManagement.createNewPeer(peerName, corePeerPort)
}

exports.bringUpPeer = async function (peerName) {
    return await PeerManagement.bringUpPeer(peerName)
}

exports.bringDownPeer = async function (peerName) {
    return await PeerManagement.bringDownPeer(peerName)
}

exports.bringUpOrderer = async function (ordererName) {
    return await PeerManagement.bringUpOrderer(ordererName)
}

exports.bringDownOrderer = async function (ordererName) {
    return await PeerManagement.bringDownOrderer(ordererName)
}

exports.getAllPeers = async function () {
    let containers = await PeerManagement.getDockerContainers();
    let peerContainers = containers.filter(function (value, index, arr) {
        return value["NAMES"].includes("peer");
    });

    return peerContainers;
}

exports.getAllOrderers = async function () {
    let containers = await PeerManagement.getDockerContainers();
    let orderContainers = containers.filter(function (value, index, arr) {
        return value["NAMES"].includes("order");
    });

    return orderContainers;
}

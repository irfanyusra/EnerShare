const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';
const ccp = buildCCPOrg1();

function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
}

exports.test = function () {
    return 'hey'
};
exports.getUsers = async function () {
    try {

        // setup the wallet to hold the credentials of the application user
        const wallet = await buildWallet(Wallets, walletPath);
        // Check to see if we've already enrolled the user.
        const userExists = await wallet.get(org1UserId);
        if (!userExists) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway instance for interacting with the fabric network.
        // In a real application this would be done as the backend server session is setup for
        // a user that has been verified.
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);
        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('GetAllAssets');

        console.log(`Transaction has been evaluated, result is: ${prettyJSONString(result.toString())}`);
        return { response: JSON.parse(result.toString()) };

        // // Disconnect from the gateway.
        // await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return { error: error.toString() };
        // process.exit(1);
    }
};


exports.getUserId = async function (id) {
    try {
        const wallet = await buildWallet(Wallets, walletPath);
        const userExists = await wallet.get(org1UserId);
        if (!userExists) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('ReadAsset', id);
        console.log(`Transaction has been evaluated, result is: ${prettyJSONString(result.toString())}`);
        return { response: JSON.parse(result.toString()) };

        // // Disconnect from the gateway.
        // await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return { error: error.toString() };
        // process.exit(1);
    }
};



exports.addUser = async function (id) {
    try {
        const wallet = await buildWallet(Wallets, walletPath);
        const userExists = await wallet.get(org1UserId);
        if (!userExists) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);


        // // Submit the specified transaction.
        const result = await contract.submitTransaction('CreateAsset', id, '','', Date.now());
        console.log('Transaction has been submitted');
        return { response: JSON.parse(result.toString()) };

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return { error: error.toString() };
        // process.exit(1);
    }
};
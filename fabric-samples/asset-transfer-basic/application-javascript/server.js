'use strict';

const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
app.use(bodyParser.json());
// app.use(cors());

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

app.get('/api/users', async function (req, res) {
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
        res.status(200).json({ response: JSON.parse(result.toString()) });

        // // Disconnect from the gateway.
        // await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

app.get('/api/user/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            throw Error("user id not defined");
        }
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
        res.status(200).json({ response: JSON.parse(result.toString()) });

        // // Disconnect from the gateway.
        // await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

app.get('/api/userhistory/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            throw Error("user id not defined");
        }
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
        const result = await contract.evaluateTransaction('GetAssetHistory', id);
        console.log(`Transaction has been evaluated, result is: ${prettyJSONString(result.toString())}`);
        res.status(200).json({ response: JSON.parse(result.toString()) });

        // // Disconnect from the gateway.
        // await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

app.post('/api/user', async function (req, res) {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const address = req.body.address;
        if (id == undefined) {
            throw Error("user id not defined");
        }
        if (name == undefined) {
            throw Error("name id not defined");
        }
        if (address == undefined) {
            throw Error("address id not defined");
        }
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
        const result = await contract.submitTransaction('CreateAsset', id, name, address, Date.now());
        console.log('Transaction has been submitted');
        res.status(200).send({ response: JSON.parse(result.toString()) });

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(400).send({ error: error.toString() })
        // process.exit(1);
    }
});

app.put('/api/user/:id', async function (req, res) {
    try {
        const id = req.params.id;
        let name = req.body.name;
        let address = req.body.address;
        if (id == undefined) {
            throw Error("user id not defined");
        }
        if (name == null || name == undefined) {
            name = '';
        }
        if (address == null || address == undefined) {
            address = ''
        }

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


        // Submit the specified transaction.
        const result = await contract.submitTransaction('UpdateAsset', id, name, address);

        // res.send('Transaction has been submitted');
        res.status(200).send({ response: JSON.parse(result.toString()) });

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(400).send({ error: error.toString() });
        // process.exit(1);
    }
})

app.put('/api/addbalance/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const balance = req.body.balance;
        const comment = req.body.comment;
        if (id == undefined) {
            throw Error("user id not defined");
        }
        if (balance == undefined) {
            throw Error("balance not defined");
        }
        if (comment == undefined) {
            throw Error("comment not defined");
        }

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

        // Submit the specified transaction.
        const result = await contract.submitTransaction('AddBalance', id, balance, comment, Date.now());

        console.log('Transaction has been submitted');
        res.status(200).json({ response: JSON.parse(result.toString()) });

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(400).send({ error: error.toString() });
        // process.exit(1);
    }
})

app.put('/api/subbalance/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const balance = req.body.balance;
        const comment = req.body.comment;
        if (id == undefined) {
            throw Error("user id not defined");
        }
        if (balance == undefined) {
            throw Error("balance not defined");
        }
        if (comment == undefined) {
            throw Error("comment not defined");
        }

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


        // Submit the specified transaction.
        const result = await contract.submitTransaction('SubBalance', id, balance, comment, Date.now());

        console.log('Transaction has been submitted');

        res.status(200).json({ response: JSON.parse(result.toString()) });


        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(400).send({ error: error.toString() });
        // process.exit(1);
    }
})

app.delete('/api/user/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            throw Error("user id not defined");
        }
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


        // Submit the specified transaction.
        const result = await contract.submitTransaction('DeleteAsset', id);

        console.log('Transaction has been submitted');
        // res.send('Transaction has been submitted');

        res.status(200).json({ response: JSON.parse(result.toString()) });


        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(400).send({ error: error.toString() });
        // process.exit(1);
    }
})


app.listen(8080, 'localhost');
console.log('Running on http://localhost:8080');

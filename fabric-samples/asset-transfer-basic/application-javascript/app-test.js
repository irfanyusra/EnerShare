/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function main() {
	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);


		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

		try {
			// setup the gateway instance
			// The user will now be able to create connections to the fabric network and be able to
			// submit transactions and query. All transactions submitted by this gateway will be
			// signed by this user using the credentials stored in the wallet.
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			const contract = network.getContract(chaincodeName);
			let result;


			console.log('\n--> Submit Transaction: CreateAsset, creates new asset');
			result = await contract.submitTransaction('CreateAsset', 'user2', Date.now());
			console.log('*** Result: committed');
			if (`${result}` !== '') {
				console.log(`*** Result: ${prettyJSONString(result.toString())}`);
			}

			// Let's try a query type operation (function).
			// This will be sent to just one peer and the results will be shown.
			console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
			result = await contract.evaluateTransaction('GetAllAssets');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			console.log('\n--> Evaluate Transaction: DeleteAsset, delete user2');
			result = await contract.evaluateTransaction('DeleteAsset', 'user2');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// Let's try a query type operation (function).
			// This will be sent to just one peer and the results will be shown.
			console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
			result = await contract.evaluateTransaction('GetAllAssets');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);


			console.log('\n--> Evaluate Transaction: GetAssetHistory user2 (deleted one), function returns an asset with a given assetID');
			result = await contract.evaluateTransaction('GetAssetHistory', 'user2');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);


			// console.log('\n--> Submit Transaction: UpdateAsset user1, change address and name');
			// result = await contract.submitTransaction('UpdateAsset', 'user1','newname', 'newaddress');
			// console.log('*** Result: committed', result.toString());

			console.log('\n--> Submit Transaction: AddBalance user1, add 30');
			result = await contract.submitTransaction('AddBalance', 'user1', 30, '100kWh to user2', Date.now());
			console.log('*** Result: committed', result.toString());

			console.log('\n--> Evaluate Transaction: ReadAsset, read asset user1');
			result = await contract.evaluateTransaction('ReadAsset', 'user1');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);


			console.log('\n--> Submit Transaction: SubBalance user1, sub 10');
			result = await contract.submitTransaction('SubBalance', 'user1', 10, '50kWh from user2', Date.now());
			console.log('*** Result: committed', result.toString());


			console.log('\n--> Evaluate Transaction: GetAssetHistory, history user1');
			result = await contract.evaluateTransaction('GetAssetHistory', 'user1');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			console.log('\n--> Submit Transaction: CreateAsset, creates new asset');
			result = await contract.submitTransaction('CreateAsset', '61d1d898c31245d93a6aaadd', Date.now());
			console.log('*** Result: committed');

			console.log('\n--> Submit Transaction: CreateAsset, creates new asset');
			result = await contract.submitTransaction('CreateAsset', '61d0cfc8a08cc23b2046bc06', Date.now());
			console.log('*** Result: committed');

			// console.log('\n--> Submit Transaction: Transfer from buyer: user3 to seller: user1, 10');
			// result = await contract.submitTransaction('TransferBalance', 'user1', 'user3', 10, 'Energy 50kWh', Date.now());
			// console.log('*** Result: committed', result.toString());


			// console.log('\n--> Evaluate Transaction: GetAssetHistory, history user1');
			// result = await contract.evaluateTransaction('GetAssetHistory', 'user1');
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);




			// console.log('\n--> Evaluate Transaction: DeleteAllAssets');
			// result = await contract.evaluateTransaction('DeleteAllAssets');
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
			// result = await contract.evaluateTransaction('GetAllAssets');
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);




		} finally {
			// Disconnect from the gateway when the application is closing
			// This will close all connections to the network
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}

main();

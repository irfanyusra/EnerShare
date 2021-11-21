/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify = require('json-stringify-deterministic');
const sortKeysRecursive = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                ID: 'user1',
                Name: 'yusra',
                Address: 'address1',
                Owner: 'irfanyusra',
                Credits: { balance: 0, history: [{ date: 'dadsxa', comment: 'init balance 0' }] },
            }
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, id, name, address, owner) {
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The asset ${id} already exists`);
        }

        const asset = {
            ID: id,
            Name: name,
            Address: address,
            Owner: owner,
            Credits: { balance: 0, history: [{ date: 'dadsxa', comment: 'init balance 0' }] },
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }

    async GetAssetHistory(ctx, assetName) {

        let resultsIterator = await ctx.stub.getHistoryForKey(assetName);
        let results = await this._GetAllResults(resultsIterator, true);

        return JSON.stringify(results);
    }

    async _GetAllResults(iterator, isHistory) {
        let allResults = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString('utf8'));
                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.txId;
                    jsonRes.Timestamp = res.value.timestamp;
                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Value = res.value.value.toString('utf8');
                    }
                } else {
                    jsonRes.Key = res.value.key;
                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Record = res.value.value.toString('utf8');
                    }
                }
                allResults.push(jsonRes);
            }
            res = await iterator.next();
        }
        iterator.close();
        return allResults;
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }

        let res = await this.GetAssetHistory(ctx, id)
        return res.toString();
        // return assetJSON.toString();
    }

    async ReadAsset2(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, id, addBalance, reason) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        const asset = JSON.parse(await this.ReadAsset2(ctx, id)); // get the asset from chaincode state
        console.log(asset)
        // overwriting original asset with new asset

        asset.Credits.balance = parseInt(asset.Credits.balance) + parseInt(addBalance);
        asset.Credits.history.unshift({ date: 'Date.now()', comment: reason + '\n Added Balance of ' + addBalance });


        // overwriting original asset with new asset
        const updatedAsset = asset;
        // const updatedAsset = {
        //     ID: id,
        //     Name: name,
        //     Address: address,
        //     Owner: owner,
        //     Credits: asset.Credits,
        // };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }


    // DeleteAsset deletes an given asset from the world state.
    async DeleteAllAsset(ctx, id) {
        const assets = JSON.parse(await this.GetAllAssets(ctx));
        for (var i = 0; i < assets.length; i++) {
            ctx.stub.deleteState(id);
        }
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async AddBalance(ctx, id, addBalance, reason) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        const asset = await ctx.stub.getState(id); // get the asset from chaincode state
        console.log(asset)
        // overwriting original asset with new asset
        asset.Credits.balance += addBalance;
        asset.Credits.history.unshift({ date: ' Date.now()', comment: reason + '\n Added Balance of ' + addBalance });

        // const updatedAsset = {
        //     ID: id,
        //     Name: asset.name,
        //     Address: asset.address,
        //     Owner: asset.owner,
        //     Credits: { balance: 0, history: [{ date: Date.now(), comment: reason + '\n Added Balance of ' + addBalance }] },
        // };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    async TransferAsset(ctx, id, newOwner) {
        const assetString = await this.ReadAsset(ctx, id);
        const asset = JSON.parse(assetString);
        asset.Owner = newOwner;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = AssetTransfer;

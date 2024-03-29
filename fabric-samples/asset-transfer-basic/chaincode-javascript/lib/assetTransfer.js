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

    async InitLedger(ctx, date) {
        const assets = [
            {
                id: 'user1',
                credits: { balance: 0, change: 0, date: date, reason: 'Initial balance' }
            }
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.id, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, id, date) {
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The asset ${id} already exists`);
        }
        const asset = {
            id: id,
            credits: { balance: 0.0, change: 0.0, date: date, reason: 'Initial balance' }
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return asset;
    }

    async GetAssetHistory(ctx, id) {
        let resultsIterator = await ctx.stub.getHistoryForKey(id);
        let results = await this._GetAllResults(resultsIterator, true);

        return results;
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
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        const asset = JSON.parse(await this.ReadAsset(ctx, id)); // get the asset from chaincode state

        const updatedAsset = asset;

        // overwriting original asset with new asset
        // const updatedAsset = {
        //     id: id,
        //     name: name,
        //     address: address,
        //     credits: asset.credits,
        // };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
        return updatedAsset;
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    async TransferBalance(ctx, sell_id, buy_id, change, reason, date) {
        
        const buy_exists = await this.AssetExists(ctx, buy_id);
        if (!buy_exists) {
            throw new Error(`The asset ${buy_id} does not exist`);
        }
        const sell_exists = await this.AssetExists(ctx, sell_id);
        if (!sell_exists) {
            throw new Error(`The asset ${sell_id} does not exist`);
        }

        const buy_asset = JSON.parse(await this.ReadAsset(ctx, buy_id)); // get the asset from chaincode state
        const sell_asset = JSON.parse(await this.ReadAsset(ctx, sell_id)); // get the asset from chaincode state

        // overwriting original asset with new asset

        sell_asset.credits.balance = parseFloat(sell_asset.credits.balance) + parseFloat(change);
        sell_asset.credits.change = parseFloat(change);
        sell_asset.credits.reason = "Sold: "+reason;
        sell_asset.credits.date = date;

        // overwriting original asset with new asset
        buy_asset.credits.balance = parseFloat(buy_asset.credits.balance) - parseFloat(change);
        buy_asset.credits.change = -parseFloat(change);
        buy_asset.credits.reason = "Bought: "+reason;
        buy_asset.credits.date = date;

        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(sell_id, Buffer.from(stringify(sortKeysRecursive(sell_asset))));
        await ctx.stub.putState(buy_id, Buffer.from(stringify(sortKeysRecursive(buy_asset))));
        
        var res = ctx.stub.getTxID();
        return {TxID: res};
    }
    
    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async AddBalance(ctx, id, change, reason, date) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        const asset = JSON.parse(await this.ReadAsset(ctx, id)); // get the asset from chaincode state
        // overwriting original asset with new asset

        asset.credits.balance = parseFloat(asset.credits.balance) + parseFloat(change);
        asset.credits.change = parseFloat(change);
        asset.credits.reason = "Sold " + reason;
        asset.credits.date = date;

        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        var res = ctx.stub.getTxID(); 
        return { asset, res };
    }


    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async SubBalance(ctx, id, change, reason, date) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        const asset = JSON.parse(await this.ReadAsset(ctx, id)); // get the asset from chaincode state
        // overwriting original asset with new asset

        asset.credits.balance = parseFloat(asset.credits.balance) - parseFloat(change);
        asset.credits.change = -parseFloat(change);
        asset.credits.reason = "Bought" + reason;
        asset.credits.date = date;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        var res = ctx.stub.getTxID(); 
        return {asset, res};
    }


    // AssetExists returns true when asset with given id exists in world state.
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
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
        return allResults;
    }


    // // DeleteAsset deletes an given asset from the world state.
    // async DeleteAllAssets(ctx) {
    //     const assets = JSON.parse(await this.GetAllAssets(ctx));
    //     for (var i = 0; i < assets.length; i++) {
    //         ctx.stub.deleteState(assets[i].id);
    //     }
    // }

    // TransferAsset updates the owner field of asset with given id in the world state.
    // async TransferAsset(ctx, id, newOwner) {
    //     const assetString = await this.ReadAsset(ctx, id);
    //     const asset = JSON.parse(assetString);
    //     asset.name = newOwner;
    //     // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    //     return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
    // }

}

module.exports = AssetTransfer;

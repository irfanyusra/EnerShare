exports.test = function () {
    return 'hey mock! ';
};
exports.getUsers = async function () {
    var result = {
        "users": [
            {
                "credits": {
                    "balance": 20,
                    "comment": "Subtracted Balance of  10 \n Reason: Bought 50kWh from user2",
                    "date": "1640817846957"
                },
                "docType": "asset",
                "id": "user1"
            },
            {
                "credits": {
                    "balance": 0,
                    "comment": "Initial balance",
                    "date": "1640817842402"
                },
                "id": "user2"
            }
        ]
    };
    return result;
};


exports.getUserId = async function (id) {
    var result = {
        "credits": {
            "balance": 20,
            "comment": "Subtracted Balance of  10 \n Reason: Bought 50kWh from user2",
            "date": "1640817846957"
        },
        "docType": "asset",
        "id": "user1"
    }
    return result;
};


exports.addUser = async function (id) {
    var result = {
        "id": "user3",
        "credits": {
            "balance": 0,
            "date": "1640823993272",
            "comment": "Initial balance"
        }
    }
    return result;
};



exports.getUserHistory = async function (id) {
    var result = [
        {
            "TxId": "a16b8d5dd96e01ed6c6a695780052f7b3e40aca5229866110c89fe46ec4bcb92",
            "Timestamp": {
                "seconds": {
                    "low": 1640817846,
                    "high": 0,
                    "unsigned": false
                },
                "nanos": 958000000
            },
            "Value": {
                "credits": {
                    "balance": 20,
                    "comment": "Subtracted Balance of  10 \n Reason: Bought 50kWh from user2",
                    "date": "1640817846957"
                },
                "docType": "asset",
                "id": "user1"
            }
        },
        {
            "TxId": "1894cf42cb3df8142e40d6c2b34d15f9242787b41f88fce3eecd0ddb155b4d54",
            "Timestamp": {
                "seconds": {
                    "low": 1640817844,
                    "high": 0,
                    "unsigned": false
                },
                "nanos": 783000000
            },
            "Value": {
                "credits": {
                    "balance": 30,
                    "comment": "Added Balance of  30 \n Reason: Sold 100kWh to user2",
                    "date": "1640817844783"
                },
                "docType": "asset",
                "id": "user1"
            }
        },
        {
            "TxId": "b769b1c02727288ce6f6770a3c194f9e09e7b392c8e76716c3ba12dea7126402",
            "Timestamp": {
                "seconds": {
                    "low": 1640817834,
                    "high": 0,
                    "unsigned": false
                },
                "nanos": 577000000
            },
            "Value": {
                "credits": {
                    "balance": 0,
                    "comment": "Initial balance",
                    "date": "1640817834573"
                },
                "docType": "asset",
                "id": "user1"
            }
        }
    ]
    return result;
};


exports.getUserCreditHistory = async function (id) {
    var result = [
        {
            "balance": 20,
            "comment": "Subtracted Balance of  10 \n Reason: Bought 50kWh from user2",
            "date": "1640817846957"
        },
        {
            "balance": 30,
            "comment": "Added Balance of  30 \n Reason: Sold 100kWh to user2",
            "date": "1640817844783"
        },
        {
            "balance": 0,
            "comment": "Initial balance",
            "date": "1640817834573"
        }
    ];
    return result;
};


exports.addUserBalance = async function (id, balance, comment) {
    var result = {
        "response": {
            "credits": {
                "balance": 40,
                "comment": "Added Balance of  20 \n Reason: Added Balance of 20 \n Reason: Sold 200kWh to 'user2'",
                "date": "1640824345629"
            },
            "docType": "asset",
            "id": "user1"
        }
    }
    return result;
}

exports.subtractUserBalance = async function (id, balance, comment) {
    var result = {
        "response": {
            "credits": {
                "balance": -20,
                "comment": "Subtracted Balance of  20 \n Reason: Subtracted Balance of 20 \n Reason: Bought 200kWh from 'user1'",
                "date": "1640824379353"
            },
            "id": "user2"
        }
    }
    return result;
}

exports.removeUser = async function (id) {
    var result = {
        "type": "Buffer",
        "data": []
    }
    return result;

}
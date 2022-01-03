exports.test = function () {
    return 'hey mock! ';
};
exports.getUsers = async function () {
    var result = [
        {
            "credits": {
                "balance": 60,
                "change": 10,
                "date": "1641144147149",
                "reason": "15kWh \n testing it out"
            },
            "id": "61d1d898c31245d93a6aaadd"
        },
        {
            "credits": {
                "balance": -30,
                "change": -10,
                "date": "1641143716158",
                "reason": "15kWh \n testing it out"
            },
            "id": "61d1d8b9c31245d93a6aaae0"
        },
        {
            "credits": {
                "balance": 20,
                "change": -10,
                "date": "1641141472660",
                "reason": "Bought 50kWh from user2"
            },
            "docType": "asset",
            "id": "user1"
        },
        {
            "credits": {
                "balance": 0,
                "change": 0,
                "date": "1641141468137",
                "reason": "Initial balance"
            },
            "id": "user2"
        },
        {
            "credits": {
                "balance": 0,
                "change": 0,
                "date": "1641141474857",
                "reason": "Initial balance"
            },
            "id": "user3"
        }
    ]

    return result;
};


exports.getUserId = async function (id) {
    var result = {
        "credits": {
            "balance": -30,
            "change": -10,
            "date": "1641143716158",
            "reason": "15kWh \n testing it out"
        },
        "id": "61d1d8b9c31245d93a6aaae0"
    }
    return result;
};


exports.addUser = async function (id) {
    var result = {
        "id": "user3",
        "credits": {
            "balance": 0,
            "change": 0,
            "date": "1640823993272",
            "reason": "Initial balance"
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
            "balance": -30,
            "change": -10,
            "date": "1641143716158",
            "reason": "Bought 15kWh \n testing it out"
        },
        {
            "balance": -20,
            "change": -10,
            "date": "1641143665382",
            "reason": "Bought 15kWh \n testing it out"
        },
        {
            "balance": -10,
            "change": -10,
            "date": "1641142735189",
            "reason": "Bought 15kWh \n testing it out"
        },
        {
            "balance": 0,
            "change": 0,
            "date": "1641142458237",
            "reason": "Initial balance"
        }
    ];

    return result;
};


exports.addUserBalance = async function (id, balance, comment) {
    var result = {
        "credits": {
            "balance": 50,
            "change": 10,
            "date": "1641144069327",
            "reason": "Sold 15kWh \n testing it out"
        },
        "id": "61d1d898c31245d93a6aaadd"
    }
    return result;
}

exports.subtractUserBalance = async function (id, balance, comment) {
    var result = {
        "credits": {
            "balance": 50,
            "change": -10,
            "date": "1641144069327",
            "reason": "Bought 15kWh \n testing it out"
        },
        "id": "61d1d898c31245d93a6aaadd"
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

exports.addUserBalance = async function (id, price, reason) {
    var result =
    {
        "asset": {
            "credits": {
                "balance": 30,
                "change": 10,
                "date": "1641164761182",
                "reason": "Sold 15kWh \n testing it out"
            },
            "id": "61d21292eeb931001a2c34af"
        },
        "res": "085bd7cd2d9c30c558ab30656331a75486f5715a75f89987005bd3e866818b96"
    }
    return result;
}

exports.subtractUserBalance = async function (id, price, reason) {
    var result = {
        "asset": {
            "credits": {
                "balance": -30,
                "change": -10,
                "date": "1641164763643",
                "reason": "Bought15kWh \n testing it out"
            },
            "id": "61d210748ad38412d974fd71"
        },
        "res": "13f155c61b75d1812e9db60f217ebf3d4f92eeff67e50505805af953a2618ef0"
    }
    return result;
}



exports.transferUserBalance = async function (id, id2, price, reason) {
    var result = { "TxID": "085bd7cd2d9c30c558ab30656331a75486f5715a75f89987005bd3e866818b96" }
    return result;
}

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var router = express.Router()
//all routes prefixed with /api
app.use('/api', router)


// dotenv
require("dotenv").config();


// Blockchain 
const blockchainfunctions = require('./functionsblockchain.js');



//mongodb instance line below
//const uri = "mongodb+srv://cdevito2:se3316@cluster0-88rcf.mongodb.net/test?retryWrites=true&w=majority"
const uri = "mongodb+srv://capstone:enershare@cluster0.m1bcf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mongoose = require('mongoose') //used to connect to mongodb instance
//SCHEMA FOR DB
var UserAccount = require("./models/userAccount");
//connect to the mongodb
mongoose.connect(uri, { useNewUrlParser: true, })



// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


// jwt
const jwt = require('jsonwebtoken')



function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
}

router.get('/', function (req, res) { //base api call
    console.log('hi')
    var s = blockchainfunctions.test();
    /* - THIS WAS A TEST TO SEE IF WE CAN WRITE TO OUR DB- IT WORKS
    var userAcc = new UserAccount({
        email:"christest@123.ca",
        
    });
    userAcc.save(function (err) {
        if (err) {
            res.send("error: "+err);
        }
    })*/
    const result = 'hooray! welcome to our api!' + s.toString();
    res.status(200).json({ response: result });

});

router.get('/users', async function (req, res) {
    const users = await blockchainfunctions.getUsers()
    if (users.response) {
        res.status(200).json(users);
    }
    else {
        res.status(500).json(users);
    }
});

router.get('/user/:id', async function (req, res) {
    const id = req.params.id;
    if (id == undefined) {
        res.status(400).json({ error: "User not defined" });
    }

    const user = await blockchainfunctions.getUserId(id)
    if (user.response) {
        res.status(200).json(user);
    }
    else {
        res.status(500).json(user);
    }
});


//USER SIGNUP
router.post('/signup', async function (req, res) {

    console.log("USER IS ATTEMPTING TO SIGN UP ")

    // console.log("email : "+req.body.email);
    // console.log("password : "+req.body.password);

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
            res.send("error:", err)
        }
        // return hash
        var newUser = new UserAccount({
            email: req.body.email,
            password: hash,
            address: req.body.address
        });

        newUser.save(async function (err, resUser) {
            if (err) {
                console.log(err)
                res.status(400).json({ error: err });
            }
            else {
                const token = jwt.sign(
                    { email: req.body.email },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRY_TIME }
                );
                const user = await blockchainfunctions.addUser(resUser.id)
                if (user.response) {
                    res.send({ token: token });
                }
                else {
                    res.status(400).json(user);
                }
            }
        })

    })
})



//USER LOGIN 
router.post('/login', async function (req, res) {
    //TODO - can use passport JS for authentication

    console.log("USER IS ATTEMPTING TO LOGIN");
    // console.log("email : "+req.body.email);
    // console.log("password : "+req.body.password);
    UserAccount.findOne({ email: req.body.email }, async function (err, user) {
        if (err) {
            console.log("cant find user")
            return done(null, false)
        }
        else {
            if (!user) {
                return done(null, false, { message: 'That email is not registered' })
            }
            else {
                console.log("FOUND USER WITH THAT EMAIL");
                //find in blockchain 
                var userRes = await blockchainfunctions.getUserId(user.id)
                console.log(userRes)
                if (userRes.error) {
                    res.status(400).json(userRes);

                }

                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        res.status(400).json({error: err});
                    }
                    else {
                        const token = jwt.sign(
                            { email: user.email },
                            process.env.JWT_SECRET,
                            { expiresIn: process.env.JWT_EXPIRY_TIME }
                        );
                        res.send({ token: token });
                    }

                });
            }
        }
    })
});





















// router.get('/userhistory/:id', async function (req, res) {
//     try {
//         const id = req.params.id;
//         if (id == undefined) {
//             throw Error("user id not defined");
//         }
//         const wallet = await buildWallet(Wallets, walletPath);
//         const userExists = await wallet.get(org1UserId);
//         if (!userExists) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });
//         const network = await gateway.getNetwork(channelName);
//         const contract = network.getContract(chaincodeName);

//         // Evaluate the specified transaction.
//         const result = await contract.evaluateTransaction('GetAssetHistory', id);
//         console.log(`Transaction has been evaluated, result is: ${prettyJSONString(result.toString())}`);
//         res.status(200).json({ response: JSON.parse(result.toString()) });

//         // // Disconnect from the gateway.
//         // await gateway.disconnect();

//     } catch (error) {
//         console.error(`Failed to evaluate transaction: ${error}`);
//         res.status(500).json({ error: error.toString() });
//         // process.exit(1);
//     }
// })
//     ;
// router.get('/usercredithistory/:id', async function (req, res) {
//     try {
//         const id = req.params.id;
//         if (id == undefined) {
//             throw Error("user id not defined");
//         }
//         const wallet = await buildWallet(Wallets, walletPath);
//         const userExists = await wallet.get(org1UserId);
//         if (!userExists) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });
//         const network = await gateway.getNetwork(channelName);
//         const contract = network.getContract(chaincodeName);

//         // Evaluate the specified transaction.
//         const result = await contract.evaluateTransaction('GetAssetHistory', id);
//         var values = JSON.parse(result.toString());
//         let creditHistory = []
//         for (var i = 0; i < values.length; i++) {
//             creditHistory.push(values[i].Value.credits)
//         }


//         console.log(`Transaction has been evaluated, result is: ${values.toString()}`);
//         console.log(`Transaction has been evaluated, result is: ${prettyJSONString(result.toString())}`);
//         res.status(200).json({ response: creditHistory });

//         // // Disconnect from the gateway.
//         // await gateway.disconnect();

//     } catch (error) {
//         console.error(`Failed to evaluate transaction: ${error}`);
//         res.status(500).json({ error: error.toString() });
//         // process.exit(1);
//     }
// });

// router.post('/user', async function (req, res) {
//     try {
//         const id = req.body.id;
//         const name = req.body.name;
//         const address = req.body.address;
//         if (id == undefined) {
//             throw Error("user id not defined");
//         }
//         if (name == undefined) {
//             throw Error("name id not defined");
//         }
//         if (address == undefined) {
//             throw Error("address id not defined");
//         }
//         const wallet = await buildWallet(Wallets, walletPath);
//         const userExists = await wallet.get(org1UserId);
//         if (!userExists) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });
//         const network = await gateway.getNetwork(channelName);
//         const contract = network.getContract(chaincodeName);


//         // // Submit the specified transaction.
//         const result = await contract.submitTransaction('CreateAsset', id, name, address, Date.now());
//         console.log('Transaction has been submitted');
//         res.status(200).send({ response: JSON.parse(result.toString()) });

//         // Disconnect from the gateway.
//         await gateway.disconnect();

//     } catch (error) {
//         console.error(`Failed to submit transaction: ${error}`);
//         res.status(400).send({ error: error.toString() })
//         // process.exit(1);
//     }
// });

// router.put('/user/:id', async function (req, res) {
//     try {
//         const id = req.params.id;
//         let name = req.body.name;
//         let address = req.body.address;
//         if (id == undefined) {
//             throw Error("user id not defined");
//         }
//         if (name == null || name == undefined) {
//             name = '';
//         }
//         if (address == null || address == undefined) {
//             address = ''
//         }

//         const wallet = await buildWallet(Wallets, walletPath);
//         const userExists = await wallet.get(org1UserId);
//         if (!userExists) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });
//         const network = await gateway.getNetwork(channelName);
//         const contract = network.getContract(chaincodeName);


//         // Submit the specified transaction.
//         const result = await contract.submitTransaction('UpdateAsset', id, name, address);

//         // res.send('Transaction has been submitted');
//         res.status(200).send({ response: JSON.parse(result.toString()) });

//         // Disconnect from the gateway.
//         await gateway.disconnect();

//     } catch (error) {
//         console.error(`Failed to submit transaction: ${error}`);
//         res.status(400).send({ error: error.toString() });
//         // process.exit(1);
//     }
// })

// router.put('/addbalance/:id', async function (req, res) {
//     try {
//         const id = req.params.id;
//         const balance = req.body.balance;
//         const comment = req.body.comment;
//         if (id == undefined) {
//             throw Error("user id not defined");
//         }
//         if (balance == undefined) {
//             throw Error("balance not defined");
//         }
//         if (comment == undefined) {
//             throw Error("comment not defined");
//         }

//         const wallet = await buildWallet(Wallets, walletPath);
//         const userExists = await wallet.get(org1UserId);
//         if (!userExists) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });
//         const network = await gateway.getNetwork(channelName);
//         const contract = network.getContract(chaincodeName);

//         // Submit the specified transaction.
//         const result = await contract.submitTransaction('AddBalance', id, balance, comment, Date.now());

//         console.log('Transaction has been submitted');
//         res.status(200).json({ response: JSON.parse(result.toString()) });

//         // Disconnect from the gateway.
//         await gateway.disconnect();

//     } catch (error) {
//         console.error(`Failed to submit transaction: ${error}`);
//         res.status(400).send({ error: error.toString() });
//         // process.exit(1);
//     }
// })

// router.put('/subbalance/:id', async function (req, res) {
//     try {
//         const id = req.params.id;
//         const balance = req.body.balance;
//         const comment = req.body.comment;
//         if (id == undefined) {
//             throw Error("user id not defined");
//         }
//         if (balance == undefined) {
//             throw Error("balance not defined");
//         }
//         if (comment == undefined) {
//             throw Error("comment not defined");
//         }

//         const wallet = await buildWallet(Wallets, walletPath);
//         const userExists = await wallet.get(org1UserId);
//         if (!userExists) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });
//         const network = await gateway.getNetwork(channelName);
//         const contract = network.getContract(chaincodeName);


//         // Submit the specified transaction.
//         const result = await contract.submitTransaction('SubBalance', id, balance, comment, Date.now());

//         console.log('Transaction has been submitted');

//         res.status(200).json({ response: JSON.parse(result.toString()) });


//         // Disconnect from the gateway.
//         await gateway.disconnect();

//     } catch (error) {
//         console.error(`Failed to submit transaction: ${error}`);
//         res.status(400).send({ error: error.toString() });
//         // process.exit(1);
//     }
// })

// router.delete('/user/:id', async function (req, res) {
//     try {
//         const id = req.params.id;
//         if (id == undefined) {
//             throw Error("user id not defined");
//         }
//         const wallet = await buildWallet(Wallets, walletPath);
//         const userExists = await wallet.get(org1UserId);
//         if (!userExists) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });
//         const network = await gateway.getNetwork(channelName);
//         const contract = network.getContract(chaincodeName);


//         // Submit the specified transaction.
//         const result = await contract.submitTransaction('DeleteAsset', id);

//         console.log('Transaction has been submitted');
//         // res.send('Transaction has been submitted');

//         res.status(200).json({ response: JSON.parse(result.toString()) });


//         // Disconnect from the gateway.
//         await gateway.disconnect();

//     } catch (error) {
//         console.error(`Failed to submit transaction: ${error}`);
//         res.status(400).send({ error: error.toString() });
//         // process.exit(1);
//     }
// })


app.listen(8080, 'localhost');
console.log('Running on http://localhost:8080');

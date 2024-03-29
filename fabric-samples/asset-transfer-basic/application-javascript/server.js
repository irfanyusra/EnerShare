//move the file to a convenient location 

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
const blockchain_functions = require('./functionsblockchain.js');
// const blockchain_functions = require('./functionsblockchain-mock.js');

const helper_functions = require('./helper_functions.js');

//mongodb instance line below
//const uri = "mongodb+srv://cdevito2:se3316@cluster0-88rcf.mongodb.net/test?retryWrites=true&w=majority"
const uri = "mongodb+srv://capstone:enershare@cluster0.m1bcf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mongoose = require('mongoose') //used to connect to mongodb instance
//SCHEMA FOR DB
var UserAccount = require("./models/user_account_model");
var Transaction = require("./models/transaction_model");
var Posting = require("./models/posting_model");
var EnergyData = require("./models/energy_data_model");
//connect to the mongodb
mongoose.connect(uri, { useNewUrlParser: true, })

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// jwt
const jwt = require('jsonwebtoken')


//base test api call
router.get('/', function (req, res) {
    try {

        console.log('hi')
        var s = blockchain_functions.test();
        var h = helper_functions.test();
        const result = 'hooray! welcome to our api! ' + s.toString() + h.toString();
        return res.status(200).json({ response: result });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
});

//get users from the blockchain to test
router.get('/bc/users', async function (req, res) {
    try {
        const users = await blockchain_functions.getUsers();
        return res.status(200).json({ response: users });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

router.post('/bc/users', async function (req, res) {
    try {
        const users = await blockchain_functions.addUser(req.body.id);
        return res.status(200).json({ response: users });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

//get user id from the blockchain to test
router.get('/bc/user/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            throw Error("User not defined");
        }
        const users = await blockchain_functions.getUserId(id);
        return res.status(200).json({ response: users });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

//get all user accounts from mongodb 
router.get('/users', async function (req, res) {
    try {
        var result = await UserAccount.find({});
        return res.status(200).json({ response: result })
    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
});

//delete all user accounts from mongodb 
router.delete('/users', async function (req, res) {
    try {
        var result = await UserAccount.deleteMany();
        return res.status(200).json({ response: result })
    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
});

//Get the user for mongodb and check if user exists in the blockchain   
router.get('/user/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            throw Error("User not defined");
        }
        //get user using id from mongodb 
        var result = await UserAccount.findOne({ _id: id });
        //checking the blockchain
        const user = await blockchain_functions.getUserId(id)
        return res.status(200).json({ response: result });

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

//To edit user account in mongodb - Name, Address, etc - nothing to edit in the blockchain 
router.put('/user/:id', async function (req, res) {
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

        var result = await UserAccount.updateOne({ _id: id }, { name: name, address: address });
        return res.status(200).json({ response: result });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
})

//Marked inactive from the database  
router.delete('/user/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            return res.status(500).json({ error: "user id not defined" });
        }
        var result = await UserAccount.updateOne({ _id: id }, { active: false });
        console.log("User is now in-active");
        // remove user from the blockchain 
        // const user = await blockchain_functions.removeUser(id);
        return res.status(200).json({ response: result });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
})

//user signup - adds an account to mongo and blockchain 
router.post('/signup', async function (req, res) {
    try {
        console.log("USER IS ATTEMPTING TO SIGN UP ")
        console.log("email : " + req.body.email);
        console.log("password : " + req.body.password);

        var user = await UserAccount.findOne({ email: req.body.email });
        if (user && user.active) {
            return res.status(200).json({ response: { message: "email already exists" } });
        }
        else if (user && user.active == false) {
            user = await UserAccount.updateOne({ _id: user._id }, { active: true });
            console.log(user)
            return res.status(200).json({ response: { message: "user is now active" } });
        }
        else {
            const hashed_pass = await bcrypt.hash(req.body.password, saltRounds);
            var new_user = new UserAccount({
                email: req.body.email,
                name: req.body.name,
                password: hashed_pass,
                address: req.body.address,
                utility_account: req.body.utility_account,
                energy_sell_in_order: 0,
                active: true,
                admin: false
            });
            console.log('saving new user', new_user)
            var res_user = await new_user.save();

            const token = jwt.sign(
                {
                    userId: new_user._id,
                    email: new_user.email,
                    expiresIn: process.env.JWT_EXPIRY_TIME
                },
                process.env.JWT_SECRET,
            );
            const bc_user = await blockchain_functions.addUser(res_user.id)
            return res.status(200).json({ response: { token: token, user: res_user } });
        }

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
})

//User login - gets the account from mongo and blockchain. compares with bc and the password and returns a token
router.post('/login', async function (req, res) {
    try {
        //TODO - can use passport JS for authentication

        console.log("USER IS ATTEMPTING TO LOGIN");
        // console.log("email : "+req.body.email);
        // console.log("password : "+req.body.password);
        var user = await UserAccount.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ response: { message: 'That email is not registered' } });
        }
        else {
            if (user.active == false) {
                return res.status(200).json({ response: { message: "User is currently not active" } });
            }
            console.log("FOUND USER WITH THAT EMAIL");
            //find in blockchain 
            var userRes = await blockchain_functions.getUserId(user.id); //would throw an error if the user doesn't exist in the blockchain 
            console.log(userRes)

            var result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                const token = jwt.sign(
                    {
                        userId: user._id,
                        email: user.email,
                        expiresIn: process.env.JWT_EXPIRY_TIME
                    },
                    process.env.JWT_SECRET,
                );
                return res.status(200).json({ response: { token: token, user: user } });
            }
            else {
                return res.status(403).json({ response: { message: 'Invalid email/password' } });
            }
        }

    } catch (error) {
        console.error(`Failed to login: ${error}`);
        return res.status(400).json({ error: error.toString() });
        // process.exit(1);
    }
});

//gets all user history, any changes made to the account in the blockchain 
router.get('/userHistory/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            throw Error("user id not defined");
        }
        const userHistory = await blockchain_functions.getUserHistory(id);
        return res.status(200).json({ response: userHistory });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

//gets the credit history of the user; returns only the transactions committed
router.get('/userCreditHistory/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            throw Error("user id not defined");
        }
        const userCreditHistory = await blockchain_functions.getUserCreditHistory(id);
        return res.status(200).json({ response: userCreditHistory });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

router.delete('/transactions', async function (req, res) {
    var transactions = await Transaction.deleteMany();
    return res.status(200).json({ response: transactions });
});

router.put('/buyPosting', async function (req, res) {
    try {
        const posting_id = req.body.posting_id;
        const buy_user_id = req.body.user_id;
        const comment = req.body.comment;
        if (posting_id == undefined || buy_user_id == undefined) {
            throw Error("ids are not defined")
        }

        // get info from mongo
        var posting_info = await Posting.findOne({ "_id": posting_id });
        if (!posting_info) {
            throw Error("Posting does not exist")
        }
        if (posting_info.active == false) {
            throw Error("Posting is removed")
        }
        const price = posting_info.price
        const energy = posting_info.amount_energy;

        console.log(buy_user_id)
        var buy_user = await UserAccount.findOne({ _id: buy_user_id, active: true });
        if (!buy_user) {
            throw Error("Buying User does not exist");
        }
        var sell_user = await UserAccount.findOne({ _id: posting_info.user_id, active: true });
        if (!sell_user) {
            throw Error("Selling User does not exist");
        }

        // Get users info from the blockchain to make sure the users exist
        await blockchain_functions.getUserId(buy_user._id);
        await blockchain_functions.getUserId(sell_user._id);

        const reason = `${energy}kWh \n ${!comment ? '' : comment}`
        const date = new Date()

        const transferBalance_id = await blockchain_functions.transferUserBalance(sell_user._id, buy_user._id, price, reason);
        console.log(transferBalance_id.TxID);
        // get the transaction id for buy/sell and add it to mongodb for both users 
        var transaction = new Transaction({
            posting_id: posting_info._id,
            timestamp: date,
            transaction_id_blockchain: transferBalance_id.TxID,
            comment: "",
            selling_user_id: sell_user._id,
            buying_user_id: buy_user._id
        });
        transaction = await transaction.save();

        // subtracting  in_order for the seller 
        sell_user = await UserAccount.updateOne({ _id: sell_user._id }, { energy_sell_in_order: (sell_user.energy_sell_in_order - posting_info.amount_energy) });
        // update the posting 
        posting_info = await Posting.updateOne({ _id: posting_info._id }, { active: false, transaction_id: transaction._id });

        return res.status(200).json({ response: transaction })

    }
    catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json(`Failed: ${error.message}`);
    }
});

//Creates a new posting to sell energy - checks 5 days  
router.post('/createPosting', async function (req, res) {
    try {
        const id = req.body.user_id;
        if (id == undefined) {
            throw Error("User id not defined");
        }
        var user = await UserAccount.findOne({ _id: id, active: true });
        if (!user) {
            throw Error("User does not exist");
        }

        var energy_data = await EnergyData.find({ installation: user.utility_account }).sort({ interval_start: 'desc' }).limit(120);

        var date = new Date();
        date.setDate(date.getDate() - 5);

        var transaction_data = await Transaction.aggregate([
            { $match: { selling_user_id: user._id, timestamp: { $gte: date } } },
            {
                $lookup: {
                    from: "postings",
                    localField: "_id",
                    foreignField: "transaction_id",
                    as: "posting_info",
                },
            },
            {
                $unwind: "$posting_info",
            }
        ])

        var cumulative = helper_functions.getCumulativeRemainingEnergy(energy_data, transaction_data);
        console.log(cumulative);
        var canSell = cumulative - user.energy_sell_in_order;
        if (canSell <= 0) {
            throw Error("Cannot make a posting as there is no excess energy to sell");
        }
        if (canSell > 0 && canSell < req.body.amount_energy) {
            throw Error("Cannot make a posting as there is no excess energy to sell. Can sell: " + (cumulative - user.energy_sell_in_order))
        }

        var newPost = new Posting({
            //id is auto generated later 
            amount_energy: req.body.amount_energy,
            price: req.body.price,
            energy_type: req.body.energy_type,
            timestamp: new Date(),
            user_id: req.body.user_id,
            rate: req.body.rate,
            active: true
        });

        var posting = await newPost.save();
        user = await UserAccount.updateOne({ _id: id }, { energy_sell_in_order: (user.energy_sell_in_order + posting.amount_energy) });

        res.status(200).json({ response: posting });
        // res.status(200).json(transaction_data)

    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json(`Failed: ${error.message}`);
    }
});

router.get('/userCumulativeRemainingEnergy/:id', async function (req, res) {
    const id = req.params.id
    try {
        if (id == undefined) {
            throw Error("User id not defined");
        }
        var user = await UserAccount.findOne({ _id: id, active: true });
        if (!user) {
            throw Error("User does not exist");
        }

        var energy_data = await EnergyData.find({ installation: user.utility_account }).sort({ interval_start: 'desc' }).limit(120);

        var date = new Date();
        date.setDate(date.getDate() - 5);

        var transaction_data = await Transaction.aggregate([
            { $match: { selling_user_id: user._id, timestamp: { $gte: date } } },
            {
                $lookup: {
                    from: "postings",
                    localField: "_id",
                    foreignField: "transaction_id",
                    as: "posting_info",
                },
            },
            {
                $unwind: "$posting_info",
            }
        ])

        var cumulative = helper_functions.getCumulativeRemainingEnergy(energy_data, transaction_data);
        console.log(cumulative);
        res.status(200).json({ response: cumulative });

    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json(`Failed: ${error.message}`);
    }
});

//Gets all active postings for a user
router.get('/userActivePostings/:user_id', async function (req, res) {
    try {
        const id = req.params.user_id;
        if (id == undefined) {
            return res.status(500).json({ error: "user id not defined" });
        }
        var posting = await Posting.find({ active: true, user_id: id });
        return res.status(200).json({ response: posting });
    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
});

//Gets 20 new active postings for now
router.get('/allActivePostings/:id', async function (req, res) {
    try {
        const id = req.params.id;
        var posting = await Posting.find({ active: true, user_id: { $ne: id } }).sort({ date: 'desc' }).limit(20);
        return res.status(200).json({ response: posting });
    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
});

// get current Average rate for energy postings 
router.get('/currentAvgRate', async function (req, res) {
    try {
        // get active postings  
        var postings = await Posting.find({ active: true });

        // avg out the rate 
        var avgRate = 0;
        for (const posts of postings) {
            console.log(posts.rate)
            avgRate += posts.rate ? posts.rate : 0;
        }
        avgRate /= postings.length;

        return res.status(200).json({ response: avgRate })
    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }

});

//Mark a posting as inactive
router.post('/deletePosting/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            return res.status(500).json({ error: "posting id not defined" });
        }

        var posting = await Posting.findOneAndUpdate({ _id: id }, { active: false });
        var user = await UserAccount.findOne({ _id: posting.user_id });
        if (!user) {
            throw Error("User does not exist");
        }
        user = await UserAccount.updateOne({ _id: user._id }, { energy_sell_in_order: (user.energy_sell_in_order - posting.amount_energy) });
        return res.status(200).json({ response: posting })
    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
});


router.delete('/postings', async function (req, res) {
    try {
        var posting = await Posting.deleteMany();
        return res.status(200).json({ response: posting })
    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
});


//get all energy data - this takes a long time to load 
router.get('/energyData', async function (req, res) {
    try {
        var energy_data = await EnergyData.find({});
        return res.status(200).json({ response: energy_data })
    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
});

// Route to find all energy data given a user utility account number
//user utility account number maps to installation number in EnergyData collection
router.get('/energyData/:id', async function (req, res) {
    try {
        //pass user ID in the URL and this will return all of the energy data
        //installation:req.params.id
        var energy_data = await EnergyData.find({ "installation": req.params.id });
        return res.status(200).json({ response: energy_data })

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

router.post('/energyData', async function (req, res) {
    try {
        var energy_data = new EnergyData({
            installation: req.body.installation,
            interval_start: new Date(),
            interval_end: new Date(),
            time_zone: 'EST',
            quantity_delivered: req.body.quantity_delivered,
            quantity_generated: req.body.quantity_generated,
            unit: 'kWh',
        });
        energy_data = await energy_data.save();
        return res.status(200).json({ response: energy_data })

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

//Get the user remaining energy for the graph for 5 days
router.get('/userRemainingEnergy/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            throw Error("User id not defined");
        }
        var user = await UserAccount.findOne({ _id: id, active: true });
        if (!user) {
            throw Error("User does not exist");
        }
        var energy_data = await EnergyData.find({ installation: user.utility_account }).sort({ interval_start: 'desc' }).limit(120);
        var result = helper_functions.getUserRemainingEnergy(energy_data);
        return res.status(200).json({ response: result });

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
});


//TODO: Bill - quantity delivered * rate over a month, subtract income earned
router.get('/bill/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            throw Error("User id not defined");
        }
        var user = await UserAccount.findOne({ _id: id, active: true });
        if (!user) {
            throw Error("User does not exist");
        }


    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
});


router.post('/enrollBlockchainClient', async function (req, res) {
    try {
        const username = req.body.username;
        await blockchain_functions.registerPeerUser(username);
        return res.status(200).json({ response: `Successfully added peer user ${username}` });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

router.delete('/blockchainClient/:username', async function (req, res) {
    try {
        const username = req.params.username;
        await blockchain_functions.removeRegisteredPeerUsers(username);
        return res.status(200).json({ response: `Successfully removed peer user ${username}` });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
        // process.exit(1);
    }
});

router.get('/blockchainClients', async function (req, res) {
    try {
        console.log("Getting clients")
        const result = await blockchain_functions.getRegisteredPeerUsers();
        let returnMap = new Array();
        for (let i = 0; i < result.length; i++) {
            returnMap.push({
                client_name: result[i]
            });
        }
        return res.status(200).json({ response: returnMap });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
});


/* Route to create and enroll new peer*/

router.post('/newPeer', async function (req, res) {
    try {
        let corePeerPort = parseInt(req.body.corePeerPort)
        const result = await blockchain_functions.createNewPeer(req.body.peerName, corePeerPort)
        return res.status(200).json({ response: `${req.body.peerName} added` + result });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: JSON.stringify(error) });
    }
})

/*route to bring up an existing peer*/
router.post('/upPeer', async function (req, res) {
    try {
        console.log("upping peer")
        const result = await blockchain_functions.bringUpPeer(req.body.peerName)
        return res.status(200).json({ response: `${req.body.peerName} is up` });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
})

/*route to bring down an existing peer*/
router.post('/downPeer', async function (req, res) {
    try {
        console.log("downing peer")
        const result = await blockchain_functions.bringDownPeer(req.body.peerName)
        return res.status(200).json({ response: `${req.body.peerName} is down` });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
})

router.get('/peers', async function (req, res) {
    try {
        console.log("Getting peers")
        const result = await blockchain_functions.getAllPeers()
        let returnMap = new Array();
        for (let i = 0; i < result.length; i++) {
            returnMap.push({
                peer_name: result[i].NAMES,
                status: result[i].STATUS,
                created_on: result[i].CREATED,
                port: result[i].PORTS,
                container_id: result[i].CONTAINER_ID
            });
        }

        return res.status(200).json({ response: returnMap });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
})

router.get('/orderers', async function (req, res) {
    try {
        console.log("Getting orderers")
        const result = await blockchain_functions.getAllOrderers()
        let returnMap = new Array();
        for (let i = 0; i < result.length; i++) {
            returnMap.push({
                orderer_name: result[i].NAMES,
                status: result[i].STATUS,
                created_on: result[i].CREATED,
                port: result[i].PORTS,
                container_id: result[i].CONTAINER_ID
            });
        }
        return res.status(200).json({ response: returnMap });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
})


/*route to bring up an existing orderer*/
router.post('/upOrderer', async function (req, res) {
    try {
        const result = await blockchain_functions.bringUpOrderer(req.body.ordererName)
        return res.status(200).json({ response: `${req.body.ordererName} is up` });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
})

/*route to bring down an existing orderer*/
router.post('/downOrderer', async function (req, res) {
    try {
        const result = await blockchain_functions.bringDownOrderer(req.body.ordererName)
        return res.status(200).json({ response: `${req.body.ordererName} is down` });

    } catch (error) {
        console.error(`Failed: ${error}`);
        return res.status(500).json({ error: error.toString() });
    }
})



app.listen(8080, 'localhost');
console.log('Running on http://localhost:8080');

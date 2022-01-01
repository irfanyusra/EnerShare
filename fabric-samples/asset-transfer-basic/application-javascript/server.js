//move the file to a convinient location 

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
// const blockchainfunctions = require('./functionsblockchain.js');
const blockchainfunctions = require('./functionsblockchain-mock.js');


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
        var s = blockchainfunctions.test();
        const result = 'hooray! welcome to our api!' + s.toString();
        res.status(200).json({ response: result });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error });
    }
});

//get users from the blockchain to test
router.get('/bc/users', async function (req, res) {
    try {
        const users = await blockchainfunctions.getUsers();
        res.status(200).json({ response: users });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error });
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
        const users = await blockchainfunctions.getUserId(id);
        res.status(200).json({ response: users });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error });
        // process.exit(1);
    }
});

//get all user accounts from mongodb 
router.get('/users', async function (req, res) {
    try {
        var result = await UserAccount.find({});
        res.status(200).json({ response: result })
    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
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
        var result = await UserAccount.find({ _id: id });
        //checking the blockchain
        const user = await blockchainfunctions.getUserId(id)
        res.status(200).json({ response: result });

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error });
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
        res.status(200).json({ response: result });

    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
    }
})

//Marked inactive from the database  
router.post('/user/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            res.status(500).json({ error: "user id not defined" });
        }
        var result = await UserAccount.updateOne({ _id: id }, { active: false });
        console.log("Successfully unactivated the user");
        // remove user from the blockchain 
        // const user = await blockchainfunctions.removeUser(id);
        res.status(200).json({ response: result });

    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
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
            res.status(200).json({ response: { message: "email already exists" } });
        }
        else if (user && user.active == false) {
            user = await UserAccount.updateOne({ _id: user._id }, { active: true });
            console.log(user)
            res.status(200).json({ response: { message: "user is now active" } });
        }
        else {
            const hashed_pass = await bcrypt.hash(req.body.password, saltRounds);
            var new_user = new UserAccount({
                email: req.body.email,
                name: req.body.name,
                password: hashed_pass,
                address: req.body.address,
                utility_account: req.body.utility_account,
                energy_sell_inorder: 0,
                active: true
            });
            console.log('saving new user', new_user)
            var res_user = await new_user.save()

            const token = jwt.sign(
                { email: req.body.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRY_TIME }
            );
            const bc_user = await blockchainfunctions.addUser(res_user.id)
            res.status(200).json({ response: { token: token, user: res_user } });
        }

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error });
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
            res.status(400).json({ response: { message: 'That email is not registered' } });
        }
        else {
            if (user.active == false) {
                res.status(200).json({ response: { message: "User is currently not active" } });
            }
            console.log("FOUND USER WITH THAT EMAIL");
            //find in blockchain 
            var userRes = await blockchainfunctions.getUserId(user.id); //would throw an error if the user doesnt exist in the blockchain 
            console.log(userRes)

            var result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                const token = jwt.sign(
                    { email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRY_TIME }
                );
                res.status(200).json({ response: { token: token, user: user } });
            }
            else {
                res.status(403).json({ response: { message: 'Invalid email/password' } });
            }
        }

    } catch (error) {
        console.error(`Failed to login: ${error}`);
        res.status(400).json({ error });
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
        const userHistory = await blockchainfunctions.getUserHistory(id);
        res.status(200).json({ response: userHistory });

    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
        // process.exit(1);
    }
});

//gets the credit histroy of the user; returns only the transactions committed
//TODO: Yusra - fix the structure when asset transfer file is fixed  
router.get('/userCreditHistory/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            throw Error("user id not defined");
        }
        const userCreditHistory = await blockchainfunctions.getCreditUserHistory(id);
        res.status(200).json({ response: userCreditHistory });

    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
        // process.exit(1);
    }
});

//TODO: this should technically be an atomic event..
//TODO: Yusra - fix the logic (check balance) and make it nicer 
router.put('/buyPosting/:user_id/:posting_id', async function (req, res) {
    try {

        const posting_id = req.params.posting_id;
        const buy_user_id = req.params.posting_id;
        if (posting_id == undefined || buy_user_id == undefined) {
            res.status(400).json({ error: "ids are not defined" });
        }

        // get information about the posting 
        // i think this will work. havent tested. 
        var posting_info = await Posting.find({ "postingId": posting_id });

        const balance = req.body.balance; //should get from mongo 
        const energy = '100kWh';
        const userBought = '';
        if (balance == undefined) {
            res.status(400).json({ error: "balance not defined" });
        }
        if (comment == undefined) {
            res.status(400).json({ error: "comment not defined" });
        }

        const buyComment = `Added Balance of ${balance} \n Reason: Sold ${energy} to ${userBought}`
        // add balance for the user in the blockchain  
        const addBalance = await blockchainfunctions.addUserBalance(posting_id, balance, buyComment);
        if (addBalance.error) {
            res.status(500).json(addBalance);
            return;
        }

        const sellComment = `Subtract Balance of ${balance} \n Reason: Bought ${energy} to ${userBought}`
        //subtract balance for the other user in the blockchain 
        const subBalance = await blockchainfunctions.subtractUserBalance(posting_id, balance, sellComment);
        if (subBalance.error) {
            res.status(500).json(subBalance);
            return;
        }

        // get the transaction id for buy/sell and add it to mongodb for both users 

        //add the energy data point for both users 
        // return success or failure 
    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
    }
});

//Creates a new posting to sell energy 
//TODO: Yusra - check energy data (how much they have) before creating a posting
router.post('/createPosting', async function (req, res) {
    try {
        var newPost = new Posting({
            //id is auto generated later 
            amount_energy: req.body.amount_energy,
            price: req.body.price,
            energy_type: req.body.energy_type,
            timestamp: new Date(),
            user_id: req.body.user_id,
            active: true
        });

        var posting = await newPost.save();
        res.status(200).json({ response: posting });

    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
        // process.exit(1);
    }
});


//Gets all active postings for a user
router.get('/userActivePostings/:user_id', async function (req, res) {
    try {
        const id = req.params.user_id;
        if (id == undefined) {
            res.status(500).json({ error: "user id not defined" });
        }
        var posting = await Posting.find({ active: true, user_id: id });
        res.status(200).json({ response: posting });
    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
    }
});

//Gets 20 new active postings for now
router.get('/allActivePostings', async function (req, res) {
    try {

        var posting = await Posting.find({ active: true }).sort({ date: 'desc' }).limit(20);
        res.status(200).json({ response: posting });
    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
    }
});

//Mark a posting as inactive
router.post('/deletePosting/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            res.status(500).json({ error: "posting id not defined" });
        }
        var posting = await Posting.updateOne({ _id: id }, { active: false });
        res.status(200).json({ response:posting })
    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
    }
});

//get all energy data - this takes a long time to load 
router.get('/energydata', async function (req, res) {
    try {
        var energydata = await EnergyData.find({});
        res.status(200).json({ response: energydata })
    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
    }
});

// Route to find all energy data given a user utility account number
//user utility account number maps to installation number in energydata collection
router.get('/energydata/:id', async function (req, res) {
    try {
        //pass user ID in the URL and this will return all of the energy data
        //installation:req.params.id
        var energydata = await EnergyData.find({ "installation": req.params.id });
        res.status(200).json({ response: energydata })

    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
        // process.exit(1);
    }
});

//Get the user remaining energy for the graph
//TODO: Yusra - Get the user remaining energy for the graph 
router.get('/userRemainingEnergy/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            throw Error("User not defined");
        }

        res.status(200).json({ response: result });

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error });
    }
});

app.listen(8080, 'localhost');
console.log('Running on http://localhost:8080');

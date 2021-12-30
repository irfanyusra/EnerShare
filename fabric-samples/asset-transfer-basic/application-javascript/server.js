//TODO: move the file to a convinient location 

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
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error });
        // process.exit(1);
    }
});


//test to get all energy data - this takes a long time to load on screen btw
router.get('/energydata', async function (req, res) {
    try {
        var result = await EnergyData.find({});
        res.status(200).json({ response: result })
    } catch (error) {
        console.error(`Failed: ${error}`);
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


//Get the user for mongodb and check if user exits in the blockchain   
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

//user signup - adds an account to mongo and blockchain 
//TODO: change the structure to await/async 
router.post('/signup', async function (req, res) {
    try {
        console.log("USER IS ATTEMPTING TO SIGN UP ")

        // console.log("email : "+req.body.email);
        // console.log("password : "+req.body.password);

        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) {
                res.status(400).json({ error: err });
                return;
            }
            // return hash
            var newUser = new UserAccount({
                email: req.body.email,
                password: hash,
                address: req.body.address
            });

            newUser.save(async function (err, resUser) {
                if (err) {
                    res.status(500).json({ error: err });
                    return;
                }
                else {
                    const token = jwt.sign(
                        { email: req.body.email },
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_EXPIRY_TIME }
                    );
                    const user = await blockchainfunctions.addUser(resUser.id)
                    res.send({ token: token });

                }
            })

        })
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(400).json({ error });
        // process.exit(1);
    }
})

//User login - gets the account from mongo and blockchain. compares and the password and returns a token
//TODO: change the structure to await/async 
router.post('/login', async function (req, res) {
    try {
        //TODO - can use passport JS for authentication

        console.log("USER IS ATTEMPTING TO LOGIN");
        // console.log("email : "+req.body.email);
        // console.log("password : "+req.body.password);
        UserAccount.findOne({ email: req.body.email }, async function (err, user) {
            if (err) {
                console.log("cant find user")
                // throw Error("User not found");
                return done(null, false)
            }
            else {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' })
                }
                else {
                    console.log("FOUND USER WITH THAT EMAIL");
                    //find in blockchain 
                    var userRes = await blockchainfunctions.getUserId(user.id); //would throw an error if the user doesnt exist in the blockchain 
                    console.log(userRes)

                    bcrypt.compare(req.body.password, user.password, (err, result) => {
                        if (err) {
                            res.status(500).json({ error: err });
                            return;
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
    } catch (error) {
        console.error(`Failed to login: ${error}`);
        res.status(400).json({ error });
        // process.exit(1);
    }
});

//gets all user history, any changes made to the account in the blockchain 
router.get('/userhistory/:id', async function (req, res) {
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
router.get('/usercredithistory/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            throw Error("user id not defined");
        }
        const userCreditHistory = await blockchainfunctions.getUserHistory(id);
        res.status(200).json({ response: userCreditHistory });

    } catch (error) {
        console.error(`Failed: ${error}`);
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

        // TODO: Add mongodb user edit here 


    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
    }
})

//TODO: this should technically be an atomic event..
//TODO: fix the logic (check balance) and make it nicer 
router.put('/buy/:id', async function (req, res) {
    try {

        const postingId = req.params.id;
        if (postingId == undefined) {
            res.status(400).json({ error: "user id not defined" });
        }

        // get information about the posting 
        // i think this will work. havent tested. 
        var posting_info = await Posting.find({ "postingId": postingId });

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
        const addBalance = await blockchainfunctions.addUserBalance(postingId, balance, buyComment);
        if (addBalance.error) {
            res.status(500).json(addBalance);
            return;
        }

        const sellComment = `Subtract Balance of ${balance} \n Reason: Bought ${energy} to ${userBought}`
        //subtract balance for the other user in the blockchain 
        const subBalance = await blockchainfunctions.subtractUserBalance(postingId, balance, sellComment);
        if (subBalance.error) {
            res.status(500).json(subBalance);
            return;
        }

        // TODO: get the transaction id for buy/sell and add it to mongodb for both users 

    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
    }
});

//Remove user from the database and marked deleted on the blockchain 
//TODO: check if we should fully remove the user from the db or should we have an "active" field 
router.delete('/user/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (id == undefined) {
            res.status(500).json({ error: "user id not defined" });
        }

        var result = await UserAccount.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
            // remove user from the blockchain 
            const user = await blockchainfunctions.removeUser(id);
            res.status(200).json({ response: user });
        } else {
            console.log("No documents matched the query. Deleted 0 documents.");
        }
    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
        // process.exit(1);
    }
})



// Route to find all energy data given a user utility account number
//user utility account number maps to installation number in energydata collection
router.get('/energydata/:id', async function (req, res) {
    try {
        //pass user ID in the URL and this will return all of the energy data
        //installation:req.params.id
        var energydata = await EnergyData.find({ "installation": req.params.id });
        res.send(energydata)

    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
        // process.exit(1);
    }
});



//Creates a new posting to sell energy 
router.post('/newposting', async function (req, res) {
    try {
        var newPost = new Posting({
            //id is auto generated later 
            amount_energy: req.body.amountEnergy,
            price: req.body.price,
            timestamp: req.body.timestamp,
            selling_user_id: req.body.sellingUserId,
            buying_user_id: req.body.buyingUserId

        });

        var result = await newPost.save();
        res.send(result._id);

    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ erroFr });
        // process.exit(1);
    }
});


//TODO: get all posting - maybe only get the active ones or ones within a time range 
//Gets all sell postings
router.get('/postings', async function (req, res) {
    try {
        var result = await Posting.find({});
        res.send(result)
    } catch (error) {
        console.error(`Failed: ${error}`);
        res.status(500).json({ error });
    }
});




app.listen(8080, 'localhost');
console.log('Running on http://localhost:8080');

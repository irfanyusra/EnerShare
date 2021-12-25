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
var Transaction = require("./models/transactionModel");
var Posting = require("./models/postingModel");
var EnergyData = require("./models/energyData");
//connect to the mongodb
mongoose.connect(uri, { useNewUrlParser: true, })


// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


// jwt
const jwt = require('jsonwebtoken')


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

//test to get all energy data - this takes a long time to load on screen btw
router.get('/energyData', async function (req, res) {
    console.log('chris')
    
    EnergyData.find({},function(err,result) {
        if (err)
            return next(err);
        res.send(result)
    });
    
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
                        res.status(400).json({ error: err });
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

router.get('/userhistory/:id', async function (req, res) {
    const id = req.params.id;
    if (id == undefined) {
        throw Error("user id not defined");
    }
    const userHistory = await blockchainfunctions.getUserHistory(id);
    if (userHistory.response) {
        res.status(200).json(userHistory);
    }
    else {
        res.status(500).json(userHistory);
    }
});

router.get('/usercredithistory/:id', async function (req, res) {
    const id = req.params.id;
    if (id == undefined) {
        throw Error("user id not defined");
    }
    const userCreditHistory = await blockchainfunctions.getUserHistory(id);
    if (userCreditHistory.response) {
        res.status(200).json(userCreditHistory);
    }
    else {
        res.status(500).json(userCreditHistory);
    }
});

router.put('/user/:id', async function (req, res) {
    const id = req.params.id;
    let name = req.body.name;
    let address = req.body.address;

    if (id == undefined) {
        res.status(500).json({ error: "user id not defined" });
    }
    if (name == null || name == undefined) {
        name = '';
    }
    if (address == null || address == undefined) {
        address = ''
    }

    // nothing to edit in the blockchain 

    // TODO: Add mongodb user edit here 
})

//this should technically be an atomic event..
router.put('/buy/:id', async function (req, res) {
    const postingId = req.params.id;
    if (postingId == undefined) {
        res.status(400).json({ error: "user id not defined" });
    }
    // get information about the posting 


    //TODO: connect mongodb to get the information

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

    // get the transaction id and add it to mongodb for both users 
});

router.delete('/user/:id', async function (req, res) {

    const id = req.params.id;
    
    if (id == undefined) {
        res.status(500).json({ error: "user id not defined"});
    }

    //TODO: remove user from mongo 


    // remove user from the blockchain 
    const user = await blockchainfunctions.removeUser(id);
    if (user.response) {
        res.status(200).json(user);
    }
    else {
        res.status(500).json(user);
    }

})


app.listen(8080, 'localhost');
console.log('Running on http://localhost:8080');

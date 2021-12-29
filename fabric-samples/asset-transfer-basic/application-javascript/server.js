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

//
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

//To edit user account in mongodb - Name, Address, etc
// nothing to edit in the blockchain 
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


    // TODO: Add mongodb user edit here 
    
})

//TODO: this should technically be an atomic event..
router.put('/buy/:id', async function (req, res) {
    const postingId = req.params.id;
    if (postingId == undefined) {
        res.status(400).json({ error: "user id not defined" });
    }
    // get information about the posting 


    //TODO: connect mongodb to get the information
    // i think this will work. havent tested. 
    var posting_info = Posting.find({"postingId":postingId},function(err,result) {
        console.log('looking for that posting')
        if (err)
            return next(err);
        
        return result
    });

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

    // TODO: get the transaction id and add it to mongodb for both users 

});

router.delete('/user/:id', async function (req, res) {

    const id = req.params.id;
    
    if (id == undefined) {
        res.status(500).json({ error: "user id not defined"});
    }

    //TODO: remove user from mongo - not sure how the front end will have the unique id but 
    var result = await UserAccount.deleteOne({_id:id});
    if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }


    // remove user from the blockchain 
    const user = await blockchainfunctions.removeUser(id);
    if (user.response) {
        res.status(200).json(user);
    }
    else {
        res.status(500).json(user);
    }

})



/* Route to find all energy data given a user utility account number */
/* user utility account number maps to installation number in energydata collection ?*/

router.get('/energyData/:id', async function (req, res) {
    
    //pass user ID in the URL and this will return all of the energy data
    //installation:req.params.id
    EnergyData.find({"installation":req.params.id},function(err,result) {
        console.log('looking for energy')
        if (err)
            return next(err);
        
        res.send(result)
    });
    
});



/* Route to make a posting to sell energy */
router.post('/newposting', async function (req, res) {
    //im assuming everything will be populated in the req body
    var newPost = new Posting({
        //not sure how the ID should work - it might get auto generated with the way its setup rn
        amount_energy:req.body.amountEnergy,
        price:req.body.price,
        timestamp:req.body.timestamp,
        selling_user_id:req.body.sellingUserId,
        buying_user_id:req.body.buyingUserId

    })
    newPost.save(function (err) {
        if (err) {
            res.send("error: "+err);
        }
        
        
    })
    res.send(newPost._id);
    
});



app.listen(8080, 'localhost');
console.log('Running on http://localhost:8080');

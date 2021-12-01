// dotenv
require("dotenv").config();

//mongodb instance line below
//const uri = "mongodb+srv://cdevito2:se3316@cluster0-88rcf.mongodb.net/test?retryWrites=true&w=majority"
const uri = "mongodb+srv://capstone:enershare@cluster0.m1bcf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mongoose = require('mongoose') //used to connect to mongodb instance

//SCHEMA FOR DB
var UserAccount = require("./models/userAccount");

//connect to the mongodb
mongoose.connect(uri,{useNewUrlParser : true,})

//express for backend framework
const express = require('express')

//bodyparser
const bodyParser = require('body-parser')

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// jwt
const jwt = require('jsonwebtoken')



const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cors = require('cors')
app.use(cors())

/*var port = process.env.PORT || 8080;  */

//CHANGE THIS TO 8080 - I SOMEHOW HAVE SOMETHING ELSE ON THAT PORT RN SO I CANT USE
var port = 8081
// set our port
var router = express.Router()
//all routes prefixed with /api

app.use('/api',router)

//start the server
app.listen(port)
console.log('Running on http://localhost:'+port);

router.get('/', function(req, res) { //base api call
    console.log('hi')
    
    /* - THIS WAS A TEST TO SEE IF WE CAN WRITE TO OUR DB- IT WORKS
    var userAcc = new UserAccount({
        email:"christest@123.ca",
        
    });
    userAcc.save(function (err) {
        if (err) {
            res.send("error: "+err);
        }
    })*/
    res.send('hooray! welcome to our api!' );   
});



//USER LOGIN 
router.post('/login',function(req,res){
    //TODO - can use passport JS for authentication

    console.log("USER IS ATTEMPTING TO LOGIN");
    // console.log("email : "+req.body.email);
    // console.log("password : "+req.body.password);
    UserAccount.findOne({email:req.body.email}, function(err,user){
        if(err){
            console.log("cant find user")
            return done(null,false)
        }
        else{
            if (!user){
                return done(null,false,{ message: 'That email is not registered' })
            }
            else{
                console.log("FOUND USER WITH THAT EMAIL");
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err){
                        res.send("error:", err)
                    }
                    else{
                        const token = jwt.sign(
                            { email: user.email },
                            process.env.JWT_SECRET,
                            {expiresIn: process.env.JWT_EXPIRY_TIME}
                        );
                        res.send(token);
                    }

                });
            }
        }
    })
});

router.post('/signup', function(req,res){
    
    console.log("USER IS ATTEMPTING TO SIGN UP ")

    // console.log("email : "+req.body.email);
    // console.log("password : "+req.body.password);

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err){
            console.log(err)
            res.send("error:", err)
        }
        // return hash
        var newUser = new UserAccount({
            email: req.body.email,
            password: hash,
            address: req.body.address
        });
    
        newUser.save(function (err) {
            if (err) {
                console.log(err)
                res.send("error: "+err);
            }
            else{
                const token = jwt.sign(
                    { email: req.body.email },
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_EXPIRY_TIME}
                );
                res.send(token);
            }
        })
    })
})
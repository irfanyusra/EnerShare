var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var UserAccountSchema = new Schema({
    email: {
        type: String, 
        unique: true,
        required: true, 
        max: 30,
        text:true
    },
    password: {
        type: String, 
        required: true, 
        min: 6,
        text:true
    },
    // TODO: seperate addresses into different fields 
    address: {
        type: String, 
        required: true, 
        text:true
    },
    name:{
        type:String,
        required: true,
        text:true
    },
    utility_account: {
        type: Number,
        required: true,
        text:true
    }
});

var UserAccount = mongoose.model('UserAccount', UserAccountSchema);
module.exports = UserAccount;
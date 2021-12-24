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
    }
    // TODO: add name fields 
    // TODO: add utility account number fields
});

var UserAccount = mongoose.model('UserAccount', UserAccountSchema);
module.exports = UserAccount;
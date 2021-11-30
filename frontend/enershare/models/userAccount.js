var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    email: {
        type: String, 
        required: true, max: 30,
        text:true
        
    }
});

var UserAccount = mongoose.model('UserAccount',AccountSchema);
module.exports = UserAccount;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// TODO: all camel case and chnage file names
var TransactionSchema = new Schema({
    posting_id:{
        type:[Schema.Types.ObjectId]
    },
    amount_energy:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    timestamp:{
        type:Date,
        required:true
    },
    //TODO: instead it should be sellerTransactionId for the blockchain 
    selling_transaction_id:{
        type:[Schema.Types.ObjectId]
    },
    //TODO: instead it should be buyerTransactionId for the blockchain
    buying_transaction_id:{
        type:[Schema.Types.ObjectId]
    },
    comment:{
        type:String
    }
});

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;



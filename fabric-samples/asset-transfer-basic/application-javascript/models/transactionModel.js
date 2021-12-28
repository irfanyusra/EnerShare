var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// TODO: all camel case 
var TransactionSchema = new Schema({
    PostingId:{
        type:[Schema.Types.ObjectId]
    },
    AmountEnergy:{
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
    sellingTransactionId:{
        type:[Schema.Types.ObjectId]
    },
    //TODO: instead it should be buyerTransactionId for the blockchain
    buyingTransactionId:{
        type:[Schema.Types.ObjectId]
    },
    comment:{
        type:String
    }
});

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;



var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
    sellingUserId:{
        type:[Schema.Types.ObjectId]
    },
    buyingUserId:{
        type:[Schema.Types.ObjectId]
    },
    comment:{
        type:String
    }
});

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;



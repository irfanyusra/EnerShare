var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    posting_id:{
        type:[Schema.Types.ObjectId]
    },
    timestamp:{
        type:Date,
        required:true
    },
    selling_transaction_id_blockchain:{
        type:String
    },
    buying_transaction_id_blockchain:{
        type:String
    },
    comment:{
        type:String
    },
    selling_user_id: {
        type: [Schema.Types.ObjectId]
    },
    buying_user_id: {
        type: [Schema.Types.ObjectId]
    },
});

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;



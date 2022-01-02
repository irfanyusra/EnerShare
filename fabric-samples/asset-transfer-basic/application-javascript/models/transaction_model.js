var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    posting_id:{
        type:Schema.Types.ObjectId
    },
    timestamp:{
        type:Date,
        required:true
    },
    selling_transaction_id_blockchain:{
        type:String,
        required: true
    },
    buying_transaction_id_blockchain:{
        type:String,
        required: true
    },
    comment:{
        type:String
    },
    selling_user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    buying_user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
});

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;



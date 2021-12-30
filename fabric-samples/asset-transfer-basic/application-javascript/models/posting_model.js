var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostingSchema = new Schema({
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
    energy_type: {
        type: String,
        required: true
    },
    timestamp:{
        type:Date,
        required:true
    },
    selling_user_id:{
        type:[Schema.Types.ObjectId]
    },
    buying_user_id:{ /*not sure that this field should be in this schema */
        type:[Schema.Types.ObjectId]
    },
    //transactionId will be from the blockchain - we may need two of them (buy and sell)
    transaction_id: {
        type: [Schema.Types.ObjectId]
    },
});

var Posting = mongoose.model('Posting', PostingSchema);
module.exports = Posting;




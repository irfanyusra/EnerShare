var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostingSchema = new Schema({
    amount_energy:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rate: {
        type: Number,
        required: true
    },
    energy_type: {
        type: String,
        required: true
    },
    timestamp:{
        type:Date,
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        required: true
    },
    //for transaction model
    transaction_id: {
        type: Schema.Types.ObjectId
    },
    active: {
        type: Boolean,
        required: true
    },
});

var Posting = mongoose.model('Posting', PostingSchema);
module.exports = Posting;




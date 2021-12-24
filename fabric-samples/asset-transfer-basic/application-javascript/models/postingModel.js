var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostingSchema = new Schema({
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
    buyingUserId:{ /*not sure that this field should be in this schema */
        type:[Schema.Types.ObjectId]
    }

// TODO: add transactionid field - default null

});

var Posting = mongoose.model('Posting', PostingSchema);
module.exports = Posting;




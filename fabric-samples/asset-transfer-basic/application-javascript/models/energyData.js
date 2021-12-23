var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var energyDataSchema = new Schema({
    installation: {
        type: Number,
        required:true
    },
    interval_start:{
        type: Date,
        requierd:true
    },
    interval_end:{
        type: Date,
        requierd:true
    },
    timezone:{
        type:String,
        required:true
    },
    quantity_delivered:{
        type: Number,
        required:true
    },
    quantity_generated:{
        type: Number,
        required:true
    },
    unit:{
        type:String,
        required:true
    }
},{collection:'energyData'});

var EnergyData = mongoose.model('EnergyData', energyDataSchema);
module.exports = EnergyData;
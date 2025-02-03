const mongoose = require('mongoose');
const path = require('path');
const {formatDate} = require(path.join(__dirname, '../utilities/utilityFunctions.js'));

//Creating the User schema
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    userName: String,
    emailed: { type: Boolean, default: false },
    date: {
        type: Date,
        default: formatDate(new Date()),
    }
});

const userModel = mongoose.model('User', userSchema, 'Users');


//Creating the calculator inputs schema
const calculatorInputsSchema = new mongoose.Schema({
    user: {type: String, required: true},
    date: {
        type: Date,
        default: formatDate(new Date()),
    }, 
    occupants: Number,
    averageShowerTime: Number,
    showerFlowRate: String, 
    toiletFlushVolume: String,
    dishMethod: String,
    laundryMethod: String,
    carWashingFrequency: String,
    poolWaterChangeFrequency: String,
});

const calculatorInputsModel = mongoose.model('calculatorInputs', calculatorInputsSchema, 'calculatorInputs');


//Creating the schema for saving daily water usage
const dailyWaterUsageSchema = new mongoose.Schema({
    user: {type: String, required: true}, 
    date: {
        type: Date,
        default: formatDate(new Date()),
    },
    bathroomWaterUsage: Number,
    kitchenWaterUsage: Number,
    laundryWaterUsage: Number,
    swimmingPoolWaterUsage: Number,
    carWaterUsage: Number
})

const dailyWaterUsageModel = mongoose.model('dailyWaterUsage', dailyWaterUsageSchema, 'dailyWaterUsages');

//Creating the push notifications subscription object schema
const subscriptionSchema = new mongoose.Schema({
    endpoint: String,
    expirationTime: { type: Number, default: null},
    keys: {
        p256dh: String,
        auth: String
    }
})

const subscriptionModel = mongoose.model('Subcription', subscriptionSchema, 'Subscriptions');

//exporting the collections models
module.exports = {userModel, calculatorInputsModel, dailyWaterUsageModel, subscriptionModel};

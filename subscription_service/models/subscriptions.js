'use strict';

const mongoose = require('mongoose');
const SubscriptionSchema = {
    subscriptionId: Number,
    customerId: String,
    products:[
        String
    ],
    schedule:{
        date: Date,
        frequency: Number,
    },
    paymentInfo: Number

};


const Subscriptions = mongoose.model('subscription', SubscriptionSchema);
module.exports = Subscriptions;
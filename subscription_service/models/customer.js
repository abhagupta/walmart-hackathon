'use strict';

const mongoose = require('mongoose');
const Subscription = {
    subscriptionId: Number,
    itemNumber: Number,
    itemName: String,
    period: Number
};

const CustomerSchema = new mongoose.Schema({
    cid: Number,
    name: String,
    phoneNumber: String,
    subscriptions: [{
        subscriptionId: Number,
        itemNumber: Number,
        itemName: String,
        period: Number
    }]
});

const Customer = mongoose.model('customer', CustomerSchema);
module.exports = Customer;
'use strict'
const mongoose = require('mongoose');
const moment = require('moment');
const cfg = require('../config');
const Twilio = require('twilio');

const CustomerSchema = new mongoose.Schema({
    cid: Number,
    name: String,
    phoneNumber: String,
    notification: Number,
    timeZone: String,
    time: {type: Date, index: true},
    item: Number,
    itemName: String,
    period: Number
});

CustomerSchema.statics.sendNotification = function(customerId, callback) {
    console.log("customer id :" , customerId);
    const searchDate = new Date();
    Customer
        .findOne({cid: customerId})
        .then(function(customer) {
            sendNotification(customer);
        });

}

function sendNotification(customer){
    const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
    const options = {
        to: `+ ${customer.phoneNumber}`,
        from: cfg.twilioPhoneNumber,
        /* eslint-disable max-len */
        body: `Hi ${customer.name}. Would you like to have ${customer.itemName} as one of your subscribed products?`,
        /* eslint-enable max-len */
    }

    // Send the message!
    client.messages.create(options, function(err, response) {
        if (err) {
            // Just log it for now
            console.error(err);
        } else {
            // Log the last few digits of a phone number
            let masked = customer.phoneNumber.substr(0,
                customer.phoneNumber.length - 5);
            masked += '*****';
            console.log(`Message sent to ${masked}`);
        }
    });
}

const Customer = mongoose.model('customer', CustomerSchema);
module.exports = Customer;
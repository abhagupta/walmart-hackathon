'use strict';

const mongoose = require('mongoose');
const NotificationSchema = {
    phoneNumber: String,
    customerId: String,
    products:[
        Number
    ]
};

const Notifications = mongoose.model('notification', NotificationSchema);
module.exports = Notifications;
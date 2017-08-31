'use strict';

const mongoose = require('mongoose');
const PredictionSchema = {
    customerId: String,
    products:[{
        productId: Number,
        name: String
    }],
    schedule:{
        date: Date,
        frequency: Number,
    }

};


const Predictions = mongoose.model('predictions', PredictionSchema);
module.exports = Predictions;
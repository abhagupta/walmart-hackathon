'use strict';

const request = require('request');
const cfg = require('../config');
const Twilio = require('twilio');
const concat = require('lodash.concat');

const subscriptionNotificationWorkerFactory = function() {

    return {
        run: function(customerId) {
            request.get("http://subscription-service-hackathon.herokuapp.com/api/subscriptions?customerId="+customerId, function(err, res, body){
                if(err){
                    console.log(err);
                    return err;
                }
                console.log("returned status code" , res.statusCode);
                let subscriptions = JSON.parse(body);
                console.log("subscriptions: ", subscriptions);
                let products = [];

                request.get('http://subscription-service-hackathon.herokuapp.com/api/customerInfo?customerId=' + customerId, function(err, res, body){
                    if(err){
                        console.log(err);
                        return err;
                    }
                    console.log("returned status code" , res.statusCode);
                    console.log("body" , JSON.parse(body));
                    let customerInfo = JSON.parse(body);
                    let phoneNumber = customerInfo.phone_number;
                    let customerFirstName = customerInfo.first_name;
                    let customerLastName = customerInfo.first_name;
                    subscriptions.forEach(function(subscription) {

                        let dataForNotification = {
                            phoneNumber: phoneNumber,
                            firstName: customerFirstName,
                            lastName: customerLastName,
                            products: subscription.products,
                            customerId: customerId,
                        }
                        sendNotification(dataForNotification);
                    });



                });

            })
        },
    };
};


function sendNotification(subscription){
    const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
    let products =  getListOfProducts(subscription.products);
    subscription.products = products;
    console.log("products :", products);
    const options = {
        to: `+ ${subscription.phoneNumber}`,
        from: cfg.twilioPhoneNumber,
        /* eslint-disable max-len */
        body: `Hi ${subscription.firstName}. Would you like to have ${products} as one of your subscribed products?`,
        /* eslint-enable max-len */
    }

    //Send the message!
    client.messages.create(options, function(err, response) {
        if (err) {
            // Just log it for now
            console.error(err);
        } else {
            // Log the last few digits of a phone number
            let masked = subscription.phoneNumber.substr(0,
                subscription.phoneNumber.length - 5);
            masked += '*****';
            console.log(`Message sent to ${masked}`);

            //send a post call to save notification in database as well so we can retrieve it later
            makePostCallToSaveNotification(subscription);
        }
    });
}

function getListOfProducts(products){
    var result = "";
    products.forEach(function(product){
        result = result + product;
    })
    return products;
}

function makePostCallToSaveNotification(subscription){
    const body = {

        "customerId": subscription.customerId,
        "products": subscription.products,
        "phoneNumber": subscription.phoneNumber

    }

    const options = {
        url: 'http://subscription-service-hackathon.herokuapp.com/api/notification',
        headers: {'content-type' : 'application/json'},
        json: body

    }
    request.post(options, function(err, res, body){
        if(err){
            throw err;
        }
        console.log("message from api:", body);
    })
}

module.exports = subscriptionNotificationWorkerFactory();

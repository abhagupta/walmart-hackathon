'use strict';

const request = require('request');
const cfg = require('../config');
const Twilio = require('twilio');
const concat = require('lodash.concat');

const subscriptionNotificationWorkerFactory = function() {

    return {
        run: function(customerId) {
            request.get("http://subscription-service-new.herokuapp.com/api/predictions?customerId="+customerId, function(err, res, body){
                if(err){
                    console.log(err);
                    return err;
                }
                console.log("returned status code" , body);
                let prediction = JSON.parse(body)[0];
                console.log("predictions: ", prediction);
                let products = [];

                request.get('http://subscription-service-new.herokuapp.com/api/customerInfo?customerId=' + customerId, function(err, res, body){
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

                        //console.log('http://subscription-service-hackathon.herokuapp.com/api/productName?productId='+ prediction.products[0]);
                        request('http://subscription-service-new.herokuapp.com/api/productName?productId='+ prediction.products[0], function(err, res, name){
                            if(err) throw err;
                            let dataForNotification = {
                                phoneNumber: phoneNumber,
                                firstName: customerFirstName,
                                lastName: customerLastName,
                                products: name,
                                customerId: customerId,
                                frequency: prediction.schedule.frequency
                            }
                            sendNotification(dataForNotification);
                        })


                       // sendNotification(dataForNotification);




                });

            })
        },
    };
};


function sendNotification(prediction){
    const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
    //let products =  getListOfProducts(prediction.products);
    let products =  prediction.products;
    prediction.products = products;

    const options = {
        to: `+ ${prediction.phoneNumber}`,
        from: cfg.twilioPhoneNumber,
        /* eslint-disable max-len */
        body: `Hi ${prediction.firstName}. You ordered ${prediction.products} about every ${prediction.frequency} days. Would you like to automatically get this product every ${prediction.frequency} days?`,
        /* eslint-enable max-len */
    }

    //Send the message!
    client.messages.create(options, function(err, response) {
        if (err) {
            // Just log it for now
            console.error(err);
        } else {
            // Log the last few digits of a phone number
            let masked = prediction.phoneNumber.substr(0,
                prediction.phoneNumber.length - 5);
            masked += '*****';
            console.log(`Message sent to ${masked}`);

            //send a post call to save notification in database as well so we can retrieve it later
            makePostCallToSaveNotification(prediction);
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

function makePostCallToSaveNotification(prediction){
    const body = {

        "customerId": prediction.customerId,
        "products": prediction.products,
        "phoneNumber": prediction.phoneNumber

    }

    const options = {
        url: 'http://subscription-service-new.herokuapp.com/api/notification',
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

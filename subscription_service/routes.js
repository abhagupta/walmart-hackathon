'use strict'
const router = require("express").Router();
const Customer = require("./models/customer");
const Subscriptions = require("./models/subscriptions");

router.get("/", function(req, res){
    res.send("Hello world");
})

router.get("/api/subscriptions", function(req, res){
    // should find the customer in the database
    let customerId = req.query.customerId;

    Subscriptions.find({customerId: customerId}, function(err, subscriptions){
        if(err){
            throw err;
        }
       if(subscriptions.length > 0){
            res.json(subscriptions);
       } else {
           res.send("No subscriptions found");
       }

        //res.json ({foo:'bar'});

    })

});

router.post("/api/subscriptions", function(req, res){
       const incoming = req.body;
       console.log('incoming',  incoming);
        let subscription = new Subscriptions();
        // subscription.save(function(err){
        //     if (err) return err;
        //     res.send("saved");
        // })

    res.send ("this is not working as of now");


});

router.get("/api/customerInfo", function(req, res){
    // should find the customer in the database
    let customerId = req.query.customerId;

    Customer.findOne({customerId: customerId}, function(err, customer){
        if(err){
            throw err;
        }
        res.json(customer);

    })

});



router.get("/subscription?subscriptionId", function(req, res){
    // should find the subscription in database and return the details
});

router.post("/subscription", function(req, res){
    // retrieve data from the body of the request
    // upate subscription to be accepted or now
});


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
module.exports = router;
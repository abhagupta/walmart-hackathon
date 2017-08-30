const request = require('request');
const expect = require('chai').expect;

describe("API Test", function(){
    var app;
    before(function(){
        process.env.MONGODB_URL='mongodb://twilio_test:test123@ds161443.mlab.com:61443/twilio';
        app = require('../app');
    })


    it("should work for get subscriptions api", function(done){
       request("http://localhost:3000/api/subscriptions?customerId=Solarbreeze", function(err, res, body){
          expect(res.statusCode).to.equal(200) ;
          expect(JSON.parse(body)).to.be.an('array');
          expect(JSON.parse(body)[0].customerId).to.equal('Solarbreeze');
           done();
       })
    })


    it("should work for get customerInfo api", function(done){
        request("http://localhost:3000/api/customerInfo?customerId=Solarbreeze", function(err, res, body){
            expect(res.statusCode).to.equal(200) ;
            expect(JSON.parse(body).customerId).to.equal('Solarbreeze');
            done();
        })
    })
})
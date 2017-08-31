'use strict';

require('serve-favicon');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const fs = require('fs');
const https = require('https');

const keys = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

app.use(cors());

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, {
    useMongoClient: true
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'application/json')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })
app.use(cookieParser());


app.use('/', routes);

// app.listen(process.env.PORT || 4000, function(){
//  console.log("server started ");
// })

https.createServer(keys, app).listen(443, function(err){
    console.log(err);
    console.log("server strted :", 443);
});

module.exports = app;
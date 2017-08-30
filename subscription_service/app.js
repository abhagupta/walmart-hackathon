'use strict';

require('serve-favicon');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const routes = require('./routes');


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

app.listen(3000, function(){
 console.log("server started at 3000");
})



module.exports = app;
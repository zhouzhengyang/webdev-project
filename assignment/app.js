var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://127.0.0.1/test')

require('./services/projectUser.service.server');
require('./services/dashboard.service.server');


app.get('/goodbye', sayHello);
app.get('/website', sendWebsites);

function sendWebsites(req, res) {
    var websites = [
        {name: 'facebook'},
        {name: 'twitter'},
        {name: 'linkedin'}
    ];
    res.send(websites);
}

function sayHello() {
    console.log('hello');
}
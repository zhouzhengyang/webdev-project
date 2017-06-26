var mongoose = require('mongoose');
var projectUserSchema = mongoose.Schema({
    google: {
        id:    String,
        token: String
    },
    facebook:{
        id: String,
        token: String
    },
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dateCreated: {type: Date, default: Date.now},
    roles: [{type: String, default: 'USER', enum: ['USER', 'STUDENT', 'FACULTY', 'ADMIN']}],
}, {collection: "project_user"});

module.exports = projectUserSchema;
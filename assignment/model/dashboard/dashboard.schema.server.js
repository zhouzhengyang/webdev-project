var mongoose = require('mongoose');
var dashboardSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'projectUserModel'},
    name: String,
    imgUrl: String,
    mangaId: String,
    dateCreated: {type: Date, default: Date.now},
}, {collection: "project_dashboard"});

module.exports = dashboardSchema;
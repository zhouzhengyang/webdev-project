module.exports = function (app) {
    var mongoose = require('mongoose');
    var projectUserModel = require("./projectUser/projectUser.model.server.js")(app);
    var dashboardModel = require("./dashboard/dashboard.model.server.js")(app);



    var models = {
        projectUserModel: projectUserModel,
        dashboardModel: dashboardModel
    };
    return models;
};
var mongoose = require('mongoose');
var projectUserSchema = require('./projectUser.schema.server');

var projectUserModel = mongoose.model('userModel', projectUserSchema);

projectUserModel.createUser = createUser;
projectUserModel.findUserById = findUserById;
projectUserModel.findUserByCredentials = findUserByCredentials;
projectUserModel.deleteUser = deleteUser;
projectUserModel.updateUser = updateUser;
projectUserModel.findAllUsers = findAllUsers;
projectUserModel.findUserByGoogleId = findUserByGoogleId;
projectUserModel.findUserByFacebookId = findUserByFacebookId;


module.exports = projectUserModel;

function findUserById(userId) {
    return projectUserModel.findById(userId);
}

function createUser(user) {
    user.roles = ['USER'];
    return projectUserModel.create(user);
}

function findUserByCredentials(username, password) {
    return projectUserModel.findOne({username: username, password: password});
}

function deleteUser(userId) {
    return projectUserModel.remove({_id: userId});
}

function updateUser(userId, user) {
    return projectUserModel.update(
        {_id: userId},
        {$set: user});
}

function findAllUsers() {
    return projectUserModel.find();
}

function findUserByGoogleId(googleId) {
    return projectUserModel.findOne({'google.id': googleId});
}

function findUserByFacebookId(facebookId) {
    return projectUserModel.findOne({'facebook.id': facebookId});
}
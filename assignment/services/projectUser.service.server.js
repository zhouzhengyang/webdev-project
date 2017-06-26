var app = require('../../express');
var projectUserModel = require('../model/projectUser/projectUser.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get   ('/api/user', isAdmin, findAllUsers);
app.get   ('/api/user/:userId', findUserById);
app.post  ('/api/user', createUser);
app.put   ('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', isAdmin, deleteUser);
app.post  ('/api/login', passport.authenticate('local'), login);
app.get   ('/api/checkLoggedIn', checkLoggedIn);
app.get   ('/api/checkAdmin', checkAdmin)
app.post  ('/api/logout', logout);
app.post  ('/api/register', register);
app.delete('/api/unregister', unregister);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

var googleConfig = {
    clientID     : "103478805331-mr3j1dn7ha8pjqbj5vet0m8g2o9606ck.apps.googleusercontent.com",
    //"process.env.GOOGLE_CLIENT_ID",
    clientSecret : "7S_-mJ39iMxAUCkS2k-RUgRE",
    //"process.env.GOOGLE_CLIENT_SECRET",
    callbackURL  : //"http://zhou-zhengyang-webdev.herokuapp.com/auth/google/callback"
    "http://localhost:3000/auth/google/callback"
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));


app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }))
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

var facebookConfig= {
    clientID     : "423206001397088",
    //process.env.MLAB_FACEBOOK_CLIENTID,
    clientSecret : "b7d1dcb76c7e30f06edb02ad7c2e4f54",
    //process.env.MLAB_FACEBOOK_CLIENTSECRET,
    callbackURL  : //"http://zhou-zhengyang-webdev.herokuapp.com/auth/facebook/callback"
    "http://localhost:3000/auth/facebook/callback",
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
function facebookStrategy(token, refreshToken, profile, done) {
    projectUserModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var names = profile.displayName.split(" ");
                    var newFacebookUser = {
                        username: names[1] + names[0],
                        lastName:  names[1],
                        firstName: names[0],
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    }
                    return projectUserModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function googleStrategy(token, refreshToken, profile, done) {
    projectUserModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return projectUserModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function unregister(req, res) {
    var userId = req.params.userId;
    projectUserModel
        .deleteUser(userId)
        .then(function (status) {
            req.user.logout();
            res.sendStatus(200);
        });
}


function checkAdmin(req, res) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function register(req, res) {
    var user = req.body;
    projectUserModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        });
}

function localStrategy(username, password, done) {
    projectUserModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if(!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    projectUserModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

//----------------------------before---------------------------------------
function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if(username && password) {
        return findUserByCredentials(req, res);
    }

    projectUserModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        });
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    projectUserModel
        .deleteUser(userId)
        .then(function (status) {
                res.sendStatus(200);
            },
            function (err) {
                res.status(404).send("Unable to delete user");
            });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    projectUserModel
        .updateUser(userId, user)
        .then(function (user) {
                res.sendStatus(200);
            },
            function (err) {
                res.status(404).send("Unable to update User")
            })
}

function createUser(req, res) {
    var user = req.body;
    projectUserModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    console.log([username, password]);

    projectUserModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user != null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];

    projectUserModel
        .findUserById(userId)
        .then(function (user) {
            res.send(user);
        });
}
var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var request = require('request');
var qs = require('querystring');

var User = require('../models/user.js');


// *** login required *** //
function ensureAuthenticated(req, res, next) {
    if (!(req.headers && req.headers.authorization)) {
        return res.status(400).send({
            message: 'You did not provide a JSON Web Token in the authorization header.'
        });
    }

    // decode the token
    var header = req.headers.authorization.split(' ');
    var token = header[1];
    var payload = jwt.decode(token, process.env.TOKEN_SECRET);
    var now = moment().unix();

    // check if the token has expired
    if (now > payload.exp) {
        return res.status(401).send({
            message: 'Token has expired. '
        });
    }

    // check if the user still exists in the db
    User.findById(payload.sub, function(err, user) {
        if (!user) {
            return res.status(400).send({
                message: 'User no longer exists. '
            });
        }
        req.user = user;
        next();
    });
}

// *** generate token *** //
function createToken(user) {
    var payload = {
        exp: moment().add(14, 'days').unix(),
        iat: moment().unix(),
        sub: user._id
    };
    return jwt.encode(payload, process.env.TOKEN_SECRET);
}

// *** register route *** //


router.post('/signup', function(req, res) {
    User.findOne({email: req.body.email}, function(err, existingUser) {
        if (existingUser) {
            return res.status(409).send({
                message: 'Email is already taken'
            });
        }
        var user = new User({
            email: req.body.email,
            password: req.body.password
        });
        user.save(function() {
            var token = createToken(user);
            res.send({
                token: token,
                user: user
            });
        });
    });
});

// *** login route *** //
router.post('/login', function(req, res) {
    User.findOne({email: req.body.email}, '+password', function(err, user) {
        if (!user) {
            return res.status(401).send({
                message: {
                    email: 'Incorrect email'
                }
            });
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({
                    message: 'Wrong email address and/or password'
                });
            }
            user = user.toObject();
            delete user.password;
            var token = createToken(user);
            res.send({
                token: token,
                user: user
            });
        });
    });
});
// *** list and update users ***//
router.get('/find', function(req,res){
  User.find(function(err, users){
    if (err) {
      res.send(err);
    }else{
      res.json(users);
    }
  });
});

router.put('/find/:id', function(req,res){
  options = {"new":true};
  User.findByIdAndUpdate(req.params.id, req.body, options,function(err, users){
    if (err) {
      res.send(err);
    }else{
      res.json(users);
    }
  });
});


// *** github auth *** //
router.post('/github', function(req, res) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userApiUrl = 'https://api.github.com/user';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: process.env.GITHUB_SECRET
  };

  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
    accessToken = qs.parse(accessToken);
    var headers = { 'User-Agent': 'Satellizer' };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, function(err, response, profile) {
      // Step 3a. Link user accounts.
      if (req.headers.authorization) {
        User.findOne({ github: profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a GitHub account that belongs to you' });
          }
          var token = req.headers.authorization.split(' ')[1];
          var payload = jwt.decode(token, process.env.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.email = profile.email;
            user.githubProfileID = profile.id;
            user.save(function() {
              var token = createToken(user);
              res.send({
                token: token,
                user: user
              });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User.findOne({ githubProfileID: profile.id }, function(err, existingUser) {
          if (existingUser) {
            var token = createToken(existingUser);
            return res.send({
              token: token,
              user: existingUser
            });
          }
          var user = new User();
          user.email = profile.email;
          user.githubProfileID = profile.id;
          user.save(function() {
            var token = createToken(user);
            res.send({
              token: token,
              user: user
            });
          });
        });
      }
    });
  });
});
module.exports = router;

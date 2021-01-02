// Load ENV Details
require('dotenv').config();

// Declare Variables
const User = require('./models/user');
const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
const bodyParser = require('body-parser');

//Setting up Bcrypt for encrypting passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Set up Mongoose Connection - pointing at specific colllection
var mongoose = require('mongoose');
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ssleague'
};

// Connect to MongoDB
mongoose.connect(mongoURI, mongoOptions);

// body-parser middleware
app.use(bodyParser.json());
//app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Set up session and store
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 30*1000
    }
}));

// Check session is active
// Check if user already has a cookie, so is allowed on the next page
var checkSession = function (req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.sendStatus(401);
    }
}

app.get('/', (req, res) => {
    res.send('I live!');
})

// POST request to create a user from given details in body
app.post('/reg', (req, res) => {
    console.log(req.body);

    bcrypt.hash(req.body.pw, saltRounds, function(err, hash) {
        var newUser = new User({
            user: req.body.user,
            pw: hash,
            email: req.body.email
        });
        newUser.save().then(user => {
            res.send(user);
        }, (e) => {
            res.status(400).send(e);
        });
    });
});


// Login Route - checks for auth and returns username and _id
app.post('/login', (req, res) => {
    console.log(req.body);

    User.findOne({user:req.body.user})
    .then(user => {
        if(!user) {
            res.status(404).send();
        }
        else {
            bcrypt.compare(req.body.pw, user.pw, function(err, result) {
                if (result === true) {
                    let data = {
                        user: user.user,
                        _id: user._id
                    }
                    // Return results on success
                    req.session.user = user;
                    res.send(data);
                }
                else {
                    //Failed to match password
                    res.status(404).send();
                }
              });
        }
    })
    .catch((e) => {      
        // Error - send error code
        res.status(400).send(e);    
     });
});

// Get all user details - debug
app.get('/user', (req, res) => {    
    User.findOne({user:req.body.user})
        .then(user => {       
           if(!user) {       
              res.status(404).send();      
           }
           res.send(user);
           console.log(user);
         }).catch((e) => {      
            // Error - send error code
            res.status(400).send(e);    
         });
});

// Protected route - check with session
app.get('/foo', checkSession, (req, res) => {
    res.send("You're still logged in!" + req.session.user.user);
});


app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});
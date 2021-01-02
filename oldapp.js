// Load ENV Details
require('dotenv').config();

// Declare Variables
const User = require('./models/user');
const express = require('express')
const app = express()
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

app.get('/', (req, res) => {
    res.send('I live!');
})

// POST request to create a user from given details in body
app.post('/reg', (req, res) => {
    console.log(req.body);

    bcrypt.hash(req.body.pw, saltRounds, function(err, hash) {
        var newUser = new User({
            user: req.body.user,
            pw: hash
        });
        newUser.save().then(user => {
            res.send(user);
        }, (e) => {
            res.status(400).send(e);
        });
    });
});

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
                    res.send(data);
                }
                else {
                    res.status(404).send();
                }
              });
        }
    })
    .catch((e) => {      
        res.status(400).send(e);    
     });
});

// Get all user details
app.get('/user', (req, res) => {    
    User.findOne({user:req.body.user})
        .then(user => {       
           if(!user) {       
              res.status(404).send();      
           }
           res.send(user);
           console.log(user);
         }).catch((e) => {      
            res.status(400).send(e);    
         });
});

app.listen(port, () => {
    console.log(`listening on port ${port}!`);
})
const express = require('express');
const router = express.Router();

// Load route protection method
const {checkSession, checkAdmin} = require('../util/check');

// Load Post and User models
const Result = require('../models/result');

// Create a result
// req.body to contain postedby, p1n, p1glory, p2n, p2glory
router.post('/add', checkSession, (req, res) => {
    // Create post and saving
    var result = new Result({
        postedBy: req.body.postedBy,
        p1n: req.body.p1n,
        p1glory: req.body.p1glory,
        p2n: req.body.p2n,
        p2glory: req.body.p2glory,
        time: req.body.time
    });
    result.save().then(post => {
        res.send(result);
    }, (e) => {
        res.status(400).send(e);
    })
});

// Return All
// Protected
router.get('/', checkSession, (req, res) => {
    Result.find({})
    .then(result => {
        if(result) {
            res.send(result);
        }
        else {
            res.send("None of that type found");
        }
    }).catch((e) => {     
        res.status(400).send(e);  
    });
});

// Query for a players result history
// Protected
router.get('/q/:p1n', checkSession, (req, res) => {
    Result.find({$or: [{p1n:req.params.p1n}, {p2n:req.params.p1n}]})
    .then(result => {
        if(result) {
            res.send(result);
        }
        else {
            res.send("No results found for that player");
        }
    }).catch((e) => {     
        res.status(400).send(e);  
    });
});

module.exports = router;
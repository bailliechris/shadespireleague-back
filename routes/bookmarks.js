const express = require('express');
const router = express.Router();

// Load route protection method
const {checkSession, checkAdmin} = require('../util/check');

// Load Post and User models
const Bookmark = require('../models/bookmark');

// Create a bookmark
// req.body to contain title, postedBy(mongoID), content (url), type (category)
// bookmark: true for easier querying of DB to limit to bookmarks
router.post('/add', checkSession, (req, res) => {
    // Create post and saving
    var bookmark = new Bookmark({
        title: req.body.title,
        postedBy: req.body.postedBy,
        content: req.body.content,
        type: req.body.type,
        bookmark: true
    });
    bookmark.save().then(post => {
        res.send(bookmark);
    }, (e) => {
        res.status(400).send(e);
    })
});

// Return All
// Protected
router.get('/', checkSession, (req, res) => {
    Bookmark.find({})
    .then(bookmark => {
        if(bookmark) {
            res.send(bookmark);
        }
        else {
            res.send("None of that type found");
        }
    }).catch((e) => {     
        res.status(400).send(e);  
    });
});

// Query for types
// Protected
router.get('/q/:type', checkSession, (req, res) => {
    Bookmark.find({type:req.params.type})
    .then(bookmark => {
        if(bookmark) {
            res.send(bookmark);
        }
        else {
            res.send("None of that type found");
        }
    }).catch((e) => {     
        res.status(400).send(e);  
    });
});

module.exports = router;
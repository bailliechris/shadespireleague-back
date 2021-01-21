const express = require('express');
const router = express.Router();

// Check Session
const checkSession = require('../util/check')
// Load User model
const Post = require('../models/post');

router.post('/create', checkSession, (req, res) => {
    // Create post and saving
        var post = new Post({
            title: req.body.title,
            postedBy: req.body.postedBy,
            content: req.body.content
        });
        post.save().then(post => {
            res.send(post);
        }, (e) => {
            res.status(400).send(e);
        })
});

module.exports = router;
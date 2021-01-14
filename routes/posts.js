const express = require('express');
const router = express.Router();

// Load User model
const Post = require('../models/post');

var checkSession = function (req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.send("Cookie Expired");
    }
}

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
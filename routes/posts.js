// Todo: 23/1/21
// Test view specific posts route
// Test deleting a post route

// Test multiple params route

const express = require('express');
const router = express.Router();

// Load route protection method
const {checkSession, checkAdmin} = require('../util/check');

// Load Post and User models
const Post = require('../models/post');
//const User = require('../models/user');

// Create a post
// req.body to contain title, postedBy(mongoID), content
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


// Protected reading of posts
router.post('/', checkSession, (req, res) => {
    Post.find({postedBy: req.body.postedBy})
    .then(post => {
        if(post) {            
            res.send(post);          
        }
        else {
            res.send("No posts found")
        } 

    }).catch((e) => {     
        res.status(400).send(e);  
    });
});

// Protected reading of single post
// req.body to contain title, postedBy(mongoID), content
router.get('/:id', checkSession, (req, res) => {
    Post.findOne({_id: req.params.id})
    .then(post => {
        if(post) {            
            res.send(post);          
        }
        else {
            res.send("No posts found");
        } 

    }).catch((e) => {     
        res.status(400).send(e);  
    });
});

// Get filtered results of recipes
// Prototyping for the blog index
router.get('/:type/:occasion/:diet/:ingredient/:ratedby', (req, res) => {
    Post.find({type:req.params.type, occasion: req.params.occasion, diet: req.params.diet, 
    ingredient: req.params.ingredient})
    .then(post => {
        if(post) {
            res.send(post);
        }
        else {
            res.send("No recipes found");
        }
    }).catch((e) => {     
        res.status(400).send(e);  
    });
});


// Get all posts
router.get('/', (req, res) => {
    Post.find({})
    .then(post => {
        if(post) {            
            res.send(post);          
        }
        else {
            res.send("No posts found")
        } 

    }).catch((e) => {     
        res.status(400).send(e);  
    });
});


// Update a Post
// Post: postedBy, title, content
router.post('/update', checkSession, (req, res) => {
    Post.findOne({post:req.body.postid})
    .then(post => {
        if(post) {
            if(req.body.title) {
                post.title = req.body.title;
            }

            if(req.body.content) {
                post.content = req.body.content;
            }

            post.save().then(post => {
                res.send(post);
            }, (e) => {
                res.status(400).send(e);
            })

        }
        else {
            res.send("No such post");
        }
    })
    .catch((e) => {      
        // Error - send error code
        res.status(400).send(e);    
    });
});

// Remove a post - req.body to include postid - _id of post.
router.post('/delete', checkSession, (req, res) => {
    Post.deleteOne({post:req.body.postid})
    .then(post => {
        if(post) {
            res.send("Post Removed");
        }
        else
        {
            res.send("No such post found");
        }
    })
    .catch((e) => {      
        // Error - send error code
        res.status(400).send(e);    
    });
});

module.exports = router;
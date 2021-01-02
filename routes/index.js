const express = require('express');
const router = express.Router();

// Welcome Page
router.get('/',  (req, res) => {
    res.send("I live but you're not logged in!")
});

module.exports = router;
// Load ENV Details
require('dotenv').config();

// Declare Variables
const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

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
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Set up session and store
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 120*1000
    }
}));

// Routes List
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

// Add catch all else routes + redirect to /

// Start Server
app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});
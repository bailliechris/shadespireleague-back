//Require Mongoose 
const mongoose = require('mongoose');

// Create Post Schema
const PostSchema = new mongoose.Schema({    
      title: String,    
      postedBy: {        
         type: mongoose.Schema.Types.ObjectId,        
         ref: 'User'    
      },
      content: String    
   },
   { 
      collection: 'table'
   }
);

// We then need to create models to use it
module.exports = mongoose.model("Post", PostSchema);
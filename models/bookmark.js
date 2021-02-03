//Require Mongoose 
const mongoose = require('mongoose');

// req.body to contain title, postedBy(mongoID), content (url), type (category)
// bookmark: true for easier querying of DB to limit to bookmarks

// Create Post Schema
const BookmarkSchema = new mongoose.Schema({    
      title: String,    
      postedBy: {        
         type: mongoose.Schema.Types.ObjectId,        
         ref: 'User'    
      },
      content: String,
      type: String,
      bookmark: Boolean    
   },
   { 
      collection: 'table'
   }
);

// We then need to create models to use it
module.exports = mongoose.model("Bookmark", BookmarkSchema);
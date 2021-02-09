//Require Mongoose 
const mongoose = require('mongoose');

// req.body to contain title, postedBy(mongoID), content (url), type (category)
// bookmark: true for easier querying of DB to limit to bookmarks

// Create Post Schema
const TableSchema = new mongoose.Schema({     
      user: {        
         type: mongoose.Schema.Types.ObjectId,        
         ref: 'User'    
      },
      position: Number    
   },
   { 
      collection: 'table'
   }
);

// We then need to create models to use it
module.exports = mongoose.model("Table", TableSchema);
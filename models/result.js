//Require Mongoose 
const mongoose = require('mongoose');

// req.body to contain title, postedBy(mongoID), content (url), type (category)
// bookmark: true for easier querying of DB to limit to bookmarks

// Create Post Schema
const ResultSchema = new mongoose.Schema({     
      postedBy: {        
         type: mongoose.Schema.Types.ObjectId,        
         ref: 'User'    
      },
      p1n: {        
         type: mongoose.Schema.Types.ObjectId,        
         ref: 'User'    
      },
      p1band: String,
      p1glory: Number,
      p2n: {        
         type: mongoose.Schema.Types.ObjectId,        
         ref: 'User'    
      },
      p2band: String,
      p2glory: Number,
      time: Date    
   },
   { 
      collection: 'results'
   }
);

// We then need to create models to use it
module.exports = mongoose.model("Results", ResultSchema);
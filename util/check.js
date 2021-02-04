// Make check session into file?
// Check session is active
// Check if user already has a cookie, so is allowed on the next page

const User = require('../models/user');

var checkSession = function (req, res, next) {
    if (req.session && req.session.user) {
        // Refresh user details - pass along
        User.findOne({user:req.session.user.user})
        .then(user => {
            if(user) {
                req.session.user = user;
                
            }
        });

        // Move on
        return next();
    } else {
        // Cookie has expired
        return res.send("Cookie Expired");
    }
}

// Add additional user level - superadmin
// Variant of checkSession, include additional && for user_level === 2 in .user
var checkAdmin = function (req, res, next) {
    if (req.session.user.status === 1) {
        return next();
    } else {
        return res.send("Requires Admin Access")
    }
}

// Add admin (as above) but user_level === 1 in .user

module.exports.checkSession = checkSession;
module.exports.checkAdmin = checkAdmin;
// Make check session into file?
// Check session is active
// Check if user already has a cookie, so is allowed on the next page
var checkSession = function (req, res, next) {
    if (req.session && req.session.user) {
        // Refresh user details - pass along
        return next();
    } else {
        return res.send("Cookie Expired");
    }
}

module.exports = checkSession;
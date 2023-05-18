const { User } = require('../models/User')
var auth = async (req, res, next) => {
    let token = req.cookies.x_auth;
    
    await User.findByToken(token, function(err, user) {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    })

}

module.exports = { auth }
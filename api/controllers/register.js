const User = require('../models/user');

module.exports.register = function(req, res) {
    body = req.body;
    console.log(body);
    const user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: pass
    });
    user.save(function(err) {
        if (err) {
            console.log(err);
        }
        res.sendStatus(200);
    });
};

const Audit = require('../models/audience');

module.exports.log = function(req, res) {
    const audit = new Audit(req.body);
    console.log(audit);
    audit.save(function(err) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(204).json();
    });
};

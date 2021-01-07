const router = require('express').Router();
const mongoose = require('mongoose');
const Team = mongoose.model('Team');
const User = mongoose.model('User');
const auth = require('../auth');

router.post('/create-team', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) {
            return res.sendStatus(401);
        }

        let team = new Team(req.body.captain);
        team.nameTeam = req.body.nameTeam;
        team.phone = req.body.phone;
        team.product = req.body.product;
        team.amout = req.body.amout;
        team.limit = req.body.limit;

        return team.save().then(function () {
            res.json({team: team.toJSONFor(user)});
        })
    }).catch(next)
})

module.exports = router;

const router = require('express').Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Team = mongoose.model('Team');
const User = mongoose.model('User');
const auth = require('../auth');

router.get('/list-team', function (req, res, next) {
    Team.find().then(function (teams) {
        res.json({
            teams: teams.map(function (team) {
                return team.toJSONForTeam()
            })
        });
    }).catch(e => {
        return res.status(500).json({error: 'server not found'})
    })
})

router.post('/create-team', function (req, res, next) {
    User.findOne({email: req.body.email}).then(email => {
        if (email) return res.status(400).json({error: 'Please login to create team'});
        Team.findOne({nameTeam: req.body.nameTeam}).then(name => {
            if (name) return res.status(400).json({error: 'Name team is does exits!'});

        })
    })
})

router.post('/create-team-auth', auth.required, function (req, res, next) {
    Team.findOne({nameTeam: req.body.team.nameTeam}).then(name => {
        if (name) return res.status(400).json({error: 'Name team is does exits!'});
        User.findById(req.payload.id).then(function (user) {
            if (!user) {
                return res.sendStatus(401);
            }
            let team = new Team();
            team.nameTeam = req.body.team.nameTeam;
            team.captain = req.body.team.captain;
            team.phone = req.body.team.phone;
            team.product = req.body.team.product;
            team.amount = req.body.team.amount;
            team.limit = req.body.team.limit;

            return team.save().then(function () {
                res.json({team: team.toJSONForTeam(user)});
            })
        }).catch(next)
    }).catch(e => {
        return res.status(500).json({error: 'server not found'})
    })
})

router.get('/team-detail/:teamId', function (req, res, next) {
    const teamId = req.params.teamId;
    Team.findById(teamId).then(team => {
        if (!team) return res.status(400).json({error: 'Team is not found'})
        return res.status(200).json({team: team.toJSONForTeam()})
    }).catch(e => {
        return res.status(500).json({error: 'server not found'})
    })
})


router.post('/join-team/:id', function (req, res, next) {
    const id = req.params.id;
    const {email, fullName, phone} = req.body;
    Team.findById(id).then(team => {
        if (!team) return res.status(404).json({error: 'Team is not found'});
        const newMembers = {email, fullName, phone};
        team.members.push(newMembers)
        team.save().then(function () {
            return res.status(200).json({msg: 'success'})
        })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'phuonglv@dev.pupam.com',
                pass: 'iirrzayeiulwqkkf'
            }
        });
        const mailOptions = {
            from: 'phuonglv@dev.pupam.com',
            to: team.email,
            subject: 'Create account for lic tranding',
            text: `Nhóm của bạn đã có người tham gia vui lòng gửi key bản quyền trong vòng 7 ngày để vào email ${email}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }).catch(e => {
        return res.status(500).json({error: 'server not found'})
    })
})

module.exports = router;

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

router.get('/my-team/:userId', auth.required, function (req, res, next) {
    const userId = req.params.userId;
    Team.find({captain: userId}).then(function (myTeam) {
        return res.json({
            teams: myTeam.map(function (team) {
                return team.toJSONForTeam()
            })
        });
    }).catch(e => {
        return res.status(500).json({error: 'server not found'})
    })
})

const createTeam = function(res, users, next){
    const team = new Team();
    team.email = req.body.team.email;
    team.product = req.body.team.product;
    team.phone = req.body.team.phone;
    team.amount = req.body.team.amount;
    return team.save().then(function () {
        res.json({team: team.toJSONForTeam(), user: users.toAuthJSON()});
    }).catch(next)
}
router.post('/create-team', function (req, res, next) {
    User.findOne({email: req.body.team.email})
        .then(function (user) {
            if (user) {

            } else {
                const users = new User();
                const randomPassword = Math.floor(Math.random() * 10000000);
                const text = 'asd'
                users.email = req.body.team.email;
                users.fullName = req.body.team.fullName;
                users.phone = req.body.team.phone;
                users.setPassword(randomPassword + text);
                users.save().then(function () {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'phuonglv@dev.pupam.com',
                            pass: 'espbhbsnybgejbjk'
                        }
                    });
                    const mailOptions = {
                        from: 'phuonglv@dev.pupam.com',
                        to: req.body.team.email,
                        subject: 'Create account for lic tranding',
                        text: `your password is ${randomPassword + text}`
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }).catch(next);
                const team = new Team();
                team.email = req.body.team.email;
                team.product = req.body.team.product;
                team.phone = req.body.team.phone;
                team.amount = req.body.team.amount;
                return team.save().then(function () {
                    res.json({team: team.toJSONForTeam(), user: users.toAuthJSON()});
                }).catch(next)
            }
        })
        .catch(e => {
            console.log(e)
        })
})

router.post('/create-team-auth', auth.required, function (req, res, next) {

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

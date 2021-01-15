const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../auth');

router.get('/user', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) {
            return res.sendStatus(401);
        }

        return res.json({user: user.toAuthJSON()});
    }).catch(next);
});

router.get('/user/:id', function (req, res, next) {
    const id = req.params.id
    User.findById(id).then(function (user) {
        if (!user) {
            return res.sendStatus(401);
        }
        return res.json({user: user.toProfileJSONFor()})
    })
})

router.put('/user', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) {
            return res.sendStatus(401);
        }
        if (typeof req.body.user.email !== 'undefined') {
            user.email = req.body.user.email;
        }
        if (typeof req.body.user.fullName !== 'undefined') {
            user.fullName = req.body.user.fullName;
        }
        if (typeof req.body.user.phone !== 'undefined') {
            user.phone = req.body.user.phone;
        }
        if (typeof req.body.user.bio !== 'undefined') {
            user.bio = req.body.user.bio;
        }
        if (typeof req.body.user.image !== 'undefined') {
            user.image = req.body.user.image;
        }
        if (typeof req.body.user.password !== 'undefined') {
            user.setPassword(req.body.user.password);
        }

        return user.save().then(function () {
            return res.json({user: user.toAuthJSON()});
        });
    }).catch(next);
});

router.post('/login', function (req, res, next) {
    console.log(req.body)
    if (!req.body.email) {
        return res.status(422).json({errors: {email: "can't be blank"}});
    }

    if (!req.body.password) {
        return res.status(422).json({errors: {password: "can't be blank"}});
    }
    passport.authenticate('local', {session: false}, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            user.token = user.generateJWT();
            return res.json({user: user.toAuthJSON()});
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);

});

router.post('/register', function (req, res, next) {
    const user = new User();
    user.email = req.body.user.email;
    user.fullName = req.body.user.fullName;
    user.phone = req.body.user.phone;
    user.setPassword(req.body.user.password);

    user.save().then(function () {
        console.log(user)
        return res.json({user: user.toAuthJSON()});
    }).catch(next);
});

module.exports = router;

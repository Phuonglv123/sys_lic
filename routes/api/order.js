const router = require('express').Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const auth = require('../auth');
const Team = mongoose.model('Team');
const Order = mongoose.model('Order');
const User = mongoose.model('User')

router.post('/create-order', function (req, res, next) {
    console.log(req)
    User.findOne({email: req.body.email}).then(function (user) {
        if (user) return res.status(400).json({error: 'Please login to join team'})
        const users = new User();
        const randomPassword = Math.floor(Math.random() * 10000000);
        const text = 'asd';
        users.email = req.body.email;
        users.fullName = req.body.fullName;
        users.phone = req.body.phone;
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
                to: req.body.email,
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
        const orders = new Order();
        orders.email = req.body.email;
        orders.fullName = req.body.fullName;
        orders.phone = req.body.phone;
        orders.amount = req.body.amount;
        orders.teamId = req.body.teamId;
        return orders.save().then(function () {
            res.json({orders: orders, user: users.toAuthJSON()});
        })
    }).catch(e => {
        return res.status(500).json({error: 'server not found'})
    })
})

router.post('/create-order-auth', auth.required, function (res, req, next) {
    User.findOne({email: req.body.order.email}).then(function (user) {
        if (!user) return res.status(400).json({message: 'Account is not found'});
        const order = new Order();
        order.email = req.body.order.email;
        order.fullName = req.body.order.fullName;
        order.phone = req.body.order.phone;
        order.amount = req.body.order.amount;
        order.renew = req.body.order.renew;
        order.teamId = req.body.order.teamId;
        order.save().then(function () {
            res.json({orders: order});
        }).catch(next)
    }).catch(e => {
        console.log(e)
    })
})

router.get('/my-order', auth.required, function (req, res, next) {
    Order.findOne({email: req.payload.email}).then(function (order) {
        if (!order) return res.status(400).json({message: 'email is not found'});
        return order.save().then(function () {
            res.json({orders: order});
        }).catch(next)
    }).catch(e => {
        console.log(e)
    })
})

router.post('/update-order/:id', (req, res) => {
    Order.findOne({_id: req.params.id})
        .then(orders => {
            if (!orders) {
                return res.status(400).json({error: "company exists"});
            } else {
                orders.isPaid = req.body.isPaid;

                return orders.save()
                    .then(order => res.status(200).json({
                        'data': order
                    }))
                    .catch((e) => {
                        return res.status(500).json(e)
                    })
            }
        })
        .catch(() => {
            return res.status(500).json({error: 'server not found'})
        })
})

router.delete('/delete-order/:id', (req, res) => {
    const id = req.params.id
    Order.findByIdAndDelete(id)
        .exec()
        .then(() => res.status(200).json({
            success: true,
        }))
        .catch((err) => res.status(500).json({
            success: false,
        }));
})

module.exports = router;

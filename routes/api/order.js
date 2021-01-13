const router = require('express').Router();
const mongoose = require('mongoose');
const Team = mongoose.model('Team');
const Order = mongoose.model('Order');
const User = mongoose.model('User')

router.post('/create-order', function (req, res, next) {
    User.findOne({})
    const teamId = req.body.teamId
    Team.findById(teamId).then(team => {
        if (!team) return res.status(400).json({error: 'Team is not found'})
        const orders = new Order({
            ...req.body
        })
        orders.save().then(function () {
            res.json({orders: orders});
        })
    })
        .catch(e => {
            return res.status(500).json({error: 'server not found'})
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

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email: String,
    fullName: String,
    phone: String,
    amount: String,
    isPaid: {
        type: Boolean,
        default: false
    },
    member: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'}
}, {timestamps: true});

// Requires population of author
OrderSchema.methods.toJSONFor = function (user, team) {
    return {
        id: this._id,
        email: this.email,
        fullName: this.fullName,
        phone: this.phone,
        amount: this.amount,
        isPaid: this.isPaid,
        createdAt: this.createdAt,
        member: this.member.toProfileJSONFor(user),
        team: this.team.toProfileJSONFor(team)
    };
};

mongoose.model('Order', OrderSchema);

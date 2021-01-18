const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email: String,
    fullName: String,
    phone: String,
    amount: Number,
    renew: String,
    isPaid: {
        type: Boolean,
        default: false
    },
    teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'}
}, {timestamps: true});

// Requires population of author
OrderSchema.methods.toJSONForOrder = function (user, team) {
    return {
        id: this._id,
        email: this.email,
        fullName: this.fullName,
        phone: this.phone,
        amount: this.amount,
        isPaid: this.isPaid,
        createdAt: this.createdAt,
        teamId: this.team.toJSONForTeam(team)
    };
};

mongoose.model('Order', OrderSchema);

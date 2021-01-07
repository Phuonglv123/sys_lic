const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    body: String,
    captain: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    nameTeam: String,
    phone: String,
    members: [{
        _id: {
            type: String
        },
        email: {
            type: String
        },
        fullName: {
            type: String
        },
        phone: {
            type: String
        }
    }],
    product: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    limit: {
        type: Number,
        require: true
    },
    registerDate: {
        type: String,
        default: new Date()
    }
}, {timestamps: true});

// Requires population of author
TeamSchema.methods.toJSONFor = function (user) {
    return {
        id: this._id,
        nameTeam: this.nameTeam,
        phone: this.phone,
        members: this.members,
        product: this.product,
        amount: this.amount,
        limit: this.limit,
        createdAt: this.createdAt,
        captain: this.captain.toProfileJSONFor(user)
    };
};

mongoose.model('Team', TeamSchema);

const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    captain: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    nameTeam: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    members: [{
        _id: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        fullName: {
            type: String,
            require: true
        },
        phone: {
            type: String,
            require: true
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
TeamSchema.methods.toJSONForTeam = function (user) {
    return {
        id: this._id,
        nameTeam: this.nameTeam,
        phone: this.phone,
        members: this.members,
        product: this.product,
        amount: this.amount,
        limit: this.limit,
        createdAt: this.createdAt,
        captain: user.email
    };
};

mongoose.model('Team', TeamSchema);

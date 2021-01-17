const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    email: {
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
    registerDate: {
        type: String,
        default: new Date()
    }
}, {timestamps: true});

// Requires population of author
TeamSchema.methods.toJSONForTeam = function () {
    return {
        id: this.id,
        phone: this.phone,
        members: this.members,
        product: this.product,
        amount: this.amount,
        createdAt: this.createdAt,
        email: this.email
    };
};

mongoose.model('Team', TeamSchema);

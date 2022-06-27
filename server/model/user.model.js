const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favCryptos: {
        type: Array,
        default: [],
    },
    isVerified: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('crypto-market-users', userSchema);
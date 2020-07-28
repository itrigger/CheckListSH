const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    place_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Places'
    }
})

module.exports = mongoose.model('Users', usersSchema);
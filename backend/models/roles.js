const mongoose = require('mongoose');

const rolesSchema = mongoose.Schema({
    title: String
})

module.exports = mongoose.model('Roles', rolesSchema);
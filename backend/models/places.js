const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Places', placeSchema);
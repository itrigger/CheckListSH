const mongoose = require('mongoose');

const cbsSchema = mongoose.Schema({
    title: String,
    isactive: String
})

module.exports = mongoose.model('Checkboxes', cbsSchema); //в кавычках название коллекции в БД
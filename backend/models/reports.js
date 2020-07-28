const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    place_id: {
        type: Schema.Types.ObjectId,
        ref: 'Places'
    },
    date: String,
    cb_client_arr: String,
    cb_manager_arr: String
})

module.exports = mongoose.model('Reports', reportSchema);
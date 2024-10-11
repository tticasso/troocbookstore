const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nationSchema = new Schema({
    "name": {
        type: String,
        required: [true, 'Name is required']
    },
},
    {
        timestamps: true
    });

const nation = mongoose.model('nation', nationSchema);
module.exports = nation;
const mongoose = require('mongoose');

const designationModel = mongoose.Schema({
    designationId: {
        type: String,
        required: true,
        unique: true
    },
    designationName: {
        type: String,
        require: true
    },
    rph: {
        type: Number,
        require: true
    },
})

var Designation = mongoose.model('Designation', designationModel);

module.exports = Designation;
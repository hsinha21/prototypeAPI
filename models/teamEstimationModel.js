const mongoose = require('mongoose');

const newModel = mongoose.Schema({
    entryId: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        require: true
    },
    resourceName: {
        type: String,
        require: true
    },
    rhpDesired: {
        type: Number,
        require: true
    },
    rhpDiscounted: {
        type: Number,
        require: true
    },
    totalHours: {
        type: Number,
        require: true
    },
    reqPeriod: {
        type: Number,
        require: true
    },
    avgHours: {
        type: Number,
        require: true
    },
    resourceCostDesired: {
        type: Number,
        require: true
    },
    resourceCostDiscounted: {
        type: Number,
        require: true
    },
    createdBy: {
        type: String,
        require: true
    },
    createdDate: {
        type: Date,
        require: true
    },
    dateTimeStamp: {
        type: Number,
        require: true
    },

})

var TeamEstimation = mongoose.model('TeamEstimation', newModel);

module.exports = TeamEstimation;
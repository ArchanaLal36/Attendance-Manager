var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    dateofapply: {
        type: Date,
        required: true,
        trim: true
    },
    from: {
        type: Date,
        required: true,
        trim: true
    },
    to: {...
        type: Date,
        required: true,
        trim: true
    },
    daysinvolved: {
        type: Number,
        required: true,
        trim: true
    },
    daysavailed: {
        type: Number,
        required: true,
        trim: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    attendance: {
        type: Number,
        required: true,
        trim: true
    }
});

var Leavedet = mongoose.model('Leavedet', Schema,'leaveformdetails');
module.exports = Leavedet;
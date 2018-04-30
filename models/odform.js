var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
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
    to: {
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
    },
    tutor: {
        type: String,
        required: true
    },
    rollno:{
        type: Number,
        required: true
    },
    verified: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    }
});

var Oddet = mongoose.model('Oddet', UserSchema,'odformdetails');
module.exports = Oddet;
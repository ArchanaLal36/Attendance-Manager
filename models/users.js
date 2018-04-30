var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    class: {
        type: String,
        trim: true
    },

    semester: {
        type: String,
        trim: true
    },
    rollno: {
        type: Number,
        trim: true
    },
    tutor: {
        type: String,
        trim: true
    },
    academicco: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    }
});

var User = mongoose.model('User', UserSchema,'userdetails');
module.exports = User;
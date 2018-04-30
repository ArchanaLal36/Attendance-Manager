var mongoose = require('mongoose');
var classschema = mongoose.Schema({
    section: {
        type: String,
        required: true
    },
    tutor1: {
        type: String,
        required: true
    },
    tutor2: {
        type: String,
        required: true
    },
    tutor3: {
        type: String,
        required: true
    },
    currentsem: {
        type: Number,
        required: true
    },
    ac: {
        type: String,
        required: true
    }
});

var classmodels = mongoose.models('classmodels',classschema,'classdetails');
module.exports = classmodels;
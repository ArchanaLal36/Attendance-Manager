var mongoose = require('mongoose');
var deptschema = mongoose.Schema({
    deptname:{
        type: String,
        required: true
    },
    hod:{
        type: String,
        required: true
    }

});
var deptmodel = mongoose.models('deptmodel',deptschema,'deptdetails');
module.exports = deptmodel;
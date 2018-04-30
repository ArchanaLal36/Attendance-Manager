var express = require('express');
var router = express.Router();
var models = require('../../models/users');
var forms = require('../../models/odform');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.authenticate == true){
        if(req.session.designation == 'student') {
            res.render('home/home', {
                title: 'Express'
            })
        }
        else if(req.session.designation == 'tutor'||req.session.designation == 'ac'||req.session.designation == 'hod'){
            res.redirect('/staffs/staffhome');
        }
    }
    else{
        res.redirect('/')
    }

});

router.get('/status', function(req, res, next) {
    if(req.session.authenticate == true) {
        if (req.session.designation == 'student') {
            forms.find({username: req.session.username})
                .exec(function (err, formdata) {
                    if (err) {
                        console.log('error' + err);
                    }
                    else {
                        res.render('forms/studstatus', {
                            formdata: formdata
                        });
                    }
                })
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }

});

module.exports = router;

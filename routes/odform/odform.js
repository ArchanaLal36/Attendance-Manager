var express = require('express');
var router = express.Router();
var session = require('express-session');
var odform = require('../../models/odform');
var bodyParser = require('body-parser');
var mangoose = require ('../../app').mangoose;

router.get('/', function(req, res, next) {
    if(req.session.authenticate == true) {
        if (req.session.designation == 'student') {
            res.render('forms/odform', {
                title: 'On Duty form'
            });
        }
        else if(req.session.designation == 'tutor'||req.session.designation == 'ac'||req.session.designation == 'hod') {
            res.redirect('/staffhome')
        }
    }
    else{
        res.redirect('/');
    }
});

router.post('/getinfo/',function (req, res) {
    console.log('posted successfully');
    var d = new Date(req.body.todaydate);
    console.log(d.getDate()+'/'+d.getMonth());
    console.log(req.session.department);
    if(req.session.authenticate == true) {
        if (req.session.designation == 'student') {
            odform.create(
                {
                    username: req.session.username,
                    dateofapply: req.body.todaydate,
                    from: req.body.from,
                    to: req.body.to,
                    daysinvolved: req.body.daysinvolved,
                    daysavailed: req.body.daysavailed,
                    reason: req.body.reason,
                    attendance: req.body.attendance,
                    tutor: req.session.tutor,
                    rollno: req.session.rollno,
                    type: 'onduty',
                    department: req.session.department,
                    class: req.session.class,
                    verified: 'unverified'
                }
                , function (err, small) {
                    if (err) console.log('Error' + err);
                    else{
                        res.send('<html>\n' +
                            '<body>\n' +
                            'Redirecting you in &nbsp;'+
                            '    <span id="counter">5</span>\n' +
                            '    <script>\n' +
                            '        setInterval(function() {\n' +
                            '            var div = document.querySelector("#counter");\n' +
                            '            var count = div.textContent * 1 - 1;\n' +
                            '            div.textContent = count;\n' +
                            '            if (count <= 0) {\n' +
                            '                window.location.href="/";\n' +
                            '            }\n' +
                            '        }, 1000);\n' +
                            '    </script>\n' +
                            '</body>\n' +
                            '</html>');
                    }
                });

        }
        else if(req.session.designation == 'tutor'||req.session.designation == 'ac'||req.session.designation == 'hod'){
            res.redirect('/staffs/staffhome')
        }
    }
    else {
        res.redirect('/')
    }
});
module.exports = router;





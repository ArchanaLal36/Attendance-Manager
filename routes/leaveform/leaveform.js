var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var form = require('../../models/odform');
var mangoose = require('../../app').mangoose;

router.get('/', function(req, res, next) {
    if(req.session.authenticate == true) {
        if (req.session.designation == 'student') {
            res.render('forms/leaveform', {
                title: 'Leaveform'
            });
        }
        else if(req.session.designation == 'tutor') {
            res.redirect('/staffs/staffhome')
        }
    }
    else{
        res.redirect('/');
    }

});



router.post('/getinfo/',function (req, res) {
    console.log('posted successfully');
    var d = new Date(req.body.dateofapply);
    console.log(d.getDate()+'/'+d.getMonth());
    console.log(req.session.department);
    if(req.session.authenticate == true) {
        if (req.session.designation == 'student') {
            form.create(
                {
                    username: req.session.username,
                    dateofapply: req.body.dateofapply,
                    from: req.body.from,
                    to: req.body.to,
                    daysinvolved: req.body.daysinvolved,
                    daysavailed: req.body.daysavailed,
                    reason: req.body.reason,
                    attendance: req.body.attendance,
                    tutor: req.session.tutor,
                    rollno: req.session.rollno,
                    type: 'leave',
                    department: req.session.department,
                    class: req.session.class,
                    verified: 'unverified'

        }
        , function (err, small) {
                if (err) console.log('Error' + err);
                else {
                    res.send('<html>' +
                        '<body>' +
                        'Redirecting you in &nbsp;' +
                        '    <span id="counter">5</span>' +
                        '    <script>' +
                        '        setInterval(function() {' +
                        '            var div = document.querySelector("#counter");' +
                        '            var count = div.textContent * 1 - 1;' +
                        '            div.textContent = count;' +
                        '            if (count <= 0) {' +
                        '                window.location.href="/";' +
                        '            }' +
                        '        }, 1000);' +
                        '    </script>' +
                        '</body>' +
                        '</html>');
                     }
             });
        }

        else if(req.session.designation == 'tutor'||req.session.designation == 'ac'||req.session.designation == 'hod') {
            res.redirect('/staffs/staffhome')
        }

    }
    else {
        res.redirect('/');
    }
});

module.exports = router;
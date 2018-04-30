var express = require('express');
var router = express.Router();
var session = require('express-session');
var users = require('../../models/users');
var odform = require('../../models/odform');
var bodyParser = require('body-parser');
var mangoose = require ('../../app').mangoose;

router.get('/', function(req, res, next){
    if(req.session.authenticate == true){
        if (req.session.designation == 'tutor'||req.session.designation == 'ac'||req.session.designation == 'hod'){
            if(req.session.designation=='tutor'){
                console.log('tutor::::'+req.session.designation);
                odform.find({tutor: req.session.username}).sort({_id: -1})
                    .exec(function (err, formdata) {
                        if(err){
                            console.error("Error" + err);
                        }
                        else{
                            console.log(formdata[0]);
                            res.render('staff/notifystaff', {
                                title: 'Notification',
                                formdata: formdata,
                                designation:req.session.designation
                            });
                        }
                    });
            }
            else{
                console.log('ac||hod::::');
                odform.find({}).sort({_id: -1})
                    .exec(function (err, formdata) {
                        if(err){
                            console.error("Error" + err);
                        }
                        else{
                            console.log(formdata[0]);
                            res.render('staff/notifystaff', {
                                title: 'Notification',
                                formdata: formdata,
                                designation:req.session.designation
                            });
                        }
                    });
            }// if(req.session.designation == 'hod')



        }
        else if (req.session.designation == 'student') {
            res.redirect('/student')
        }
    }
    else{
        res.redirect('/');
    }
});



router.get('/staffhome/', function(req, res, next) {
    if(req.session.authenticate == true) {
        if (req.session.designation == 'tutor'||req.session.designation == 'ac'||req.session.designation == 'hod') {

            res.render('home/homestaff', {
                title: 'Home'
            })
        }
        else if (req.session.designation == 'student') {
            res.redirect('/student')
        }
    }
    else{
        res.redirect('/');
    }


});


router.get('/addward', function(req, res, next) {
    if(req.session.authenticate == true){
        if (req.session.designation == 'tutor'||req.session.designation == 'ac'||req.session.designation == 'hod'){

            users.find({})
            .exec(function (err, formdata){
                if (err) {
                    console.error("Error" + err);
                }
                else {
                    console.log(formdata[0]);
                    res.render('staff/addward', {
                        title: 'Notification',
                        formdata: formdata,
                        designation: req.session.designation

                    });
                }
            });

        }
        else if (req.session.designation == 'student') {
            res.redirect('/student')
        }
    }
    else{
        res.redirect('/');
    }


});
router.post('/wardgetinfo',function (req,res) {
    //res.send(JSON.stringify(req.body));
    if((req.body.studname)&&(req.body.rollno)&&(req.body.sem)&&(req.body.email)&&(req.body.dept)&&(req.body.tutor)&&(req.body.academicco)&&(req.body.section)&&(req.body.passwd)&&(req.body.confpasswd)){
        users.create({
            email:req.body.email,
            username:req.body.studname,
            password:req.body.passwd,
            department:req.body.dept,
            class:req.body.class,
            semester:req.body.sem,
            rollno:req.body.rollno,
            tutor:req.body.tutor,
            academicco:req.body.academicco,
            designation:'student'
        },function (err, small) {
            if (err)
                console.log('Error' + err);
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
        console.log('new ward added');
    }
    else{
        console.log('error');
    }

});
router.get('/accept/:tagid', function (req, res, next) {
    odform.update({_id: req.params.tagid},{verified:"accepted"})
        .exec(function(err, userdata){
           if(err){
               console.log('error'+err);
           }
           else{
               res.redirect('/staffs/staffhome');
           }
        });
});

router.get('/forward/:tagid', function (req, res, next) {
    if(req.session.designation == 'tutor'){
        odform.update({_id: req.params.tagid},{verified:"tutor"})
            .exec(function(err, userdata){
                if(err){
                    console.log('error'+err);
                }
                else{
                    res.redirect('/staffs/staffhome');
                }
            });
    }
    else if(req.session.designation == 'ac'){
        odform.update({_id: req.params.tagid},{verified:"ac"})
            .exec(function(err, userdata){
                if(err){
                    console.log('error'+err);
                }
                else{
                    res.redirect('/staffs/staffhome');
                }
            });
    }


});

router.get('/decline/:tagid', function (req, res, next) {
    odform.update({_id: req.params.tagid},{verified:"rejected"})
        .exec(function(err, userdata){
            if(err){
                console.log('error'+err);
            }
            else{
                res.redirect('/staffs/staffhome');
            }
        });
});
module.exports = router;
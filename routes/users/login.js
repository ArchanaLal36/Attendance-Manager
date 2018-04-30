var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');

var mongoose = require('../../app').mangoose;
var models = require('../../models/users');

router.get('/', function(req, res, next) {
    if(req.session.authenticate == true){
        if(req.session.designation == 'student') {
            res.redirect('/student');
        }
        else if(req.session.designation == 'tutor'||req.session.designation == 'ac'||req.session.designation == 'hod'){
            res.redirect('staffs/staffhome/');
        }
    }
    else{
        res.render('login/login', {
            title: 'Login'
        });
    }

});

router.post('/authenticate/',function (req, res) {
    console.log('posted successfully');
    models.find({username: req.body.username.toLowerCase(), password: req.body.password})
        .exec(function (err, usrdata) {
            if(err){
                console.error("Error" + err);
            }
            else{
                console.log('log node');
                if(typeof usrdata[0] !== 'undefined'){
                    if(usrdata[0].username == req.body.username && usrdata[0].password == req.body.password){
                        console.log(usrdata[0].designation);
                        console.log(usrdata[0]);
                        req.session.authenticate = true;
                        req.session.username = usrdata[0].username;
                        req.session.designation = usrdata[0].designation;
                        req.session.department = usrdata[0].department;
                        req.session.class = usrdata[0].class;
                        if(typeof usrdata[0].tutor !== 'undefined') {
                            req.session.tutor = usrdata[0].tutor;
                            req.session.rollno = usrdata[0].rollno;
                        }
                        console.log(req.session.designation);
                        console.log(req.session.authenticate);
                        if(usrdata[0].designation == "student"){
                            res.redirect('/student');
                            console.log('student');
                        }
                        else if(usrdata[0].designation == 'tutor'||usrdata[0].designation=='ac'||usrdata[0].designation=='hod'){

                            res.redirect('/staffs/staffhome/');
                            console.log('staff');
                        }

                    }
                    else{
                        res.send('<b>Username or Password Incorrect</b>');
                    }
                }
                else{
                    res.send('<b>Username or Password Incorrect</b>');
                }
                //console.log(req.session + req.cookies);


                /*res.render('home/home', {
                    title: 'Express',
                    data : usrdata
                });*/
            }
        });
});


router.get('/logout', function(req, res, next) {
    if(req.session.authenticate == true){
        delete req.session.authenticate;
        res.redirect('/');
    }


});
module.exports = router;
var express = require('express');
var router = express.Router();
var Query = require('../query.js');
var crypto = require('crypto');
var md5cryto = crypto.createHash('md5');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('register', {title: 'Register'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Login'});
});


router.post('/register', function (req, res) {
    var email = req.body.email;
    var pwd = req.body.pwd;
    var md5 = md5cryto.update(pwd).digest('hex');


    Query.register(email, pwd, md5, function (status) {

        if (status === 1) {
            console.log('email is: ', email, 'password is:', pwd, 'md5 is:', pwd);
            res.send('Registry successfully');
        } else {
            res.send('Registry failed');
        }

    });

});


router.post('/login', function (req, res) {
    var email = req.body.email;
    var pwd = req.body.pwd;
    var sqlpwd;

    Query.login(email, pwd, function (status, sqlres) {
        if (status === 1) {
            sqlpwd=sqlres.rows[0].password;
            console.log('email:', email, 'password:', pwd, 'query password:',sqlpwd);
            if(pwd===sqlpwd){
                res.send('Login success');
            }else {
                res.send('Login error');
            }

        } else {
            res.send('Login failed');
        }
    });

});

module.exports = router;

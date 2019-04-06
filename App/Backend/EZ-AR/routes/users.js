var express = require('express');
var router = express.Router();
var Query = require('../query.js');
var crypto = require('crypto');
var md5cryto = crypto.createHash('md5');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register',{title:'Register'});
});


router.post('/register', function(req,res){
  var email = req.body.email;
  var pwd = req.body.pwd;
  var md5 = md5cryto.update(pwd).digest('hex');



  Query.register(email, pwd, md5,function (status) {

    if(status === 1){
      console.log('email is: ', email,'password is:', pwd,'md5 is:', pwd);
      res.send('Registry successfully');
    }else {
      res.send('Registry failed');
    }

  });

});

module.exports = router;

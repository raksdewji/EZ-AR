var express = require('express');
var router = express.Router();
var Query = require('../query.js')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register',{title:'Register'});
});


router.post('/register', function(req,res){
  var email = req.body.email;
  var name = req.body.name;
  var pwd = req.body.pwd;
  var veri_code = "123";


  Query.register(email, name, pwd,function (status) {

    if(status === 1){
      console.log('email is: ', email,'username is:', name,'password is:', pwd);
      res.send('Registry successfully');
    }else {
      res.send('Registry failed');
    }

  });

});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register',{title:'Register'});
});


router.post('/register', function(req,res){
  var email = req.body.email;
  var name = req.body.name;
  var pwd = req.body.pwd;
  var veri_code = "123";

  console.log(email,name,pwd);

})

module.exports = router;

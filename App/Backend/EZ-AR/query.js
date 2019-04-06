var SQLQuery = require('./sql.js');

module.exports = function () {

};

module.exports.register = function (email, pwd, md5, callback){
    var status = -1;
    var query = "INSERT INTO registry (email,password,md5) VALUES ('" + email + "','" + pwd + "','"+ md5 + "');"
    SQLQuery(query,function (err,res) {
        if(err){
            status = 0;
            callback(status);
        }else {
            status = 1;
            callback(status);
        }
    });
};
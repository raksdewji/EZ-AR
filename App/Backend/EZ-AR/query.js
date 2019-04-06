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

module.exports.login = function (email, pwd, callback){
    var status = -1;
    var query = "SELECT ('"+ pwd +"')  FROM registry;" //(email,username,password) VALUES ('" + email + "','" + usrname + "','"+ pwd + "');"
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
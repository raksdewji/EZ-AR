var SQLQuery = require('./sql.js');

module.exports = function () {

};

module.exports.register = function (email, usrname, pwd, callback){
    var status = -1;
    var query = "INSERT INTO registry (email,username,password) VALUES ('" + email + "','" + usrname + "','"+ pwd + "');"
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
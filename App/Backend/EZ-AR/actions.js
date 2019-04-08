var SQLQuery = require('./sql.js');

module.exports = function () {

};

// When register, it works like this
//
// register().then().insertUser().then().getUserID().then().createProfile()

module.exports.register = function (email, pwd, md5, callback) {
    var status = -1;
    var query = "INSERT INTO registry (email,password,md5) VALUES ('" + email + "','" + pwd + "','" + md5 + "');";
    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            insertUser(email, callback);
        }
    });
};

var insertUser = function (email, callback) {
    var status = -1;
    var query = "INSERT INTO \"user\" (email) VALUES ('" + email + "');";
    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            getUserID(email, callback);
        }
    });
};

var getUserID = function (email, callback) {
    var status = -1;
    var query = "SELECT user_id FROM \"user\" where email='" + email + "';";
    var userID;
    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            userID = res.rows[0].user_id;
            createProfile(userID, callback);
        }
    });
};

var createProfile = function (userID, callback) {
    var status = -1;
    var query = "INSERT INTO \"profile\" (user_id) VALUES ('" + userID + "');";
    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status);
        }
    });
};

module.exports.login = function (email, pwd, callback) {
    var status = -1;
    var query = "SELECT password FROM registry where email='" + email + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};


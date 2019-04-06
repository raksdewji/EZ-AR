// connect with PostgresSQL
var pg = require('pg');


// Database config
var config = {
    user:"jianliao",
    database:"EZ-AR",
    password:"jianliao",
    host: 'localhost',
    port:1234,

    // extended attributes
    poolSize: 5,
    poolIdleTimeout: 30000,
    reapIntervalMillis: 10000
}

var pool = new pg.Pool(config);


pool.connect(function (isErr, client, done) {
    if (isErr) {
        console.log('Connect query:' + isErr.message);
        return;
    }
    client.query('select now();', [], function (isErr, rst) {
        done();
        if (isErr) {
            console.log('Query error:' + isErr.message);
        } else {
            console.log('Query success, data is: ' + rst.rows[0].now);
        }
    })
});

var SQLQuery = function(sql, callback){
    pool.query(sql, (err, res) => {
        callback(err,res);

        if (err) {
            console.log('Query error:' + err.message);
        } else {
            console.log(res.rows);
        }
    });
};

// var Register = function(email,usrname,pwd,status){
//
//     var query = "INSERT INTO registry (email,username,password) VALUES ('" + email + "','" + usrname + "','"+ pwd + "');"
//     SQLQuery(query,function (err,res) {
//         if(err){
//             status=0;
//         }else {
//             status=1;
//         }
//     });
//
// };





pool.on("error", function(err, client){
    console.log("error --> ", err)
});

pool.on('acquire', function (client) {
    console.log("acquire Event")
});

pool.on('connect', function () {
    console.log("connect Event")
});


module.exports = SQLQuery ;
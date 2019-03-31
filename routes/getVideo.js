var express = require('express');
var router = express.Router();
var Vimeo = require('vimeo').Vimeo;
var SQLQuery = require('../sql.js');

var CLIENT_ID = "061aa02231acefde34014f76c31838b868e6b31d";
var CLIENT_SECRET = "H+iZMclR/mysG+uiruG1nA1m3u6091YO3yF5KOu9QuWIoNuSRpUpu8G4HBp/6vyZNkc39RNMcAas8oSYwejatW3/6e9R52/knFbXsJru05STNqaTk9g/5qhHwhsLx74N";
var ACCESS_TOKEN = "40a4aca266eba07d5b3ad1328346259a";
var lib = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);
var scope = 'private';



lib.generateClientCredentials(scope, function (err, access_token) {
    if (err) {
        throw err;
    }

    var token = access_token.access_token;

    // Other useful information is included alongside the access token
    // We include the final scopes granted to the token. This is important because the user (or api) might revoke scopes during the authentication process
    var scopes = access_token.scope;
});


/* GET home page. */
router.get('/:id', function(req,res, next){
    console.log("api call made");
    console.log(req.params.id);
    var status = -1;
    var id = req.params.id;
    var query = "SELECT * FROM AR_RESOURCES WHERE res_id =" + id;
    SQLQuery(query,function (err,result) {
        if(err){
            status = 0;
            res.send("Error");
        }else {
            console.log("search for video result:");
            console.log(result);
            if(result.rows == null || result.rows.length === 0 ){
                console.log("nothing returned");
                res.send();
            }else{
                console.log(result.rows[0].link);
                status = 1;
                res.send(result.rows[0].link);
            }

        }
    });
})

module.exports = router;

var express = require('express');
var router = express.Router();
var Vimeo = require('vimeo').Vimeo;
var SQLQuery = require('../sql.js');
var SetterMethods = require('../setters.js');
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
router.post('/:id', function(req,res, next){
    console.log("api call made");
    console.log(req.params.id);
    var status = -1;
    var id = req.params.id;
    let passedInQuery = req.params.id.split(".");
    console.log(passedInQuery);
    let itemRequested = passedInQuery[0];
    console.log(itemRequested);
    let param_to_getter = passedInQuery.slice(1);

    if(itemRequested == 'setUser'){
        console.log('set user was requested, and the parameters are' + param_to_getter);
        let user_id = param_to_getter[0];
        let username = param_to_getter[1];
        let country = param_to_getter[2];
        let state = param_to_getter[3];
        let city = param_to_getter[4];

        SetterMethods.setUser(user_id, username, country, state, city, function(result){
            console.log("result of calling setUser");
            console.log(result);
            res.send(result);
        });

    }
    if(itemRequested == 'getProfile'){
        var query = "SELECT * FROM public.profile where user_id='" + param_to_getter + "';";
    }
    if(itemRequested == 'getRegistry'){
        var query = "SELECT * FROM public.registry where email='" + param_to_getter + "';";
    }
    if(itemRequested == 'getSocialMedia'){
        var query = "SELECT * FROM public.socialmedia where user_id='" + param_to_getter + "';";
    }
    if(itemRequested == 'getIdentificationPicture'){
        var query = "SELECT * FROM public.identification_picture where pic_id='" + param_to_getter + "';";

    }
    if(itemRequested == 'getARResources'){
        var query = "SELECT * FROM public.ar_resources where res_id='" + param_to_getter + "';";

    }
    if(itemRequested == 'getAdvertisements'){
        var query = "SELECT * FROM public.advertisement where ad_id='" + param_to_getter + "';";

    }
    if(itemRequested == 'getBusinessOwner'){
        var query = "SELECT * FROM public.business_owner where user_id='" + param_to_getter + "';";

    }

    if(itemRequested == 'getCard'){
        var query = "SELECT * FROM public.card where card_name='" + param_to_getter + "';";
    }

    if(itemRequested == 'getCompany'){
        var query = "SELECT * FROM public.company where company_name='" + param_to_getter + "';";

    }
    if(itemRequested == 'getEntertainmentComplex'){
        var query = "SELECT * FROM public.entertainment_complex where complex_name='" + param_to_getter + "';";

    }
    if(itemRequested == 'getProduct'){
        var query = "SELECT * FROM public.product where product_code='" + param_to_getter + "';";

    }
    if(itemRequested == 'getService'){
        var query = "SELECT * FROM public.service where provider='" + param_to_getter + "';";

    }
    if(itemRequested == 'getProvideRelation'){
        var query = "SELECT * FROM public.provide where user_id='" + param_to_getter + "';";
    }
    if(itemRequested == 'getScanRelation'){
        var query = "SELECT * FROM public.scan where user_id='" + param_to_getter + "';";
    }
    if(itemRequested === 'getShareRelation') {
        var query = "SELECT * FROM public.share where user_id='" + param_to_getter + "';";

    }
    if(itemRequested === 'getViewRelation'){
        var query = "SELECT * FROM public.view where user_id='" + param_to_getter + "';";

    }
    //var query = "SELECT * FROM AR_RESOURCES WHERE res_id =" + id;
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
                console.log(result.rows[0]);
                status = 1;
                res.send(result.rows[0]);
            }

        }
    });
});

module.exports = router;

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
router.get('/', function(req,res, next){
    console.log("api call made");
    lib.request(/*options*/{
        // This is the path for the videos contained within the staff picks channels
        path : '/me/videos'
        // This adds the parameters to request page two, and 10 items per page

    }, /*callback*/function (error, files, status_code, headers) {
        if (error) {
            console.log('error');
            console.log(error);
        } else {
            console.log('files');
            console.log(files);
            console.log('files.paging.data' + files.data[0].name)


            // do something with the list of videos that were returned
            // Make the linksToEmbed array to be null so that the same video isn't pushed twice
            linksToEmbed = [];
            fileNameArr = [];
            var link;
            var title;
            var arrSplit;
            function asyncLoop( i, callback ) {
                if( i < files.data.length ) {
                    console.log(i);
                    console.log(files.paging);
                    var file = files.data[i];
                    var link = file.link;
                    linkArr = link.split('/');
                    console.log('link' + link + '\n' + linkArr[linkArr.length-1]);

                    link = 'https://player.vimeo.com/video/' + linkArr[linkArr.length -1];
                    arrSplit = file.name.split(".mp4");
                    title = file.name;
                    console.log('\n\n\n' + 'title:' + title + '\n\n\n\n\"');
                    tags = title.split(" ");
                    description = "blah blah";
                    linksToEmbed.push(link);      // push the link
                    fileNameArr.push(title);  // push the title of the video to array
                    //console.log('linksToEmbedArray' + linksToEmbed[i]);

                    var status = -1;
                    var query = "SELECT * FROM AR_RESOURCES WHERE res_id == " + title;
                    SQLQuery(query,function (err,result) {
                        if(err){
                            status = 0;
                            console.log("error in file query");
                            callback(status);
                        }else {
                            status = 1;
                            console.log("got back something");
                            console.log("result" + result);
                            callback(status);

                            // here need to check if a video is available
                            // if there is, then do nothing
                            // else add this new link to our db
                        }
                    });
                } else {
                    callback();
                }
            }
            asyncLoop( 0, function() {
                // put the code that should happen after the loop here
                for(var i = 0; i< linksToEmbed.length; i++){
                    console.log(linksToEmbed[i] + '\t' + fileNameArr[i] + '\n')
                }
                res.render('videos2', { title: 'Express', linksToEmbed: linksToEmbed, fileNameArr:fileNameArr} );
            });


        }

        console.log('status code');
        console.log(status_code);
        console.log('headers');
        console.log(headers);
    });


})

module.exports = router;

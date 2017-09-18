'use strict';
exports = module.exports = barcode;
var admin = require("firebase-admin");
var havenondemand = require('havenondemand')
var client = new havenondemand.HODClient("");


function barcode(ID,URL){

    return new Promise ((resolve, reject) => {
        
               var data={"url":URL}
        client.get('recognizebarcodes', data, false, function(err, resp, body) {
            console.log(resp.body)
        if (!err && resp.body.barcode.length !== 0) 
                    resolve(parseInt(resp.body.barcode[0].text));
        else
       reject("Failed"); 
 
});
    });   
    
}



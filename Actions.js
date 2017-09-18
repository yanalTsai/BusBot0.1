'use strict';
exports = module.exports = Actions;
var admin = require("firebase-admin");
const Botly = require("botly");
const botly = new Botly({
    accessToken: "", //page access token provided by facebook 
    verifyToken: "cool", //needed when using express - the verification token you provided when defining the webhook in facebook 
     webHookPath: "/",
       notificationType: Botly.CONST.REGULAR //already the default (optional), 
});
var request = require('request-json');
var client = request.createClient('http://hacktripplanner.notanotherfruit.com:8080/otp/routers/default/');

function Actions(Ac,params,S){

    
    switch(Ac){
        
        case "ShowBus":
            
            
            ShowBus(params,S);
            break;
                    case "Win":
            
            
            Win(params,S);
            break;
    }
}


function Win(p,s){
    botly.sendImage({id: s, url: "https://buzfairy.files.wordpress.com/2011/06/zain-iphone-4-offers.png"}, (err, data) => {
        //log it 
});
botly.sendImage({id: s, url: "https://buzfairy.files.wordpress.com/2011/06/zain-iphone-4-offers.png"}, (err, data) => {
        //log it 
});
botly.sendImage({id: s, url: "https://buzfairy.files.wordpress.com/2011/06/zain-iphone-4-offers.png"}, (err, data) => {
        //log it 
});
botly.sendImage({id: s, url: "https://buzfairy.files.wordpress.com/2011/06/zain-iphone-4-offers.png"}, (err, data) => {
        //log it 
});
botly.sendImage({id: s, url: "https://buzfairy.files.wordpress.com/2011/06/zain-iphone-4-offers.png"}, (err, data) => {
        //log it 
});

botly.sendText({id: s, text: "rate this bus from 10"}, function (err, data) {

});


}

function ShowBus(p,s){


var elemntss=[]

let element_1 = botly.createListElement({
  title: "Route 1",
  image_url: "https://peterssendreceiveapp.ngrok.io/img/collection.png",
  subtitle: "50 min",
  buttons: botly.createPostbackButton("Continue", "Route 1"),
  default_action: {
      "url": "https://peterssendreceiveapp.ngrok.io/shop_collection",
  }
});
let element_2 = botly.createListElement({
  title: "Route 2",
  image_url: "https://peterssendreceiveapp.ngrok.io/img/collection.png",
  subtitle: "10 min",
  buttons: botly.createPostbackButton("Continue", "Route 2"),
  default_action: {
      "url": "https://peterssendreceiveapp.ngrok.io/shop_collection",
  }
});
let element_3 = botly.createListElement({
  title: "Route 3",
  image_url: "https://peterssendreceiveapp.ngrok.io/img/collection.png",
  subtitle: "20 min ",
  buttons: botly.createPostbackButton("Continue", "Route 3"),
  default_action: {
      "url": "https://peterssendreceiveapp.ngrok.io/shop_collection",
  }
});
elemntss.push(element_1)
elemntss.push(element_2)
elemntss.push(element_3)
let buttons = [];

botly.sendList({id: s, elements: elemntss, buttons: buttons}, (err, data) => {
    console.log("send generic cb:", err, data);
});
    
}



















function formatDate(createdAt) { 
  var date = new Date(parseInt(createdAt));
var iso = date.toISOString();
var res = iso.split("-",2);
 var res = iso.split("T",1);
 var temp=res;
console.log(temp[0])
  return temp[0];
}
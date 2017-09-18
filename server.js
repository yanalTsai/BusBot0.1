

/*
what we are using ?

1-  API.AI as our NLP engine 
2-  nodeJs for our backend code 
3-  Firebase as our STM (short memory term ) to save the user preferences
4-  ionic 2 for our driver App
5-  Google maps Api for GeoCodeing || Khtotna Api both will work
6-  botly as our gateway to facebook messanger platform 
7-  if you find any barcode readers , we wnated to make the user take a photo of a barcode as the trip ID

- finally the code was made as quickly as possible so we didnt follow any desgin patterns it was only sequential approch 











*/

var http = require('http');
var path = require('path');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser')
var admin = require("firebase-admin");
const app = express();
app.use(bodyParser.json())
var apiai = require('apiai');
 var serviceAccount = require("./Key.json");
var actions=require('./Actions.js');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});
var a = apiai("");
var havenondemand = require('havenondemand')
var client = new havenondemand.HODClient("");
 var uniqid = require('uniqid');
 var Barcode=require('./BarCode.js');
//console.log(uniqid());
 var googleMapsClient = require('@google/maps').createClient({
  key: ''
});

const Botly = require("botly");
const botly = new Botly({
    accessToken: "", //page access token provided by facebook 
    verifyToken: "cool", //needed when using express - the verification token you provided when defining the webhook in facebook 
     webHookPath: "/",
       notificationType: Botly.CONST.REGULAR //already the default (optional), 
});
botly.setGetStarted({pageId: "BusBot2017", payload: "GET_STARTED_CLICKED"}, (err, body) => {
    //log it 
});

botly.setGreetingText({
    pageId: "BusBot2017",
     greeting: [{
           "locale":"default",
           "text":"Your Bus Assistance !"
       }, {
           "locale":"en_US",
           "text":"Your Bus Assistance"
   }]}, (err, body) => {
    //log it 
});

function Typing(ID){
    botly.sendAction({id: ID, action: Botly.CONST.ACTION_TYPES.TYPING_ON}, (err, data) => {
        console.log(data);
});    
}

 function CheckSession(SID){
       return new Promise ((resolve, reject) => {
 
     admin.database().ref("/session").orderByChild("FBid").equalTo(SID).once("value").then(function(res){
         console.log(res.exists);
         if(res.exists())
         {
             res.forEach(function(snap){
                    resolve(snap.key)        
             })
         
         }else{
                        
                            var resualt = admin.database().ref("/session/").push({FBid:SID}).key
             
                            resolve(resualt)            
             
         }
         
     })
 
       })
       }
 var request = require('request-json');
var client = request.createClient('hackbusapi.notanotherfruit.com/reverseGeocode');

botly.on("message", function(senderId, message, data) {
             Typing(senderId)   
        
        
 CheckSession(senderId).then(function(Id){
            console.log("/********************************/ here is the ID "+Id);
    if(data.attachments !== undefined)
        {  
        
        
        /*
        
        when user send the location reverse the geoPoints to an address  and send it as a "hi i am in {{place}}"
        
        */
        
        
        

     var re = a.textRequest("hi i am at amman", {
      sessionId: Id// SENDER_ID INSTED , ONLY FOR TESTING PURPOS 
       });
                  
        re.on('response', function(response) {
            
        actions(response.result.action,response.result.parameters,senderId);
        console.log(response.result.contexts)
        
        botly.sendText({
        id: senderId,
        text: response.result.fulfillment.speech
        });});    
            
        re.on('error', function(error) {
        console.log(error);
        });
        re.end();    
            
        }
        
        else
            {
    
        
        // IF RESPONCE IS DATA 
      
      var request = a.textRequest(data.text, {
      sessionId: Id// SENDER_ID INSTED , ONLY FOR TESTING PURPOS 
       });
 
        request.on('response', function(response) {
            
        actions(response.result.action,response.result.parameters,senderId);
        console.log(response.result.contexts)
        
        botly.sendText({
        id: senderId,
        text: response.result.fulfillment.speech
        });});
        
        request.on('error', function(error) {
        console.log(error);
        });
        request.end();
            }
        
 })
});//BOTLY FUNCTION



botly.on("postback", (sender, message, postback, ref) => {
    /**
     * where postback is the postback payload
     * and ref will arrive if m.me params were passed on a get started button (if defined)
     */
     console.log(postback)
     console.log(message)
    if(postback==="GET_STARTED_CLICKED"){
        botly.sendText({id: message.sender.id, text: "Welcome To BusBot"}, function (err, data) {
        //log it 
});
    }
 
 
     switch(message.postback.title){
        case 'Continue':
        
        /*
        
        this is only for the prototype the correct approch is to use khtotna api and select the route then deep linking will be great insted of google maps  
        
        */
        
        botly.sendText({
        id: message.sender.id,
        text: message.postback.payload +" chossen  \n https://www.google.jo/maps/dir/31.9721235,35.8330738/%D8%AF.+%D8%B9%D8%A8%D8%AF%D9%88%D9%86%D8%8C+%D8%B9%D9%85%D9%91%D8%A7%D9%86%E2%80%AD/@31.9608608,35.8818433,14z/am=t/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x151ca0f33d0576c5:0xd27c4f27fdf66534!2m2!1d35.8928391!2d31.9489273"
        });
    
        
         break;
     }
});

        
        app.use("/", botly.router());
        app.listen(8080,function(){
        console.log("started");
        });

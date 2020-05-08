import { Router } from 'express';
var mqtt = require('mqtt');


const router = Router();



router.get('/', async (req, res) => {

    var client = mqtt.connect("mqtt://m24.cloudmqtt.com:10991", { clientId: "jelMeNekoTrazio", username: "web", password: "a" });
    console.log("connected flag  " + client.connected);
    
    //handle incoming messages
    client.on('message', function (topic, message, packet) {
        console.log("message is " + message);
        console.log("topic is " + topic);    
    });
    
    
    client.on("connect", function () {
        console.log("connected  " + client.connected);
    })
    
    //handle errors
    client.on("error", function (error) {
        console.log("Can't connect" + error);
        process.exit(1)
    });
    
    var topic = "s1/tmpzrak";
    console.log("subscribing to topics");
    client.subscribe(topic, { qos: 1 }); //single topic
    
    //notice this is printed even before we connect
    console.log("end of script");
    res.send("siose")
})


export default router;
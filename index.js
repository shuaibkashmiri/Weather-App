const express = require("express");
const bodyParser= require("body-parser");
const https =  require("https");
const app = express();
const port=5501;
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/app.html");

    })
    app.post("/",function(req,res){
        console.log(req.body.city);
        const query=req.body.city;
const url="https://api.openweathermap.org/data/2.5/weather?appid=eb4d62d92e16de03b16bdb5d8cf2e328&q="+query+"&units=metric"

https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
     const weatherdata = JSON.parse(data)
     const temp = weatherdata.main.temp;
     const description= weatherdata.weather[0].description
     const icon= weatherdata.weather[0].icon
     const imageURL ="http://openweathermap.org/img/wn/"+icon +"@2x.png"
     res.write("<h1>The temperature in "+query+" is "+temp+" degree Celcius</h1>");
     res.write("<p>Currently it is "+description+" in "+query+"<p>");
     res.write("<img src="+imageURL+">");
     res.send();
    });
});

    })


app.listen(port,function(){
    console.log ("The Server is running");
});
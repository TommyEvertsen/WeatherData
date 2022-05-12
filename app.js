const express = require("express");
const https = require("https");
const app = express()
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
const query = req.body.cityName
const apiKey = "5e6d3e46ca6d4d69ca7a3ed7f9f3fa61"
const unit = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey+ "&units=" + unit;

https.get(url, function(response){
    console.log(response.statusCode)
    response.on("data", function(data){
       const weatherData = JSON.parse(data)
       const temp = weatherData.main.temp
       const weatherDescription = weatherData.weather[0].description
       const icon = weatherData.weather[0].icon
       const imageUrl  = "http://openweathermap.org/img/wn/" +icon+ "@2x.png"
       res.write(" <p>the weather is currently " + weatherDescription + "</p>")
       res.write("<h1>The temperature in "+ query+" is" + " " + temp + "degrees celcius</h1>");
       res.write("<img src=" + imageUrl + ">" )
       res.send()
    })
}); 
})






app.listen(3000, function(){
    console.log("Server running on port 3000")
});
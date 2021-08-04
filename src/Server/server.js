// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const recentEntries = [];
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
// Start up an instance of app
const app = express();

const { builtinModules } = require('module');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

const port = 3000;

// Setup Server

const server = app.listen(port, () => console.log(`listening on port ${port}`));


app.post( '/readGeoName', async (req, res) =>{


  const response = await fetch(`http://api.geonames.org/searchJSON?q=${req.body.formCity}&maxRows=10&username=${process.env.Geo_Key}`)
  try{
      const newData = await response.json();

      projectData=newData;

      res.send(newData)

  }catch(e){
      console.log("Error Found", e);
  }

})

app.post( '/readInfo', async (req, res) =>{


  const response = await fetch(`https://restcountries.eu/rest/v2/name/${req.body.cityCountry}`)
  try{
      const newData = await response.json();

      projectData=newData;

      res.send(newData)

  }catch(e){
      console.log("Error Found", e);
  }

})



app.post( '/readPix', async (req, res) =>{


  const response = await fetch(`https://pixabay.com/api/?key=${process.env.pix_KEY}&q=${req.body.city}&category=travel&image_type=photo`)

  try{
      const newData = await response.json();

      projectData=newData;

      res.send(newData)

  }catch(e){
      console.log("Error Found", e);
  }

})

app.post( '/readWeather', async (req, res) =>{


  if(((req.body.tripDay+1) - (req.body.currentDay+1))==0 && ( req.body.tripMonth - req.body.currentMonth == 0))
  {

    const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${req.body.latitude}&lon=${req.body.longitude}&key=${process.env.Weather_KEY}&include=hourly`)

    try{
      const newerData = await response.json();

      projectData=newerData;
      res.send(newerData)

    }catch(e){
              console.log("Error Found", e);
             }
  } else if(req.body.tripDay+1 > req.body.currentDay+1) 
      {
        if(req.body.tripDay - req.body.currentDay <= 16 && ( req.body.tripMonth - req.body.currentMonth ==0))
        {

        console.log("test2")
        const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.body.latitude}&lon=${req.body.longitude}&key=${process.env.Weather_KEY}`)
        try{
          const newerData = await response.json();
    
          projectData=newerData;
          res.send(newerData)
    
        }catch(e){
          console.log("Error Found", e);
        }

      } else{    
        
        console.log("test3-not in the same month. Over a month+ between")
        
        const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?&city=${req.body.cityName}&country=${req.body.countryName}&start_date=${req.body.historicalCurrent}&end_date=${req.body.historicalTrip}&key=${process.env.Weather_KEY}`)




    try{
      const newerData = await response.json();

      projectData=newerData;

      res.send(newerData)

  }catch(e){
      console.log("Error Found", e);
    }
  }
  }else if(req.body.tripDay+1 < req.body.currentDay+1){
    if((req.body.currentDay+1)-(Math.abs((req.body.tripDay+1) - (req.body.currentDay+1))) <= 16 && ( req.body.tripMonth - req.body.currentBody == 1)){
      console.log("test2")
      const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.body.latitude}&lon=${req.body.longitude}&key=${process.env.Weather_KEY}`)
      try{
        const newerData = await response.json();
  
        projectData=newerData;
  
        res.send(newerData)
  
    }catch(e){
        console.log("Error Found", e);
    }
  }else{

    console.log("test3 - not within a month. too far apart")
    const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?&city=${req.body.cityName}&country=${req.body.countryName}&start_date=${req.body.historicalCurrent}&end_date=${req.body.historicalTrip}&key=${process.env.Weather_KEY}`)


    try{
      const newerData = await response.json();

      projectData=newerData;

      res.send(newerData)

  }catch(e){
      console.log("Error Found", e);
  }
  }
  
} else{

  console.log("test3 - same date not same month")
  const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?&city=${req.body.cityName}&country=${req.body.countryName}&start_date=${req.body.historicalCurrent}&end_date=${req.body.historicalTrip}&key=${process.env.Weather_KEY}`)
  
  
  try{
    const newerData = await response.json();
  
    projectData=newerData;
  
    res.send(newerData)
  
  }catch(e){
    console.log("Error Found", e);
  }
}    
  
})


//setup get route

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})


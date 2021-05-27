// Setup empty JS object to act as endpoint for all routes
const projectData = {};

const recentEntries = [];
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

const cors = require('cors');
const { builtinModules } = require('module');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;

// Setup Server

const server = app.listen(port, () => console.log(`listening on port ${port}`));

//setup post route

app.post( '/addEntry', function(req,res){

    let convertTemp =  (req.body.temperature - 273.15) * 9/5 + 32;

  let newEntry = {
    temperature:  convertTemp.toPrecision(4),
    currentDate: req.body.newDate,
    content: req.body.userfeelings,
  }
  console.log(newEntry);

  recentEntries.push(newEntry);
  
})


//setup get route

app.get('/all', function(req,res){

  res.send(recentEntries);
})
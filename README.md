# Project Instructions

This project takes user location data and date of departure to retrieve information on their flight itinerary. Information includes, days until travel weather, temp, and tidbits on the destination

## Getting started
Install the necessary packages:

Check package.json dependencies for a full list

### Step 1: Enter location and Date of departure

To interact with the webpage, enter your desired travel location and enter the date of departure. 

### Step 2: Scripts

   "test": "jest",
    "start": "node src/server/index.js",
    "build-prod": "webpack --config webpack.prod.js",
    "build-dev": "webpack serve --config webpack.dev.js --open "

-test: Runs jest unit tests against JS functions found in the client folder
-start: Starts server that listens on localhost:8081
-build-prod: Builds the project in production mode. This includes express server and service workers that keep the website active in the event of the server going offline
-build-dev: Builds the project in development mode. This dev server is setup to only server static files through dist


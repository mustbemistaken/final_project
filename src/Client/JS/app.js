import  { geoData }  from "./Geo.js";

// Create a new entry instance dynamically with JS after clicking button

window.onload=function(){
    document.getElementById('generate').addEventListener('click',performAction);
  }

async function performAction(e){

    e.preventDefault()

    const tripStart = document.getElementById('start').value;
    const cityName = document.getElementById('formdata').value;

    let d = new Date();
    let newDate = d.getFullYear()+'-'+ JSON.stringify((d.getMonth()+1)).padStart(2, '0')+'-'+JSON.stringify((d.getDate())).padStart(2, '0') ;
    let objTrip = new Date( tripStart+"T00:00:00-0400");

    let dateFormatted = new Date().toISOString().slice(0, 10);
    let objDate = new Date(dateFormatted+"T00:00:00-0400");

    let tripDay = objTrip.getDate();
    let currentDay = d.getDate();
    let tripMonth = objTrip.getMonth()+1;
    let currentMonth = d.getMonth()+1;
    let cityCountry;
    let sample;
    let diffTime;
    let diffDays;

    let historicalCurrent = d.getFullYear()-2+'-'+ JSON.stringify((d.getMonth()+1)).padStart(2, '0')+'-'+JSON.stringify((d.getDate())).padStart(2, '0') ;
    let historicalTrip = objTrip.getFullYear()-2+'-'+ JSON.stringify((d.getMonth()+1)).padStart(2, '0') +'-'+ JSON.stringify((objTrip.getDate()+1)).padStart(2, '0');



    const geoInfo = await geoData('/readGeoName', {formCity:cityName})

    try{
            cityCountry = geoInfo.geonames[0].countryName;
            const weatherInfo =  await geoData('/readWeather', {longitude:geoInfo.geonames[0].lng, latitude:geoInfo.geonames[0].lat, countryName:geoInfo.geonames[0].countryCode, cityName, tripDay, currentDay, tripMonth, currentMonth, newDate, tripStart, historicalCurrent, historicalTrip  })


            diffTime = Math.abs(objTrip - objDate);
            diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            const countryInfo = await geoData('/readInfo',{cityCountry:cityCountry})

            if(tripStart < newDate){
                alert("Invalid date entered. Please try again.")
            }
            else if(newDate == tripStart){
                
                const pix =  await geoData('/readPix', {city:weatherInfo.data[0].city_name})

                //now update UI
                if( pix.hits.length !== 0){
                    
                    sample= pix.hits[0].webformatURL;
                    
                    document.getElementById('pix').style.height= " 100%";
                    
                    document.getElementsByClassName('cont3')[0].style.display= "flex";
                    document.getElementsByClassName('cont2')[0].style.display= "flex";
                    document.getElementById('pix').innerHTML = `<img src="${sample}"></img>`;
                    document.getElementById('travelData').innerHTML = `<h2>My Trip to:<br> ${weatherInfo.data[0].city_name}, ${cityCountry} </h2><h2>Departing: ${tripStart}</h2>`
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<button id="save" type = "submit"> <b>Save Trip</b> </button><button id="remove" type = "submit"> <b>Remove Trip</b> </button>`) 
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>${weatherInfo.data[0].city_name}, ${cityCountry} is ${diffDays} day(s) away</p>`) 
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>Current weather is:<br>${weatherInfo.data[0].temp}°</p>`) 
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>Some helpful info on your destination!<br><strong>Currency:</strong> ${countryInfo[0].currencies[0].name} (${countryInfo[0].currencies[0].symbol}) <br><strong>Language:</strong> ${countryInfo[0].languages[0].name} <br><strong>Timezone:</strong> ${countryInfo[0].timezones[0]}</p>`) 


                    // console.log(document.getElementById('travelData').innerHTML)

                    
                } else{
                    document.getElementById('pix').style.height= " 100%";
                    document.getElementsByClassName('cont3')[0].style.display= "flex";
                    document.getElementsByClassName('cont2')[0].style.display= "flex";


                    document.getElementById('pix').innerHTML = `<img src="./img/image-not-found.jpg"></img>`;
                    document.getElementById('travelData').innerHTML = `<h2>My Trip to:<br> ${weatherInfo.data[0].city_name}, ${cityCountry} </h2><h2>Departing: ${tripStart}</h2>`
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<button id="save" type = "submit"> <b>Save Trip</b> </button><button id="remove" type = "submit"> <b>Remove Trip</b> </button>`) 
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>${weatherInfo.data[0].city_name}, ${cityCountry} is ${diffDays} day(s) away</p>`) 
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>Current weather is:<br>${weatherInfo.data[0].temp}°</p>`) 
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>Some helpful info on your destination!<br><strong>Currency:</strong> ${countryInfo[0].currencies[0].name} (${countryInfo[0].currencies[0].symbol}) <br><strong>Language:</strong> ${countryInfo[0].languages[0].name} <br><strong>Timezone:</strong> ${countryInfo[0].timezones[0]}</p>`) 

                }

            } else{

                const pix =  await geoData('/readPix', {city:weatherInfo.city_name})

                //now update UI
                if( pix.hits.length != 0){

                    sample= pix.hits[0].webformatURL;
                    document.getElementById('pix').style.height= " 100%";
                    document.getElementsByClassName('cont3')[0].style.display= "flex";
                    document.getElementsByClassName('cont2')[0].style.display= "flex";


                    document.getElementById('pix').innerHTML = `<img src="${sample}"></img>`;
                    document.getElementById('travelData').innerHTML = `<h2>My Trip to:<br> ${weatherInfo.city_name}, ${cityCountry} </h2><h2>Departing: ${tripStart}</h2>`
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<button id="save" type = "submit"> <b>Save Trip</b> </button><button id="remove" type = "submit"> <b>Remove Trip</b> </button>`) 
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>${weatherInfo.city_name}, ${cityCountry} is ${diffDays} day(s) away</p>`) 

                    if(diffDays < 16){
                        document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>Typical weather for then is:<br>High: ${weatherInfo.data[diffDays].max_temp}, Low: ${weatherInfo.data[diffDays].min_temp}</p><br>${weatherInfo.data[diffDays].weather.description} throughout the day.`) 
                    } else{
                        document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>Typical weather for then is:<br>High: ${weatherInfo.data[0].max_temp}°, Low: ${weatherInfo.data[0].min_temp}°</p>`) 
                    }
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>Some helpful info on your destination!<br><strong>Currency:</strong> ${countryInfo[0].currencies[0].name} (${countryInfo[0].currencies[0].symbol}) <br><strong>Language:</strong> ${countryInfo[0].languages[0].name} <br><strong>Timezone:</strong> ${countryInfo[0].timezones[0]}</p>`) 

                } 
                else{
                    document.getElementById('pix').style.height= " 100%";
                    document.getElementsByClassName('cont3')[0].style.display= "flex";
                    document.getElementsByClassName('cont2')[0].style.display= "flex";

                    
                    document.getElementById('pix').innerHTML = `<img src="./img/image-not-found.jpg"></img>`;
                    document.getElementById('travelData').innerHTML = `<h2>My Trip to:<br> ${weatherInfo.city_name}, ${cityCountry} </h2><h2>Departing: ${tripStart}</h2>`
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<button id="save" type = "submit"> <b>Save Trip</b> </button><button id="remove" type = "submit"> <b>Remove Trip</b> </button>`) 
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>${weatherInfo.city_name}, ${cityCountry} is ${diffDays} day(s) away</p>`) 

                    if(diffDays < 16){
                        document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>Typical weather for then is:<br>High: ${weatherInfo.data[diffDays].max_temp}, Low: ${weatherInfo.data[diffDays].min_temp}</p><br>${weatherInfo.data[diffDays].weather.description} throughout the day.`) 
                    } else{
                        document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>Typical weather for then is:<br>High: ${weatherInfo.data[0].max_temp}°, Low: ${weatherInfo.data[0].min_temp}°</p>`) 
                    }
                    document.getElementById('travelData').insertAdjacentHTML("beforeend", `<p>Some helpful info on your destination!<br><strong>Currency:</strong> ${countryInfo[0].currencies[0].name} (${countryInfo[0].currencies[0].symbol}) <br><strong>Language:</strong> ${countryInfo[0].languages[0].name} <br><strong>Timezone:</strong> ${countryInfo[0].timezones[0]}</p>`) 

                }
                
            } 
        }catch(e){
            alert("Invalid city entry", e)
        }
}

export{performAction}

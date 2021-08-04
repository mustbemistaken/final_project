
/**
 * @jest-environment jsdom
 */

 import { performAction } from "../src/Client/JS/app"
 import * as m from "../src/Client/JS/Geo"

 window.alert = jest.fn();
 
 
 //Mock function inside of handlesubmit. The fetch portion of this fn is tested elsewhere
 m.geoData= jest.fn().mockImplementation( async function(){
     return {

                geonames: [{
                    countryName: "United Kingdom",
                    lng: 50,
                    lat: 50,
                    countryCode: "GB",

                }],
                data: [{
                    city_name: "London",
                    temp: 16
                }],
                currencies:[{
                    name: "British pound",
                    symbol: "£"
                }],
                languages:[{
                    languages: "English",
                }],
                timezone:[{
                    timezones: "UTC-08:00",
                }],
                cityCountry: "United Kingdom",
                trip_Start: "2021-08-03",
                diffDays: 0,
                hits:[{
                    webformatURL: "https://pixabay.com/get/g9203a41b20b9476cd0c3305116b1189346c50170479b54640f04ade2c0b930eb571f385c71a564a2abd9a8c1edbc4e38df3f8b805ee8b59b4b2f7edbbbe2e14a_640.jpg"
                }]

            }
     } );
 
 
 describe('Test date submit function call', () => {
     test('Checking valid post and UI update', async () => {
        window.alert.mockClear();
 
     //creating mock HTML that resembles out index.html (Otherwise JEST complains about null value on event start)
     document.body.innerHTML = `<textarea class= "myInput" id="formdata" placeholder="Enter your destination"rows="1" cols="50" maxlength="50"></textarea><button id="generate" type = "submit"> <b>Take-off!</b> </button><input type="date" id="start" name="trip-start" min="2021-01-01" max="2022-12-31"><section class = "outer cont2"> 
     <div id = pix></div></section><section class= "outer cont3"><div id= travelData></div></section>`;
 

     const country= "London, United Kingdom";
     const trip_start= "2021-08-04";
     const diffdays= 0;
     const weather= 16;
     const mocktrip = document.getElementById('start');
     const mockcity = document.getElementById('formdata');
     //sets value to input field
     mocktrip.value = '2021-08-04';
     mockcity.value = 'london';
    
     //simulate button event to run handle submit (this runs with onclick on our index.html)
     const event = new Event('click');
     await performAction(event);
 

     //check that input from our mock in line 10 matches the result of our output message in line 39
     expect(document.getElementById('travelData').innerHTML).toBe(`<h2>My Trip to:<br> ${country} </h2><h2>Departing: ${trip_start}</h2><button id="save" type="submit"> <b>Save Trip</b> </button><button id="remove" type="submit"> <b>Remove Trip</b> </button><p>${country} is ${diffdays} day(s) away</p><p>Current weather is:<br>${weather}°</p>`);
     })

 });

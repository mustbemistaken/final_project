/* Global Variables */

// const { json } = require("body-parser");

const baseURL= 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=408281d3f29e387234edd3843c3b0e04';

// Create a new date instance dynamically with JS

const entryHistory = document.querySelector('#entryHolder');


document.getElementById('generate').addEventListener('click',performAction );


function performAction(e){

    const zipCode = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value;
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

    getData(baseURL, zipCode, apiKey)
    .then(function(newData){
            postData( '/addEntry', {temperature: newData.main.temp, userfeelings:userFeelings, newDate : newDate})

            updateUI();
        }
    )
}
//create get function

const getData = async (baseURL,zip, key) =>{

        const response = await fetch(baseURL+zip+key)
        try{
            const newData = await response.json();
            return newData;

        }catch(e){
            console.log("Error Found", e);
        }

};


//create post function

const postData = async (url='', data = {}) => {

    const responses = await fetch(url, {

        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    try{
        const setData = await responses.json();

    }catch(e){
        console.log("Error", e);
    }
};


const updateUI = async () => {
    
    const response = await fetch('/all')

    try{
        const allData = await response.json();
        allData.forEach( element => {
            

            entryHistory.insertAdjacentHTML("afterend", `<div id = "entryHolders"><div id = "date">Today is ${element.currentDate}</div><div id = "temp">It's currently ${element.temperature}° in your area</div> <div id = "content">Your thoughts:<br> ${element.content}</div> </div> `);

        })

    }catch(e){
        console.log("error", e)
    }


}


const oldEntries = async () =>{

    const response = await fetch('/all')

    try{
        const allData = await response.json();
        allData.forEach( element => {
            
            entryHistory.insertAdjacentHTML("afterend", `<div id = "entryHolders"><div id = "date">Today is ${element.currentDate}</div><div id = "temp">It's currently ${element.temperature}° in your area</div> <div id = "content">Your thoughts:<br> ${element.content}</div> </div> `);



        })

    }catch(e){
        console.log("error", e)
    }
};

//call the function
oldEntries();
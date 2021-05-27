/* Global Variables */


const baseURL= 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=408281d3f29e387234edd3843c3b0e04';
const units = '&units=imperial';

// select every entry possible

const entryHistory = document.querySelector('#entryHolder');


// Create a new entry instance dynamically with JS after clicking button
document.getElementById('generate').addEventListener('click',performAction );


function performAction(e){

    const zipCode = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value;
    let d = new Date();
    let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

    getData(baseURL, zipCode, apiKey, units)
    .then(function(newData){
            postData( '/addEntry', {temperature: newData.main.temp, userfeelings:userFeelings, newDate : newDate})

            updateUI();
        }
    )
}

//create get function for weather api

const getData = async (baseURL,zip, key, units) =>{

        const response = await fetch(baseURL+zip+key+units)
        try{
            const newData = await response.json();
            return newData;

        }catch(e){
            console.log("Error Found", e);
        }

};


//create post function for  weather api get to add to server

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


//create function to call server data and updateUI
const updateUI = async () => {
    
    const response = await fetch('/all')

    try{
        const allData = await response.json();

           
            document.getElementById('date').innerHTML = `Today is ${allData.currentDate}`;
            document.getElementById('temp').innerHTML = `It's currently ${allData.temperature}° in your area`;
            document.getElementById('content').innerHTML = `Your thoughts:<br> ${allData.content}`;
            document.getElementById('entryHolder').style.border= "1px solid orange ";
            document.getElementById('entryHolder').style.padding= " 5px";
            document.getElementById('entryHolder').style.margin= " 5px";
            document.getElementById('entryHolder').style.borderRadius= " 5px";



    }catch(e){
        console.log("error", e)
    }


}


//create function that populates Ui with all previous entries
const oldEntries = async () =>{

    const response = await fetch('/getOldEntries')

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
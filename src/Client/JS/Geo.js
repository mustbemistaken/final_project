const geoData = async (url='', data = {}) => {

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

        return setData;
    }catch(e){
        console.log("Error", e);
    }
};


export {
    geoData
}
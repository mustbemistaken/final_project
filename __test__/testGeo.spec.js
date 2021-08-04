require('jest-fetch-mock').enableMocks()
import { geoData } from "../src/Client/JS/Geo"

//testing post function call. We mock the response by fetch and make sure the data returned is the same as the response
test('Checking Valid Post', async () => {

    const cityName = "london"
    fetch.mockResponseOnce(JSON.stringify({countryName: "United Kingdom"}))
    const data = await geoData('/readGeoName', {formCity:cityName})
     
    expect(data.countryName).toEqual("United Kingdom");

    
})
    


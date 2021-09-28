import { getRequest } from '../index.js';
import { postRequest } from '../index.js';
import { getWeatherbitObject } from './weatherbitAPI.js';

let cityName, geoNamesObject, coordinatesObject;

async function getGeoNamesObject() { // POSTs coordinates to server
    cityName = document.getElementById('city').value;
    getRequest('/geoNamesUsername')
        .then(async function(usernameObject) {
            let username = usernameObject.username;
            geoNamesObject = await getRequest(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${username}`);
            coordinatesObject = {
                lng: geoNamesObject.geonames[0].lng,
                lat: geoNamesObject.geonames[0].lat
            };
            return coordinatesObject;
        }).then(async(coordinatesObject) => {
            console.log(coordinatesObject);
            return await postRequest('/addCoordinates', coordinatesObject);
        }).then(async() => {
            await getWeatherbitObject();
        });
}


export { getGeoNamesObject }
import { getRequest } from '../index.js';
import { postRequest } from '../index.js';
import { getWeatherbitObject } from './weatherbitAPI.js';

import 'regenerator-runtime/runtime'

let cityName, geoNamesObject, coordinatesObject;

async function getGeoNamesObject(remainingDays) { // POSTs coordinates to server
    cityName = document.getElementById('city').value;
    getRequest('/geoNamesUsername')
        .then(async function(usernameObject) {
            let username = usernameObject.username;
            geoNamesObject = await getRequest(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${username}`);
            if (geoNamesObject.geonames.length == 0) {
                alert('Please enter a valid city name')
                document.getElementById('city').value = '';
                return {
                    cityName: "Not found"
                };
            } else {
                coordinatesObject = {
                    countryName: geoNamesObject.geonames[0].countryName,
                    cityName: cityName,
                    lng: geoNamesObject.geonames[0].lng,
                    lat: geoNamesObject.geonames[0].lat
                };
                return coordinatesObject;
            }
        }).then(async(coordinatesObject) => {
            if (coordinatesObject.cityName == "Not found") {
                return coordinatesObject;
            } else {
                return await postRequest('/addCoordinates', coordinatesObject);
            }
        }).then(async(coordinatesObject) => {
            if (coordinatesObject.cityName == "Not found") {
                return coordinatesObject;
            } else {
                await getWeatherbitObject(remainingDays);
            }
        });
}


export { getGeoNamesObject }
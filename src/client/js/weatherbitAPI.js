import { getRequest } from '../index.js';
import { postRequest } from '../index.js';

let coordinates, weatherbitObject;

async function getWeatherbitObject() {
    await getRequest('/weatherbitKey')
        .then(async(apiKeyObject) => {
            let key = apiKeyObject.apiKey;
            coordinates = await getRequest('/getCoordinates');
            weatherbitObject = await getRequest(`http://api.weatherbit.io/v2.0/current?lat=${coordinates.lat}&lon=${coordinates.lng}&key=${key}`);
            return weatherbitObject.data[0];
        }).then(async(weatherbitObject) => {
            return await postRequest('/addWeatherbitObject', weatherbitObject);
        })
}


export { getWeatherbitObject }
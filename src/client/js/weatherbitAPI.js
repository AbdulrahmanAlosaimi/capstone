import { getRequest } from '../index.js';
import { postRequest } from '../index.js';
import { getPixabayObject } from './pixabayAPI';

import 'regenerator-runtime/runtime'

let coordinates, weatherbitObject, apiCall;

async function getWeatherbitObject(remainingDays) {
    await getRequest('/weatherbitKey')
        .then(async(apiKeyObject) => {
            let key = apiKeyObject.apiKey;
            coordinates = await getRequest('/getCoordinates');
            console.log(remainingDays, 'REMAINING DAYS');
            if (remainingDays <= 7) { //trip is in a week
                apiCall = (`http://api.weatherbit.io/v2.0/current?lat=${coordinates.lat}&lon=${coordinates.lng}&key=${key}`);
                console.log('IN A WEEK');
            } else { //trip is in more than a week
                apiCall = (`http://api.weatherbit.io/v2.0/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lng}&key=${key}`);
                console.log('MORE THAN A WEEK');
            }
            weatherbitObject = await getRequest(apiCall);
            return weatherbitObject.data[0];
        }).then(async(weatherbitObject) => {
            console.log(weatherbitObject);
            return await postRequest('/addWeatherbitObject', weatherbitObject);
        }).then(async() => {
            return await getPixabayObject();
        })
}


export { getWeatherbitObject }
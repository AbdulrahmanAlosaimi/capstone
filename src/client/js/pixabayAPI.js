import { getRequest } from '../index.js';
import { postRequest } from '../index.js';

import 'regenerator-runtime/runtime'

let coordinates, pixabayObject, weatherbitObject;

async function getPixabayObject(remainingDays) {
    await getRequest('/pixabayKey')
        .then(async(keyObject) => {
            let key = keyObject.apiKey;
            let coordinates = await getRequest('/getCoordinates');
            pixabayObject = await getRequest(`https://pixabay.com/api/?key=${key}&q=${coordinates.cityName}&category=places&orientation=horizontal&per_page=3`);
            if (pixabayObject.hits.length == 0) { //Search country name if city name brings up no results
                pixabayObject = await getRequest(`https://pixabay.com/api/?key=${key}&q=${coordinates.countryName}&category=buildings&orientation=horizontal&per_page=3`);
            }
            return pixabayObject;
        }).then(async(imageObject) => {
            return postRequest('/addPixabayObject', imageObject);
        }).then(async() => {
            await updateUI(remainingDays);
        })
}

async function updateUI(remainingDays) {
    let destinationImage = document.getElementById('dest-img');
    destinationImage.setAttribute('src', pixabayObject.hits[0].webformatURL);

    coordinates = await getRequest('/getCoordinates');
    let destinationName = document.getElementById('destination-name');
    destinationName.innerHTML = capitalize(coordinates.cityName);

    let remainingDaysCountdown = document.getElementById('remaining-days');
    remainingDaysCountdown.innerHTML = remainingDays + " days until your flight!";

    weatherbitObject = await getRequest('/getWeatherbitObject');
    let weatherIcon = document.getElementById('weather-icon');
    weatherIcon.setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherbitObject.weather.icon}.png`);

    let temperature = document.getElementById('temperature');
    temperature.innerHTML = weatherbitObject.temp + " °C";

    let weatherDesc = document.getElementById('weather-description');
    weatherDesc.innerHTML = weatherbitObject.weather.description;
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substr(1);
}

export { getPixabayObject }
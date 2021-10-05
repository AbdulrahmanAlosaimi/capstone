import './styles/resets.scss'
import './styles/form.scss'
import './styles/style.scss'
import './styles/footer.scss'

import { getGeoNamesObject } from './js/geoNamesAPI.js';
import moment from 'moment';

import 'regenerator-runtime/runtime'

let apiObject = {};

document.addEventListener('DOMContentLoaded', async() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
    let todayDate = moment(today);
    let departureDateInput = document.getElementById('departure');
    departureDateInput.setAttribute('min', today);
    let twoMonth = (todayDate.add(2, 'months').format('YYYY-MM-DD'));
    departureDateInput.setAttribute('max', twoMonth);
    let cityInput = document.getElementById('city')
    const btn = document.getElementById('btn');
    btn.addEventListener('click', async() => {
        let cityName = cityInput.value;
        if (cityName == '') {
            alert('Please enter a city name');
        } else {
            let departureDate = moment(departureDateInput.value);
            if (departureDate._isValid == false) {
                alert('Please enter a valid date');
            } else {
                let remainingDays = calculateRemainingDays(new Date(today), new Date(departureDateInput.value));
                await getGeoNamesObject(remainingDays);
            }
        }
    })
})

async function getRequest(url) {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error, 'Error in index.js getting function');
    }
}

async function postRequest(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error, 'Error in index.js posting function');
    }
}


function calculateRemainingDays(today, departure) {
    let ms = departure.getTime() - today.getTime();
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    return parseFloat(`${days}.${daysms}`);
}

export { getRequest }
export { postRequest }
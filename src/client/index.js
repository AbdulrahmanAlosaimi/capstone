import './styles/form.scss'
import './styles/style.scss'
import './styles/header.scss'
import './styles/footer.scss'

import { getGeoNamesObject } from './js/geoNamesAPI.js';

let apiObject = {};

document.addEventListener('DOMContentLoaded', async() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
    document.getElementById('departure').setAttribute('min', today);
    const btn = document.getElementById('btn');
    btn.addEventListener('click', async() => {
        await getGeoNamesObject();
    })
})

async function getRequest(url) {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error, 'error');
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

export { getRequest }
export { postRequest }
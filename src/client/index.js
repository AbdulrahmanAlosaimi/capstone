import './styles/form.scss'
import './styles/style.scss'
import './styles/header.scss'
import './styles/footer.scss'

let cityName, apiObject, usernameObject;

document.addEventListener('DOMContentLoaded', async() => {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', async() => {
        cityName = document.getElementById('city').value;
        console.log(cityName);
        getGeoNamesObject();
    })
})

async function getGeoNamesObject() {
    getRequest('/geoNamesUsername')
        .then(async function(usernameObject) {
            console.log(usernameObject);
            let username = usernameObject.username;
            console.log(username);
            return await getRequest(`http://api.geonames.org/searchJSON?q=${cityName}&username=${username}`);
        }).then(function(data) {
            console.log(data);
            return data;
        });
}

async function getRequest(url) {
    console.log(url);
    const response = await fetch(url);
    try {
        const data = await response.json();
        console.log('getRequest');
        console.log(data);
        console.log('getRequest');
        return data;
    } catch (error) {
        console.log(error, 'error');
    }
}
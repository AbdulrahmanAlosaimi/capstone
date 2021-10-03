import { getRequest } from '../index.js';
import { postRequest } from '../index.js';

async function getPixabayObject() {
    await getRequest('/pixabayKey')
        .then(async(keyObject) => {
            let key = keyObject.apiKey;
            let coordinates = await getRequest('/getCoordinates');
            let pixabayObject = await getRequest(`https://pixabay.com/api/?key=${key}&q=${coordinates.cityName}&category=places&orientation=horizontal&per_page=3`);
            if (pixabayObject.hits.length == 0) { //Search country name if city name brings up no results
                return await getRequest(`https://pixabay.com/api/?key=${key}&q=${coordinates.countryName}&category=buildings&orientation=horizontal&per_page=3`);
            } else {
                return pixabayObject;
            }
        }).then(async(imageObject) => {
            console.log(imageObject);
            postRequest('/addPixabayObject', imageObject);
        })
}

export { getPixabayObject }